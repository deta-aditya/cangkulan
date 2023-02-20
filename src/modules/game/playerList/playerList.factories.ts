import * as Players from "../../player";
import * as GamePlayers from '../player';
  
export function initialize(names: string[]) {
  const players = Players.fromNames(names)
  const firstTurn = Math.floor(Math.random() * players.length)

  return players.map((player) => {
    if (firstTurn === player.id) {
      return GamePlayers.Active(player)
    }
    return GamePlayers.Passive(player)
  })
}
