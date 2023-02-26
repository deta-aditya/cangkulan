import * as Opt from "@/modules/option"
import * as GameCards from "@/modules/game/card"
import * as GamePlayers from "@/modules/game/player"

import type { Option } from "@/modules/option";
import type { CardDeck, CardHand, CardPlayed } from "../card";
import type { GameCardList } from "../cardList";
import type { GamePlayerList } from "../playerList";

export type HandCardsPerPlayer = Record<number, CardHand[]>
export type PlayedCardsPerPlayer = Record<number, Option<CardPlayed>>

export function create(cards: GameCardList, players: GamePlayerList) {
  const deckCards = []
  const handsPerPlayer: HandCardsPerPlayer = {}
  const playedPerPlayer: PlayedCardsPerPlayer = {}

  for (const player of players) {
    const playerId = GamePlayers.getId(player)
    handsPerPlayer[playerId] = []
    playedPerPlayer[playerId] = Opt.None()
  }

  for (const card of cards) {
    if (GameCards.isHand(card)) {
      const playerId = GamePlayers.getId(card.player)
      handsPerPlayer[playerId].push(card)
    }

    if (GameCards.isPlayed(card)) {
      const playerId = GamePlayers.getId(card.player)
      playedPerPlayer[playerId] = Opt.Some(card)
    }

    if (GameCards.isDeck(card)) {
      deckCards.push(card)
    }
  }

  return { deckCards, handsPerPlayer, playedPerPlayer }
}

export function getTopMostDeck(deckCards: CardDeck[]) {
  return Opt.when(deckCards.length > 0, deckCards[0])
}
