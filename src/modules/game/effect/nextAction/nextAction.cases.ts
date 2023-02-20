import { GamePlayer } from "../../player"

export type PlayEndingNextAction =
  | NextActionFlush
  | NextActionRake

interface NextActionFlush {
  kind: 'next-action-flush'
}

interface NextActionRake {
  kind: 'next-action-rake'
  raker: GamePlayer
}

export function Flush(): PlayEndingNextAction {
  return { kind: 'next-action-flush' }
}

export function Rake(raker: GamePlayer): PlayEndingNextAction {
  return { kind: 'next-action-rake', raker }
}

export function isFlush(nextAction: PlayEndingNextAction): nextAction is NextActionFlush {
  return nextAction.kind === 'next-action-flush'
}

export function isRake(nextAction: PlayEndingNextAction): nextAction is NextActionRake {
  return nextAction.kind === 'next-action-rake'
}
