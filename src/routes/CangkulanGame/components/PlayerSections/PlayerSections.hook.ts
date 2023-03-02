import * as Opt from "@/modules/option";
import * as GameCards from "@/modules/game/card";
import * as GamePlayers from "@/modules/game/player";

import { usePlayers } from "@/routes/CangkulanGame/contexts/PlayersContext"
import { useGameEffect } from "@/routes/CangkulanGame/contexts/EffectContext";
import { useCards } from "@/routes/CangkulanGame/contexts/CardsContext";
import { useGame } from "@/routes/CangkulanGame/contexts/GameContext";
import { STYLE_PER_PLAYER } from "./PlayerSections.constants";

const usePlayerSectionsView = () => {
  const { players, gameWinner, isWinningGame } = usePlayers()
  const { handsPerPlayer, suitInPlay } = useCards()
  const { isPlayerWinningPlay } = useGameEffect()
  const { play } = useGame()

  const playersModel = players.map(player => {
    const playerId = GamePlayers.getId(player)
    const isPlayerActive = GamePlayers.isActive(player)
    const playerHands = handsPerPlayer[playerId]
    const handStyle = STYLE_PER_PLAYER[playerId](playerHands.length);
    const hands = playerHands.map(hand => {
      const { card } = hand;
      const isCardPlayable = Opt.isNone(suitInPlay) || suitInPlay.value === card.suit
      const disableCard = Opt.isSome(gameWinner) || !isPlayerActive || !isCardPlayable
      return {
        card,
        disableCard,
        handleClick: play,
        key: `hand-${playerId}-${GameCards.getKey(hand)}`,
      }
    })

    return {
      id: playerId,
      name: GamePlayers.getName(player),
      isWinningPlay: isPlayerWinningPlay(player),
      isWinningGame: isWinningGame(player),
      isActive: isPlayerActive,
      handStyle,
      hands,
    }
  })

  return playersModel
}

export default usePlayerSectionsView
