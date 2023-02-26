import type { ReactNode } from "react"

import * as Opt from "@/modules/option";
import { useCards } from "@/routes/CangkulanGame/contexts/CardsContext"

import type { GameCard } from "@/modules/game/card"

const usePlayedCardsView = () => { 
  const { playedPerPlayer } = useCards()
  const playedPerPlayerEntries = Object.entries(playedPerPlayer)

  const playedCardsModel = playedPerPlayerEntries.map(([ playerId, maybeCard ]) => {
    return {
      key: `play-${playerId}`,
      when: (condition: { 
        played: (card: GameCard) => ReactNode, 
        notPlayed: () => ReactNode 
      }) => Opt.fold(condition.played, condition.notPlayed, maybeCard),
    }
  })

  return playedCardsModel
}

export default usePlayedCardsView
