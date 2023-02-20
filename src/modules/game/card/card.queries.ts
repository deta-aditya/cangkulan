import * as GamePlayers from "../player"
import { GameCard, isHand, isPlayed } from "./card.cases"

import type { GamePlayer } from "../player"

export function isCardOwnedBy(player: GamePlayer, gameCard: GameCard) {
  return isCardHandedBy(player, gameCard) || isCardPlayedBy(player, gameCard)
}

export function isCardHandedBy(player: GamePlayer, gameCard: GameCard) {
  return isHand(gameCard) && GamePlayers.isEqual(player, gameCard.player)
}

export function isCardPlayedBy(player: GamePlayer, gameCard: GameCard) {
  return isPlayed(gameCard) && GamePlayers.isEqual(player, gameCard.player)
}

export function getKey({ card }: GameCard) {
  return `${card.rank}-${card.suit}`
}

export function getSuit({ card }: GameCard) {
  return card.suit
}
