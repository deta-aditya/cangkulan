import PlayingCardView from "@/components/PlayingCard"

import * as css from './DeckButton.styles'
import useDeckButtonView from "./DeckButton.hook"

const DeckButton = () => {
  const deckModel = useDeckButtonView()

  return (
    <div>
      {deckModel({
        showDeck: ({ topMostDeck, disableDeck, handleClick}) => (
          <PlayingCardView card={topMostDeck} onClick={handleClick} disabled={disableDeck} down />
        ),
        showRakeButton: (handleClick) => (
          <button className={css.centerButton} onClick={handleClick}>Rake</button>
        ),
        showPlayAgainButton: (handleClick) => (
          <button className={css.centerButton} onClick={handleClick}>Play Again</button>
        ),
      })}
    </div>
  )
}

export default DeckButton
