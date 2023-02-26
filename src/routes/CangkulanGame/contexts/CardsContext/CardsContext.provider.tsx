import { createContext, PropsWithChildren, useContext, useState } from "react";

import * as GameCardLists from "@/modules/game/cardList"
import * as GameCardGroups from "@/modules/game/cardGroup"

import { usePlayers } from "../PlayersContext";
import { useConfig } from "../ConfigContext";

import type { GameCardList } from "@/modules/game/cardList";
import type { CardsContextValue } from "./CardsContext.types";

const CardsContext = createContext<CardsContextValue | null>(null);

export const CardsProvider = ({ children }: PropsWithChildren) => {
  const { cardsPerPlayer } = useConfig()
  const { players } = usePlayers()

  const [cards, _setCards] = useState<GameCardList>(
    () => GameCardLists.initialize(players, cardsPerPlayer)
  );

  const setCards = (newCards: GameCardList) => {
    if (GameCardLists.isEqual(cards, newCards)) {
      return;
    }
    _setCards(newCards)
  }

  const {
    deckCards,
    handsPerPlayer,
    playedPerPlayer,
  } = GameCardGroups.create(cards, players)
  const topMostDeck = GameCardGroups.getTopMostDeck(deckCards)
  const suitInPlay = GameCardLists.getSuitInPlay(cards)


  const contextValue = { 
    cards,
    topMostDeck,
    handsPerPlayer, 
    playedPerPlayer, 
    suitInPlay, 
    setCards,
  }

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
}

export const useCards = () => {
  const contextValue = useContext(CardsContext)
  if (contextValue === null) {
    throw new Error('useCards must be used within CardsProvider')
  } 

  return contextValue;
}
