import * as Cards from "../../card"
import * as GamePlayers from "../player"
import { GameCard, isHand, isPlayed } from "./card.cases"

import type { GamePlayer } from "../player"

export function isCardOwnedBy(player: GamePlayer, gameCard: GameCard) {
  return isCardHandedBy(player, gameCard) || isCardPlayedBy(player, gameCard)
}

export function isCardHandedBy(player: GamePlayer, gameCard: GameCard) {
  return isHand(gameCard) && GamePlayers.isPlayerEqual(player, gameCard.player)
}

export function isCardPlayedBy(player: GamePlayer, gameCard: GameCard) {
  return isPlayed(gameCard) && GamePlayers.isPlayerEqual(player, gameCard.player)
}

export function getKey({ card }: GameCard) {
  return `${card.rank}-${card.suit}`
}

export function getSuit({ card }: GameCard) {
  return card.suit
}

export function isEqual(thisCard: GameCard, thatCard: GameCard) {
  if (thisCard.kind !== thatCard.kind) {
    return false
  }

  const isCardEqual = Cards.isEqual(thisCard.card, thatCard.card)
  const isHandOrPlayed = (isHand(thisCard) && isHand(thatCard)) 
    || (isPlayed(thisCard) && isPlayed(thatCard))

  if (isHandOrPlayed) {
    const isPlayerEqual = GamePlayers.isEqual(thisCard.player, thatCard.player)
    return isCardEqual && isPlayerEqual
  }

  return isCardEqual
}

export function compare(thisCard: GameCard, thatCard: GameCard) {
  return Cards.compare(thisCard.card, thatCard.card)
}