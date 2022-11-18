import type { TurnActive } from "../turn"

export type GameEffect =
  | EffectNoOp
  | EffectPlayEnding

interface EffectNoOp {
  kind: 'noop'
}

interface EffectPlayEnding {
  kind: 'play-ending'
  winner: TurnActive
}

export function NoOp(): GameEffect {
  return { kind: 'noop' }
}

export function PlayEnding(winner: TurnActive): GameEffect {
  return { kind: 'play-ending', winner }
}

export function isPlayEnding(effect: GameEffect): effect is EffectPlayEnding {
  return effect.kind === 'play-ending';
}
