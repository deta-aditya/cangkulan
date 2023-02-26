import { createContext, PropsWithChildren, useContext, useState } from "react";

import * as GamePlayerLists from "@/modules/game/playerList"
import { mapQuery } from "@/modules/mapper";
import { useConfig } from "../ConfigContext";

import type { GamePlayerList } from "@/modules/game/playerList";
import type { PlayersContextValue } from "./PlayersContext.types";

const PlayersContext = createContext<PlayersContextValue | null>(null);

export const PlayersProvider = ({ children }: PropsWithChildren) => {
  const { names } = useConfig()
  const [players, _setPlayers] = useState<GamePlayerList>(
    () => GamePlayerLists.initialize(names)
  ); 

  const setPlayers = (newPlayers: GamePlayerList) => {
    if (GamePlayerLists.isEqual(players, newPlayers)) {
      return;
    }
    _setPlayers(newPlayers)
  }

  const isWinningGame = mapQuery(players, GamePlayerLists.isWinningGame)

  const gameWinner = GamePlayerLists.getGameWinner(players)

  const contextValue = { 
    players, 
    gameWinner, 
    isWinningGame, 
    setPlayers 
  }

  return (
    <PlayersContext.Provider value={contextValue}>
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayers = () => {
  const contextValue = useContext(PlayersContext)
  if (contextValue === null) {
    throw new Error('usePlayers must be used within PlayersProvider')
  } 

  return contextValue;
}
