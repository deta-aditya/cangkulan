import { Card } from "../../card"

export type GameAction =
  | ActionPlay
  | ActionPlayNext
  | ActionDraw
  | ActionRake
  | ActionReset

export interface ActionPlay { 
  kind: 'play'
  card: Card 
}

export interface ActionPlayNext {
  kind: 'play-next'
}

export interface ActionDraw {
  kind: 'draw'
  card: Card
}

export interface ActionRake {
  kind: 'rake'
}

export interface ActionReset {
  kind: 'reset'
}

export function Play(card: Card): GameAction {
  return { kind: 'play', card }
}

export function PlayNext(): GameAction {
  return { kind: 'play-next' }
}

export function Draw(card: Card): GameAction {
  return { kind: 'draw', card }
}

export function Rake(): GameAction {
  return { kind: 'rake' }
}

export function Reset(): GameAction {
  return { kind: 'reset' }
}
