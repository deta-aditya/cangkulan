import { ranks, suits } from "./card.consts"

export type Suit = typeof suits[number]
export type Rank = typeof ranks[number]

export interface Card {
  suit: Suit
  rank: Rank
}
