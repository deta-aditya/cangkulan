import * as Cards from "../../card";
import * as Arrays from "../../array";
import * as GameCards from "../card";

import type { GamePlayerList } from "../playerList"

export function initialize(players: GamePlayerList, cardsPerPlayer: number) {
  const deck = Cards.generateDeck()
  const shuffledDeck = Arrays.shuffle(deck)
  const finalCards = shuffledDeck.map((card, cardIndex) => {
    const targetPlayer = players[cardIndex % players.length]
    const handsCapacity = players.length * cardsPerPlayer

    if (cardIndex < handsCapacity) {
      return GameCards.Hand(card, targetPlayer)
    }
    return GameCards.Deck(card)
  })

  return finalCards
}
