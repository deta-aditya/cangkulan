import * as Opt from "../option";
import * as Effects from "./effect";
import * as PlayEndingNextActions from './effect/nextAction';
import * as GameCardLists from "./cardList";
import * as GamePlayerLists from "./playerList";
import { getGameWinner, getPlayWinner } from "./game.queries";
import { create } from "./game.factories";

import type { Card } from "../card";
import type { GameAction } from "./action";
import type { Game } from "./game.types";

export function reduce(game: Game, action: GameAction): Game {
  switch (action.kind) {
    case 'play':
      return play(game, action.card)
    case 'play-next':
      return playNext(game)
    case 'draw':
      return draw(game, action.card)
    case 'rake':
      return rake(game)
    case 'reset':
      return reset(game)
    default:
      return game
  }
}

export function play(game: Game, card: Card): Game {
  const playedGame = playCardWithoutWinnerCheck(game, card);
  const { players } = playedGame

  const gameWinner = getGameWinner(playedGame);
  if (Opt.isSome(gameWinner)) {
    const newGameWinnerPlayers = GamePlayerLists.setGameWinner(
      players, 
      gameWinner.value
    )
    return {
      ...playedGame,
      players: newGameWinnerPlayers,
    }
  }

  const playWinner = getPlayWinner(playedGame)
  if (Opt.isSome(playWinner)) {
    const newPlayWinnerPlayers = GamePlayerLists.setPlayWinner(
      players, 
      playWinner.value
    )
    return {
      ...playedGame,
      players: newPlayWinnerPlayers,
      effect: Effects.PlayEnding(
        playWinner.value, 
        PlayEndingNextActions.Flush(),
      )
    }
  }

  const nextPlayers = GamePlayerLists.mapForNextTurn(playedGame.players)
  return {
    ...playedGame,
    players: nextPlayers,
  }
}

export function playNext(game: Game): Game {
  const { effect, cards, players } = game
  if (!Effects.isPlayEnding(effect)) {
    return game
  }

  const { nextAction } = effect
  const nextCards = PlayEndingNextActions.when({
    flush: () => GameCardLists.flush(cards),
    rake: raker => GameCardLists.rake(cards, raker),
  }, nextAction)

  const nextPlayers = GamePlayerLists.mapForNextPlay(players)
  return {
    ...game,
    players: nextPlayers,
    cards: nextCards,
    effect: Effects.NoOp(),
  }
}

export function draw(game: Game, drawnCard: Card): Game {
  const { cards, players } = game;
  const currentPlayer = GamePlayerLists.getActivePlayer(players)
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { value: player } = currentPlayer;
  const newGameCards = GameCardLists.draw(cards, drawnCard, player)

  return {
    ...game,
    cards: newGameCards,
  }
}

export function rake(game: Game): Game {
  const { players } = game
  const currentPlayer = GamePlayerLists.getActivePlayer(players)
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const playWinner = getPlayWinner(game, true);
  if (Opt.isNone(playWinner)) {
    return game;
  }

  const newPlayWinnerPlayers = GamePlayerLists.setPlayWinner(
    players, 
    playWinner.value
  )
  return {
    ...game,
    players: newPlayWinnerPlayers,
    effect: Effects.PlayEnding(
      playWinner.value,
      PlayEndingNextActions.Rake(currentPlayer.value),
    )
  }
}

export function reset({ players, config }: Game): Game {
  const playerNames = GamePlayerLists.getNames(players)
  return create(playerNames, config.cardsPerPlayer)
}

function playCardWithoutWinnerCheck(game: Game, playedCard: Card) {
  const { cards, players } = game;
  const currentPlayer = GamePlayerLists.getActivePlayer(players);
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { value: player } = currentPlayer;
  const newGameCards = GameCardLists.play(cards, playedCard, player)

  return {
    ...game,
    cards: newGameCards,
  }
}
