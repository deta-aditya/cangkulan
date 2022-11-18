import * as Cards from "../card";
import * as Arrays from "../array";

import type { Option } from "../option";
import * as Opt from "../option";
import type { ActionDraw, ActionPlay, GameAction } from "./action";
import type { GameCard } from "./card";
import * as GameCards from "./card";
import * as Effects from "./effect";
import type { Game, Player } from "./game.types";
import * as Turns from "./turn";
import type { Card } from "../card";

export function create(players: Player[]): Game {
  return { 
    players,
    cards: initalizeCards(players),
    turn: initializeTurn(players),
    winner: Turns.Nobody(),
    effect: Effects.NoOp(),
  }
}

export function reduce(game: Game, action: GameAction): Game {
  switch (action.kind) {
    case 'play':
      return handlePlayAction(game, action)
    case 'play-next':
      return handlePlayNextAction(game)
    case 'draw':
      return handleDrawAction(game, action)
    default:
      return game
  }
}

function handlePlayAction(game: Game, action: ActionPlay): Game {
  const playedGame = playCard(game, action);
  const currentGameWinner = getGameWinner(playedGame);
  if (Turns.isActive(currentGameWinner)) {
    return {
      ...game,
      turn: Turns.Nobody(),
      winner: currentGameWinner,
    }
  }

  const currentPlayWinner = getPlayWinner(playedGame);
  if (Turns.isActive(currentPlayWinner)) {
    return {
      ...game,
      turn: Turns.Nobody(),
      effect: Effects.PlayEnding(currentPlayWinner)
    }
  }

  const { players, turn } = playedGame
  const nextTurn = Turns.nextTurn(players.length, turn)
  return {
    ...game,
    turn: nextTurn,
  }
}

function handlePlayNextAction(game: Game): Game {
  const { effect, cards } = game
  if (!Effects.isPlayEnding(effect)) {
    return game
  }

  const flushedCards = flushCards(cards)
  return {
    ...game,
    cards: flushedCards,
    turn: effect.winner,
    effect: Effects.NoOp(),
  }
}

function handleDrawAction(game: Game, { card: drawnCard }: ActionDraw): Game {
  const currentPlayer = getCurrentPlayer(game)
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { value: player } = currentPlayer;
  const { cards } = game;

  const newGameCards = cards.map(gameCard => {
    if (GameCards.isDeck(gameCard) && Cards.isEqual(gameCard.card, drawnCard)) {
      return GameCards.Hand(drawnCard, player)
    }
    return gameCard
  })

  return {
    ...game,
    cards: newGameCards,
  }
}
 
function initalizeCards(players: Player[]) {
  const deck = Cards.generateDeck()
  const shuffledDeck = Arrays.shuffle(deck)
  const finalCards = distributeCards(shuffledDeck, players)

  return finalCards
}

const CARDS_PER_PLAYER = 7
function distributeCards(cards: Card[], players: Player[]) {
  return cards.map((card, cardIndex) => {
    const targetPlayer = players[cardIndex % players.length]
    const handsCapacity = players.length * CARDS_PER_PLAYER

    if (cardIndex < handsCapacity) {
      return GameCards.Hand(card, targetPlayer)
    }
    return GameCards.Deck(card)
  })
}

function initializeTurn(players: Player[]) {
  return Turns.nextTurn(players.length, Turns.Nobody())
}

function playCard(game: Game, { card: playedCard }: ActionPlay) {
  const currentPlayer = getCurrentPlayer(game);
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { value: player } = currentPlayer;
  const { cards } = game;

  const newGameCards = cards.map(gameCard => {
    const isCardOnPlayersHand = GameCards.isCardHandedBy(player, gameCard); 
    const isCardSameAsPlayed = Cards.isEqual(gameCard.card, playedCard)

    if (isCardOnPlayersHand && isCardSameAsPlayed) {
      return GameCards.Played(playedCard, player)
    }
    
    return gameCard;
  });

  return {
    ...game,
    cards: newGameCards,
  }
}

function flushCards(gameCards: GameCard[]) {
  return gameCards.map(gameCard => {
    if (GameCards.isPlayed(gameCard)) {
      return GameCards.Flushed(gameCard.card)
    }
    return gameCard;
  })
}

function getPlayWinner({ cards, players }: Game) {
  const playedCards = cards.filter(GameCards.isPlayed)
  if (playedCards.length < players.length) {
    return Turns.Nobody()
  }
  
  let winner = { 
    rank: 0, 
    turn: Turns.Nobody() 
  }
  for (let { card, player } of playedCards) {
    const rank = Cards.rankToNumber(card.rank)
    const playerIndex = players.indexOf(player)

    if (playerIndex >= 0 && rank >= winner.rank) {
      winner = { 
        rank, 
        turn: Turns.Active(playerIndex) 
      }
    }
  }

  return winner.turn
}

function getGameWinner({ cards, players }: Game) {
  const handedCardsCounts = players.map(player => {
    const playersCards = cards.filter(card => 
      GameCards.isCardHandedBy(player, card)
    );
    return playersCards.length;
  })

  let winner = Turns.Nobody()
  for (let [index, count] of handedCardsCounts.entries()) {
    if (count === 0) {
      winner = Turns.Active(index)
    }
  }

  return winner
}

function getCurrentPlayer({ players, turn }: Game): Option<Player> {
  switch (turn.kind) {
    case 'nobody':
      return Opt.None()
    case 'active':
      return Opt.Some(players[turn.index])
  } 
}
