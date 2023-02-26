import PlayingCard from "@/components/PlayingCard";
import usePlayerSectionsView from "./PlayerSections.hook";
import * as css from './PlayersSection.styles'

const PlayersSection = () => {
  const playersModel = usePlayerSectionsView()

  return (
    <>
      {playersModel.map((player) => (
        <section key={player.id} className="player-container">
          <h2 className={player.isWinningPlay ? css.winningPlayerName : css.playerName}>
            {player.name}
            {player.isWinningGame ? ' won the game!' : ''}
          </h2>
          <div className={player.handStyle}>
            {player.hands.map(hand => (
              <PlayingCard
                key={hand.key}
                card={hand.card}
                down={!player.isActive}
                disabled={hand.disableCard}
                onClick={hand.handleClick} 
              />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

export default PlayersSection
