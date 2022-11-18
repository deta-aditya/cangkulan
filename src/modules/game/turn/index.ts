export type Turn =
  | TurnNobody
  | TurnActive

export interface TurnNobody {
  kind: 'nobody'
}

export interface TurnActive {
  kind: 'active'
  index: number
}

export function Nobody(): Turn {
  return { kind: 'nobody' }
}

export function Active(index: number): Turn {
  return { kind: 'active', index }
}

export function nextTurn(numberOfPlayers: number, turn: Turn): Turn {
  switch (turn.kind) {
    case 'nobody':
      return Active(Math.floor(Math.random() * 10) % numberOfPlayers)
    case 'active':
      return Active((turn.index + 1) % numberOfPlayers)
  }
}

export function isActive(turn: Turn): turn is TurnActive {
  return turn.kind === 'active'
}
