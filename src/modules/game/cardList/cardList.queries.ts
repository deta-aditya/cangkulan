import * as Opt from "@/modules/option"
import * as Cards from "@/modules/card";
import * as Arrays from "@/modules/array";
import * as GameCards from "@/modules/game/card";

import type { GameCardList } from "./cardList.types";
import type { GamePlayer } from "../player";
import type { Suit } from "@/modules/card";
import type { Option } from "@/modules/option";

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

export function isEqual(thisCards: GameCardList, thatCards: GameCardList) {
  return Arrays.isKindedListEqual(
    thisCards, 
    thatCards, 
    GameCards.isEqual, 
  )
}

export function isPlayable(cards: GameCardList, suit: Option<Suit>) {
  return Opt.isNone(suit) || cards.some(({ card }) => card.suit === suit.value)
}

export function getSuitInPlay(cards: GameCardList) {
  for (const card of cards) {
    if (GameCards.isPlayed(card)) {
      return Opt.Some(GameCards.getSuit(card))
    }    
  }
  return Opt.None<Suit>()
}
