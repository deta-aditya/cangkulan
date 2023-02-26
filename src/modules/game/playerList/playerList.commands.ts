import * as GamePlayers from '../player';
import * as Opt from "../../option";
import { getActivePlayer } from './playerList.queries';

import type { GamePlayerList } from "./playerList.types"
import type { GamePlayer } from '../player';

export function mapForNextTurn(players: GamePlayerList) {
  const currentActivePlayer = getActivePlayer(players)
  if (Opt.isNone(currentActivePlayer)) {
    return players
  }

  const currentActivePlayerId = GamePlayers.getId(currentActivePlayer.value)
  const nextActivePlayerId = (currentActivePlayerId + 1) % players.length

  return players.map((player) => {
    if (nextActivePlayerId === GamePlayers.getId(player)) {
      return GamePlayers.Active(player.player)
    }
    return GamePlayers.Passive(player.player)
  })
}

export function mapForNextPlay(players: GamePlayerList) {
  const playWinner = players.find(GamePlayers.isWonPlay)
  if (!playWinner) {
    return players
  }

  return players.map((gamePlayer) => {
    const { player } = gamePlayer
    if (GamePlayers.isPlayerEqual(gamePlayer, playWinner)) {
      return GamePlayers.Active(player)
    }
    return GamePlayers.Passive(player)
  })
}

export function setPlayWinner(players: GamePlayerList, winner: GamePlayer) {
  return players.map(player => {
    if (GamePlayers.isPlayerEqual(winner, player)) {
      return GamePlayers.WonPlay(player.player)
    }
    return GamePlayers.Passive(player.player)
  })
}

export function setGameWinner(players: GamePlayerList, winner: GamePlayer) {
  return players.map(player => {
    if (GamePlayers.isPlayerEqual(winner, player)) {
      return GamePlayers.WonGame(player.player)
    }
    return GamePlayers.Passive(player.player)
  })
}
