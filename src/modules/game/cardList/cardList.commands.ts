import * as GameCards from "../card";
import * as Cards from  "../../card";

import type { Card } from "../../card";
import type { GamePlayer } from "../player";
import type { GameCardList } from "./cardList.types"

export function flush(cards: GameCardList) {
  return cards.map(gameCard => {
    if (GameCards.isPlayed(gameCard)) {
      return GameCards.Flushed(gameCard.card)
    }
    return gameCard;
  })
}

export function rake(cards: GameCardList,raker: GamePlayer) {
  return cards.map(gameCard => {
    if (GameCards.isPlayed(gameCard)) {
      return GameCards.Hand(gameCard.card, raker)
    }
    return gameCard
  })
}

export function draw(cards: GameCardList, drawnCard: Card, drawer: GamePlayer) {
  return cards.map(gameCard => {
    const isCardOnDeck = GameCards.isDeck(gameCard);
    const isCardSameAsDrawn = Cards.isEqual(gameCard.card, drawnCard);

    if (isCardOnDeck && isCardSameAsDrawn) {
      return GameCards.Hand(drawnCard, drawer)
    }
    return gameCard
  })
}

export function play(cards: GameCardList, playedCard: Card, player: GamePlayer) {
  return cards.map(gameCard => {
    const isCardOnPlayersHand = GameCards.isCardHandedBy(player, gameCard); 
    const isCardSameAsPlayed = Cards.isEqual(gameCard.card, playedCard)

    if (isCardOnPlayersHand && isCardSameAsPlayed) {
      return GameCards.Played(playedCard, player)
    }
    
    return gameCard;
  });
}
