import type { GamePlayer } from "../player"
import type { PlayEndingNextAction } from "./nextAction"

export type GameEffect =
  | EffectNoOp
  | EffectPlayEnding

interface EffectNoOp {
  kind: 'noop'
}

interface EffectPlayEnding {
  kind: 'play-ending'
  winner: GamePlayer
  nextAction: PlayEndingNextAction
}

export function NoOp(): GameEffect {
  return { kind: 'noop' }
}

export function PlayEnding(winner: GamePlayer, nextAction: PlayEndingNextAction): GameEffect {
  return { kind: 'play-ending', winner, nextAction }
}

export function isPlayEnding(effect: GameEffect): effect is EffectPlayEnding {
  return effect.kind === 'play-ending';
}
