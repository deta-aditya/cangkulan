import * as Opt from "../../option";
import * as Arrays from "../../array";
import * as GamePlayers from '../player';

import type { Option } from "../../option";
import type { GamePlayer, PlayerActive } from "../player";
import type { GamePlayerList } from "./playerList.types";

export function getActivePlayer(players: GamePlayerList): Option<PlayerActive> {
  const activePlayer = players.find(GamePlayers.isActive)
  if (!activePlayer) {
    return Opt.None()
  }
  return Opt.Some(activePlayer)
}

export function hasActivePlayer(players: GamePlayerList) {
  return players.some(GamePlayers.isActive)
}

export function getNames(players: GamePlayerList) {
  return players.map(GamePlayers.getName)
}

export function getGameWinner(players: GamePlayerList) {
  return Opt.fromNullable(players.find(GamePlayers.isWonGame))
}

export function hasGameWinner(players: GamePlayerList) {
  return players.some(GamePlayers.isWonGame)
}

export function isWinningGame(players: GamePlayerList, player: GamePlayer) {
  return players.some(searchPlayer => 
      GamePlayers.isWonGame(searchPlayer) 
      && GamePlayers.isPlayerEqual(searchPlayer, player)
  )
}

export function isEqual(thisPlayers: GamePlayerList, thatPlayers: GamePlayerList) {
  return Arrays.isKindedListEqual(
    thisPlayers, 
    thatPlayers, 
    GamePlayers.isEqual, 
  )
}