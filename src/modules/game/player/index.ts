import * as Players from '../../player'
import type { Player } from "../../player"

export type GamePlayer = 
  | PlayerPassive
  | PlayerActive
  | PlayerWonPlay
  | PlayerWonGame

export interface PlayerPassive {
  kind: 'passive'
  player: Player
}

export interface PlayerActive {
  kind: 'active'
  player: Player
}

export interface PlayerWonPlay {
  kind: 'won-play'
  player: Player
}

export interface PlayerWonGame {
  kind: 'won-game'
  player: Player
}

export function Passive(player: Player): GamePlayer {
  return { kind: 'passive', player }
}

export function Active(player: Player): GamePlayer {
  return { kind: 'active', player }
}

export function WonPlay(player: Player): GamePlayer {
  return { kind: 'won-play', player }
}

export function WonGame(player: Player): GamePlayer {
  return { kind: 'won-game', player }
}

export function isActive(player: GamePlayer): player is PlayerActive {
  return player.kind === 'active';
}

export function isWonPlay(player: GamePlayer): player is PlayerWonPlay {
  return player.kind === 'won-play';
}

export function isWonGame(player: GamePlayer): player is PlayerWonGame {
  return player.kind === 'won-game';
}

export function isEqual(player1: GamePlayer, player2: GamePlayer) {
  return Players.isEqual(player1.player, player2.player)
}

export function getId({ player }: GamePlayer) {
  return player.id
}

export function getName({ player }: GamePlayer) {
  return player.name
}
