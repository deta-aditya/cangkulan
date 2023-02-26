import * as GamePlayers from '../player'
import * as PlayEndingNextActions from './nextAction'

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

export function isEqual(thisEffect: GameEffect, thatEffect: GameEffect) {
  if (thisEffect.kind !== thatEffect.kind) {
    return false
  }

  if (isPlayEnding(thisEffect) && isPlayEnding(thatEffect)) {
    const isPlayersEqual = GamePlayers.isEqual(thisEffect.winner, thatEffect.winner)
    const isActionsEqual = PlayEndingNextActions.isEqual(thisEffect.nextAction, thatEffect.nextAction)
    return isPlayersEqual && isActionsEqual
  }

  return true
}

export function isPlayerWinningPlay(effect: GameEffect, player: GamePlayer) {
  return isPlayEnding(effect) && GamePlayers.isPlayerEqual(effect.winner, player)
}