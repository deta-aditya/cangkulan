import type { Card } from "@/modules/card"

export type GameContextValue = {
  play: (card: Card) => void
  draw: (card: Card) => void
  rake: () => void
  reset: () => void
  isDeckDisabled: boolean
}
