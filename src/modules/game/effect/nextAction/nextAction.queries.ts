import * as GamePlayers from '../../player'

import { isRake, PlayEndingNextAction } from "./nextAction.cases"
import type { GamePlayer } from "../../player"

export function when<A>(cases: { flush: () => A, rake: (raker: GamePlayer) => A }, value: PlayEndingNextAction) {
  switch (value.kind) {
    case 'next-action-flush':
      return cases.flush()
    case 'next-action-rake':
      return cases.rake(value.raker)
  }
}

export function isEqual(thisAction: PlayEndingNextAction, thatAction: PlayEndingNextAction) {
  if (thisAction.kind !== thatAction.kind) {
    return false
  }

  if (isRake(thisAction) && isRake(thatAction)) {
    return GamePlayers.isEqual(thisAction.raker, thatAction.raker)
  }

  return true;
}
