import type { GameCardList } from "@/modules/game/cardList"
import type { HandCardsPerPlayer, PlayedCardsPerPlayer } from "@/modules/game/cardGroup";
import type { CardDeck } from "@/modules/game/card";
import type { Option } from "@/modules/option";
import type { Suit } from "@/modules/card";

export type CardsContextValue = {
  cards: GameCardList
  topMostDeck: Option<CardDeck>
  handsPerPlayer: HandCardsPerPlayer
  playedPerPlayer: PlayedCardsPerPlayer
  suitInPlay: Option<Suit>
  setCards: (cards: GameCardList) => void
}
