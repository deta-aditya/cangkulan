import { createContext, PropsWithChildren, useContext, useEffect } from "react";

import * as Games from "@/modules/game";
import * as GameEffects from "@/modules/game/effect";
import { useConfig } from "../ConfigContext";
import { PlayersContextValue, usePlayers } from "../PlayersContext";
import { CardsContextValue, useCards } from "../CardsContext";
import { EffectContextValue, useGameEffect } from "../EffectContext";

import type { GameContextValue } from "./GameContext.types";
import type { Game } from "@/modules/game";

const createGameCommandFactory = (params: {
  game: Game,
  setCards: CardsContextValue['setCards'], 
  setPlayers: PlayersContextValue['setPlayers'], 
  setEffect: EffectContextValue['setEffect'] 
}) => <T extends any[]>(command: (current: Game, ...args: T) => Game) => (...args: T) => {
  const { game, setCards, setPlayers, setEffect } = params
  const newGame = command(game, ...args)
  setCards(newGame.cards)
  setPlayers(newGame.players)
  setEffect(newGame.effect)
}

const GameContext = createContext<GameContextValue | null>(null)

export const GameProvider = ({ children }: PropsWithChildren) => {
  const { players, setPlayers } = usePlayers()
  const { cards, setCards } = useCards()
  const { effect, setEffect } = useGameEffect()
  const config = useConfig()

  const game = { cards, players, config, effect }
  const commandFactory = createGameCommandFactory({ 
    game, 
    setCards, 
    setPlayers, 
    setEffect,
  })

  const play = commandFactory(Games.play)
  const playNext = commandFactory(Games.playNext)
  const draw = commandFactory(Games.draw)
  const rake = commandFactory(Games.rake)
  const reset = commandFactory(Games.reset)

  const isDeckDisabled = Games.isDeckDisabled(game)

  const contextValue = {
    play, draw, rake, reset,
    isDeckDisabled,
  }

  useEffect(() => {
    if (GameEffects.isPlayEnding(effect)) {
      const timeout = setTimeout(playNext, 1000)
      return () => clearInterval(timeout)
    }
  }, [effect])
  

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const contextValue = useContext(GameContext)
  if (contextValue === null) {
    throw new Error('useGame must be used within GameProvider')
  }

  return contextValue;
}
