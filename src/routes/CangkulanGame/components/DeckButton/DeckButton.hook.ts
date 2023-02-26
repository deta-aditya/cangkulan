import type { ReactNode } from "react"

import * as Opt from "@/modules/option";
import { useCards } from "@/routes/CangkulanGame/contexts/CardsContext"
import { useGame } from "@/routes/CangkulanGame/contexts/GameContext"
import { usePlayers } from "@/routes/CangkulanGame/contexts/PlayersContext"

import type { Card } from "@/modules/card";

const useDeckButtonView = () => {
  const { gameWinner } = usePlayers()
  const { topMostDeck } = useCards()
  const { draw, rake, reset, isDeckDisabled } = useGame()

  const deckModel = (condition: {
    showDeck: (value: { 
      topMostDeck: Card, 
      disableDeck: boolean, 
      handleClick: (card: Card) => void,
    }) => ReactNode,
    showRakeButton: (handleClick: () => void) => ReactNode,
    showPlayAgainButton: (handleClick: () => void) => ReactNode,
  }) => {
    const showDeck = Opt.isNone(gameWinner) && Opt.isSome(topMostDeck)
    const showRakeButton = Opt.isNone(gameWinner) 
      && Opt.isNone(topMostDeck) 
      && !isDeckDisabled;
    const showPlayAgainButton = Opt.isSome(gameWinner);

    if (showDeck) {
      return condition.showDeck({
        handleClick: draw,
        disableDeck: isDeckDisabled,
        topMostDeck: topMostDeck.value.card,
      })
    }

    if (showRakeButton) {
      return condition.showRakeButton(rake)
    }

    if (showPlayAgainButton) {
      return condition.showPlayAgainButton(reset)
    }

    return null
  }

  return deckModel
}

export default useDeckButtonView
