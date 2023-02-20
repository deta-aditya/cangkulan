import * as GameCards from "../card";
import * as Cards from "../../card";

import type { GameCardList } from "./cardList.types";
import type { GamePlayer } from "../player";

export function getPlayed(cards: GameCardList) {
  return cards.filter(GameCards.isPlayed)
}

export function getHandedBy(cards: GameCardList, player: GamePlayer) {
  return cards.filter(card => GameCards.isCardHandedBy(player, card))
}

export function getRankByPlayers(cards: GameCardList) {
  if (!cards.every(GameCards.isPlayed)) {
    return []
  } 

  return cards.map(({ card, player }) => {
    const rank = Cards.getRankInNumber(card)
    return { rank, player }
  })
}