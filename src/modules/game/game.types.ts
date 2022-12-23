import { GameCard } from "./card"
import { GameEffect } from "./effect"
import { GamePlayer } from "./player"

export interface Game {
  cards: GameCard[]
  players: GamePlayer[]
  effect: GameEffect
}

export type Player = string
