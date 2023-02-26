import usePlayedCardsView from "./PlayedCards.hook"

import PlayingCardView from "@/components/PlayingCard/PlayingCard.view"
import * as css from "./PlayedCards.styles";

const PlayedCards = () => {
  const playedCardsModel = usePlayedCardsView()

  return (
    <>
    {playedCardsModel.map(playedCards => (
      <section key={playedCards.key} className="player-play">
        {playedCards.when({
          played: gameCard => <PlayingCardView card={gameCard.card} />,
          notPlayed: () => <div className={css.voidCard} />
        })}
      </section>
    ))}
    </>
  )
}

export default PlayedCards
