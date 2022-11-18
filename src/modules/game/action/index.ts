import { Card } from "../../card"

export type GameAction =
  | ActionPlay
  | ActionPlayNext
  | ActionDraw

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

export function Play(card: Card): GameAction {
  return { kind: 'play', card }
}

export function PlayNext(): GameAction {
  return { kind: 'play-next' }
}

export function Draw(card: Card): GameAction {
  return { kind: 'draw', card }
}
