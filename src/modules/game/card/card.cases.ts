import type { Card } from "../../card"
import type { GamePlayer } from "../player"

export type GameCard =
  | CardDeck
  | CardHand
  | CardPlayed
  | CardFlushed

export interface CardDeck {
  kind: 'deck' 
  card: Card
}

export interface CardHand {
  kind: 'hand'
  card: Card
  player: GamePlayer
}

export interface CardPlayed {
  kind: 'played'
  card: Card
  player: GamePlayer
}

export interface CardFlushed {
  kind: 'flushed' 
  card: Card
}

export function Deck(card: Card): GameCard {
  return { kind: 'deck', card, }
}

export function Hand(card: Card, player: GamePlayer): GameCard {
  return { kind: 'hand', card, player }
}

export function Played(card: Card, player: GamePlayer): GameCard {
  return { kind: 'played', card, player }
}

export function Flushed(card: Card): GameCard {
  return { kind: 'flushed', card, }
}

export function isPlayed(gameCard: GameCard): gameCard is CardPlayed {
  return gameCard.kind === 'played'
}

export function isHand(gameCard: GameCard): gameCard is CardHand {
  return gameCard.kind === 'hand'
}

export function isDeck(gameCard: GameCard): gameCard is CardDeck {
  return gameCard.kind === 'deck'
}
