import { GameCard } from "./card"
import { GameEffect } from "./effect"
import { GamePlayer } from "./player"

export interface Game {
  cards: GameCard[]
  players: GamePlayer[]
  effect: GameEffect
  config: {
    cardsPerPlayer: number
  },
}

export type Player = string
