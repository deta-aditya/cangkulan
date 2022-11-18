import { Card } from "../card"
import { GameCard } from "./card"
import { GameEffect } from "./effect"
import { Turn } from "./turn"

export interface Game {
  cards: GameCard[]
  players: Player[]
  turn: Turn
  effect: GameEffect
  winner: Turn
}

export type Player = string

export type Hands = Card[]

export type Plays = Array<Card | undefined>
