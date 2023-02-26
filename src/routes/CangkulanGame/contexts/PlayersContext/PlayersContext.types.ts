import type { GamePlayer, PlayerWonGame } from "@/modules/game/player"
import type { GamePlayerList } from "@/modules/game/playerList"
import type { Option } from "@/modules/option"

export type PlayersContextValue = {
  players: GamePlayerList
  gameWinner: Option<PlayerWonGame>
  isWinningGame: (player: GamePlayer) => boolean
  setPlayers: (players: GamePlayerList) => void
}
