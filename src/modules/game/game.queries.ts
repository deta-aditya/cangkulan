import * as Opt from "../option";
import * as GameEffect from "./effect";
import * as GameCardLists from "./cardList";
import * as GamePlayerLists from  './playerList';

import type { Game } from "./game.types";
import type { GamePlayer } from "./player";
import type { GameCardList } from "./cardList";
import type { GamePlayerList } from "./playerList";

export function findPlayWinner({ cards, players }: Game, forceWin = false) {
  let winner = Opt.None<GamePlayer>()

  const playedCards = GameCardLists.getPlayed(cards)
  const somePlayersHaveNotPlayed = playedCards.length < players.length
  if (!forceWin && somePlayersHaveNotPlayed) {
    return winner
  }
  
  const rankPerPlayers = GameCardLists.getRankByPlayers(playedCards)

  let highestRank = 0
  for (const { rank, player } of rankPerPlayers) {
    if (rank > highestRank) {
      highestRank = rank
      winner = Opt.Some(player)
    }
  }

  return winner
}

export function findGameWinner({ cards, players }: Game) {
  let winner = Opt.None<GamePlayer>()
  
  for (const player of players) {
    const cardsInHand = GameCardLists.getHandedBy(cards, player)

    if (cardsInHand.length === 0) {
      winner = Opt.Some(player)
      break;
    }
  }

  return winner
}

export function getCurrentPlayerHands({ cards, players }: Game) {
  const activePlayer = GamePlayerLists.getActivePlayer(players)
  if (Opt.isNone(activePlayer)) {
    return []
  }

  return GameCardLists.getHandedBy(cards, activePlayer.value)
}

export function isDeckDisabled(game: Game) {
  const { cards, players, effect } = game
  const activePlayerHand = getCurrentPlayerHands(game)
  const suitInPlay = GameCardLists.getSuitInPlay(cards)

  const activePlayerHasPlayableCard = 
    GamePlayerLists.hasActivePlayer(players)
    && GameCardLists.isPlayable(activePlayerHand, suitInPlay)

  return activePlayerHasPlayableCard
    || GamePlayerLists.hasGameWinner(players)
    || GameEffect.isPlayEnding(effect)
}