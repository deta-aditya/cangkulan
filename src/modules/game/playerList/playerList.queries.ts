import * as Opt from "../../option";
import * as GamePlayers from '../player';

import type { Option } from "../../option";
import type { PlayerActive } from "../player";
import type { GamePlayerList } from "./playerList.types";

export function getActivePlayer(players: GamePlayerList): Option<PlayerActive> {
  const activePlayer = players.find(GamePlayers.isActive)
  if (!activePlayer) {
    return Opt.None()
  }
  return Opt.Some(activePlayer)
}

export function getNames(players: GamePlayerList) {
  return players.map(GamePlayers.getName)
}
