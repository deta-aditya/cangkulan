import { suitProperties } from "../../modules/card/card.consts"

import { cardBack, cardFront, cardStyle, suitStyle } from "./PlayingCard.styles"
import type { Props } from "./PlayingCard.types"

const PlayingCard = (props: Props) => {
  const { card, down = false, disabled = false, onClick } = props
  const { symbol, color } = suitProperties[card.suit]
  
  const handleOnClick = () => {
    if (!disabled) {
      onClick?.()
    }
  }

  return (
    <div 
      className={cardStyle(color, onClick !== undefined, disabled)} 
      onClick={handleOnClick}
    >
      {down ? <div className={cardBack} /> : (
        <div className={cardFront}>
          <span>{card.rank}</span>
          <span className={suitStyle}>{symbol}</span>
        </div>
      )}
    </div>
  )
}

export default PlayingCard