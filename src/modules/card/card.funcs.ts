import { suits, ranks } from "./card.consts"
import { Card } from "./card.types"

export function generateDeck(): Card[] {
  return ranks.flatMap(rank => suits.map(suit => ({ rank, suit })))
}

export function getRankInNumber({ rank }: Card): number {
  if (rank === 'J') {
    return 11
  }
  if (rank === 'Q') {
    return 12
  }
  if (rank === 'K') {
    return 13
  }
  if (rank === 'A') {
    return 14
  }
  return rank
}

export function isEqual(card1: Card, card2: Card) {
  return card1.rank === card2.rank && card1.suit === card2.suit
}
