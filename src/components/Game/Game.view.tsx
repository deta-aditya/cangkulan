import { useEffect, useMemo, useReducer } from "react"
import logifier from "../../services/logifier/logifier"
import { Card } from "../../modules/card"
import PlayingCardView from '../PlayingCard';
import { extractHands, extractPlays, getSuitInPlay, getTopMostDeck, initializeGame, isHandsPlayable } from "./Game.helpers"
import { initialGameState, gameReducer } from "./Game.reducers"
import {
  cardContainer,
  cardList,
  deck,
  gameLayout, 
  gameTable, 
  playedCard, 
  playerItem, 
  playerName, 
  sidebar, 
  sidebarHeader,
  winnerName,
} from "./Game.styles"

const Game = () => {
  const players = ['Heejin', 'Hyunjin', 'Haseul', 'Vivi']
  const [gameState, dispatch] = useReducer(
    gameReducer,
    initialGameState(players),
    () => initializeGame(players),
  )

  const hands = useMemo(
    () => extractHands(gameState.cards, players),
    [gameState.cards, players],
  )

  const plays = useMemo(
    () => extractPlays(gameState.cards, players),
    [gameState.cards, players],
  )

  const isGameWon = gameState.winner >= 0
  const isPlaying = gameState.turn >= 0
  const suitInPlay = getSuitInPlay(plays)
  const topMostDeck = getTopMostDeck(gameState.cards)
  const playerHasPlayableCard = 
    isPlaying
    && isHandsPlayable(hands[gameState.turn], suitInPlay)
  const disableDeck = isGameWon 
    || playerHasPlayableCard 
    || gameState.effect.kind === 'play-ending'

  const handlePlayCard = (card: Card) => {
    dispatch({ kind: 'play', card })
  }

  const handleDrawCard = (card: Card) => {
    dispatch({ kind: 'draw', card })
  }

  useEffect(() => {
    if (gameState.effect.kind === 'play-ending') {
      setTimeout(() => {
        dispatch({ kind: 'play-next' })
      }, 1000)
    }
  }, [gameState.effect.kind])

  return (
    <div className={gameLayout}>
      <div className={sidebar}>
        <h2 className={sidebarHeader}>
          Players
        </h2>
        {hands.map((hand, idx) => {
          const player = players[idx]
          const isThisPlayersTurn = idx === gameState.turn
          const isPlayerWinningCurrentPlay = 
            gameState.effect.kind === 'play-ending' 
            && gameState.effect.winnerIndex === idx
          
          return (
            <div key={`hand-${player}`} className={playerItem}>
              <h3 className={playerName(isPlayerWinningCurrentPlay)}>
                {player}
              </h3>
              <div className={cardList}>
                {hand.map((card) => {
                  const disableCard = isGameWon 
                    || isThisPlayersTurn 
                    && suitInPlay && suitInPlay !== card.suit
                  return (
                    <div
                      key={`hand-${card.rank}-${card.suit}`}
                      className={cardContainer}
                    >
                      <PlayingCardView
                        card={card}
                        down={!isThisPlayersTurn}
                        disabled={disableCard}
                        onClick={isThisPlayersTurn ? () => handlePlayCard(card) : undefined}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className={gameTable}>
        {isGameWon && (
          <div className={winnerName}>
            {players[gameState.winner]} wins the game!
          </div>
        )}
        <div className={deck}>
          {topMostDeck && <PlayingCardView 
            card={topMostDeck} 
            onClick={() => handleDrawCard(topMostDeck)}
            disabled={disableDeck}
            down
          />}
        </div>
        {plays.map((play, idx) => (
          <div key={`play-${idx}`} className={playedCard(idx, players.length)}>
            {play && <PlayingCardView card={play} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Game
