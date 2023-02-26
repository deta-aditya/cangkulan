import * as Players from "../../player"

import type { GamePlayer } from "./player.cases"

export function isEqual(player1: GamePlayer, player2: GamePlayer) {
  return player1.kind === player2.kind && isPlayerEqual(player1, player2)
}

export function isPlayerEqual(player1: GamePlayer, player2: GamePlayer) {
  return Players.isEqual(player1.player, player2.player)
}

export function getId({ player }: GamePlayer) {
  return player.id
}

export function getName({ player }: GamePlayer) {
  return player.name
}

export function compare(thisPlayer: GamePlayer, thatPlayer: GamePlayer) {
  return getId(thisPlayer) - getId(thatPlayer)
}
