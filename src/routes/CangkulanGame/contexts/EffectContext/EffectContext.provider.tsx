import { createContext, PropsWithChildren, useContext, useState } from "react";

import * as GameEffects from "@/modules/game/effect";
import { mapQuery } from "@/modules/mapper";

import type { GameEffect } from "@/modules/game/effect";
import type { EffectContextValue } from "./EffectContext.types";

const EffectContext = createContext<EffectContextValue | null>(null)

export const EffectProvider = ({ children }: PropsWithChildren) => {
  const [effect, _setEffect] = useState(GameEffects.NoOp())

  const setEffect = (newEffect: GameEffect) => {
    if (GameEffects.isEqual(effect, newEffect)) {
      return;
    }
    _setEffect(newEffect)
  }

  const isPlayerWinningPlay = mapQuery(effect, GameEffects.isPlayerWinningPlay)
  
  const contextValue = { effect, setEffect, isPlayerWinningPlay }
  
  return (
    <EffectContext.Provider value={contextValue}>
      {children}
    </EffectContext.Provider>
  );
}

export const useGameEffect = () => {
  const contextValue = useContext(EffectContext)
  if (contextValue === null) {
    throw new Error('useGameEffect must be used within EffectProvider')
  } 

  return contextValue;
}
