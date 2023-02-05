import * as Opt from "../../modules/option";
import * as GameCards from "../../modules/game/card";
import * as GamePlayers from "../../modules/game/player";

import type { Suit } from "../../modules/card"
import type { Option } from "../../modules/option";
import type { GamePlayer, PlayerActive } from "../../modules/game/player";
import type { CardDeck, CardHand, CardPlayed, GameCard } from "../../modules/game/card";

type HandCardsPerPlayer = Record<number, CardHand[]>
type PlayedCardsPerPlayer = Record<number, Option<CardPlayed>>

export function getPlaySuit(playedCards: PlayedCardsPerPlayer): Option<Suit> {
  let result = Opt.None<Suit>()
  const playedCardValues = Object.values(playedCards)

  for (const perhapsCard of playedCardValues) {
    if (Opt.isSome(perhapsCard)) {
      result = Opt.map(GameCards.getSuit, perhapsCard);
    }
  }

  return result
}

export function getTopMostDeck(deckCards: CardDeck[]): Option<CardDeck> {
  if (deckCards.length === 0) {
    return Opt.None()
  }
  return Opt.Some(deckCards[0])
}

export function isHandPlayable(suit: Option<Suit>, handCards: GameCard[]) {
  return Opt.isNone(suit) || handCards.some(({ card }) => card.suit === suit.value)
}

export function sortGamePlayers(players: GamePlayer[]) {
  return players.sort((player1, player2) => GamePlayers.getId(player1) - GamePlayers.getId(player2));
}

export function groupCards(cards: GameCard[], players: GamePlayer[]) {
  const deckCards = []
  const handCards: HandCardsPerPlayer = {}
  const playedCards: PlayedCardsPerPlayer = {}

  for (const player of players) {
    const playerId = GamePlayers.getId(player)
    handCards[playerId] = []
    playedCards[playerId] = Opt.None()
  }

  for (const card of cards) {
    if (GameCards.isHand(card)) {
      const playerId = GamePlayers.getId(card.player)
      handCards[playerId].push(card)
    }

    if (GameCards.isPlayed(card)) {
      const playerId = GamePlayers.getId(card.player)
      playedCards[playerId] = Opt.Some(card)
    }

    if (GameCards.isDeck(card)) {
      deckCards.push(card)
    }
  }

  return { deckCards, handCards, playedCards }
}

export function isPlayerIdActive(player: Option<PlayerActive>, id: number) {
  return Opt.isSome(player) && GamePlayers.getId(player.value) === id
}
