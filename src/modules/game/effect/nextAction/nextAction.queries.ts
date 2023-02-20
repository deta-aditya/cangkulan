import type { GamePlayer } from "../../player"
import type { PlayEndingNextAction } from "./nextAction.cases"

export function when<A>(cases: { flush: () => A, rake: (raker: GamePlayer) => A }, value: PlayEndingNextAction) {
  switch (value.kind) {
    case 'next-action-flush':
      return cases.flush()
    case 'next-action-rake':
      return cases.rake(value.raker)
  }
}
