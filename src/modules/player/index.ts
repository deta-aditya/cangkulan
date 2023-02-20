export interface Player {
  id: number
  name: string
}

export function fromNames(names: string[]) {
  return names.map((name, idx) => ({
    id: idx,
    name,
  }))
}

export function isEqual(player1: Player, player2: Player) {
  return player1.id === player2.id
}
