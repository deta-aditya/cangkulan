import type { GameEffect } from "@/modules/game/effect";
import type { GamePlayer } from "@/modules/game/player";

export type EffectContextValue = {
  effect: GameEffect
  isPlayerWinningPlay: (player: GamePlayer) => boolean
  setEffect: (effect: GameEffect) => void
}
