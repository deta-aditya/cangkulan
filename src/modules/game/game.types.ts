import type { GameEffect } from "./effect"
import type { GameCardList } from "./cardList"
import type { GamePlayerList } from "./playerList"

export interface Game {
  cards: GameCardList
  players: GamePlayerList
  effect: GameEffect
  config: {
    cardsPerPlayer: number
  },
}
