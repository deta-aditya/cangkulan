import { Card } from "../../modules/card"

export interface GameState {
  cards: Array<GameCard>
  players: Players
  turn: number
  effect: GameEffect
  winner: number
}

export type GameAction =
  | { kind: 'play', card: Card }
  | { kind: 'play-next' }
  | { kind: 'draw', card: Card }

export type GameCardState =
  | { kind: 'deck' }
  | { kind: 'hand', player: string }
  | { kind: 'played', player: string }
  | { kind: 'done' }

export type GameEffect =
  | { kind: 'noop' }
  | { kind: 'play-ending', winnerIndex: number }

export interface GameCard {
  card: Card
  state: GameCardState
}

export type Players = Array<string>

export type Hands = Array<Card>

export type Plays = Array<Card | undefined>
