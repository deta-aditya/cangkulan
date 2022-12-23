import { useEffect, useReducer } from "react"
import * as GameModule from "../../modules/game";
import * as GameAction from "../../modules/game/action";
import * as GameEffect from "../../modules/game/effect";
import * as GamePlayers from "../../modules/game/player";
import * as Opt from "../../modules/option";

import type { Card } from "../../modules/card"

import PlayingCardView from '../PlayingCard';
import * as css from "./Game.styles"
import { getPlaySuit, getTopMostDeck, isHandPlayable, sortGamePlayers } from "./Game.helpers"

const PLAYERS = ['Heejin', 'Hyunjin', 'Haseul', 'Vivi']

const Game = () => {
  const [gameState, dispatch] = useReducer(GameModule.reduce, null, () => GameModule.create(PLAYERS))
  const { players: gamePlayers, effect: gameEffect } = gameState

  const { 
    handCards, 
    playedCards,
    deckCards, 
  } = GameModule.divideCardsByState(gameState)

  const perhapsGameWinner = gamePlayers.find(GamePlayers.isWonGame)
  const gameWinner = Opt.fromNullable(perhapsGameWinner)
  const isPlaying = gamePlayers.some(GamePlayers.isActive)

  const sortedGamePlayers = sortGamePlayers(gamePlayers)

  const suitInPlay = getPlaySuit(playedCards)
  const topMostDeck = getTopMostDeck(deckCards)
  const activePlayerHand = GameModule.getCurrentPlayerHands(gameState)

  const activePlayerHasPlayableCard = 
    isPlaying
    && isHandPlayable(suitInPlay, activePlayerHand)

  const disableDeck = 
    Opt.isSome(gameWinner) 
    || activePlayerHasPlayableCard 
    || GameEffect.isPlayEnding(gameEffect)

  const handlePlayCard = (card: Card) => {
    dispatch(GameAction.Play(card))
  }

  const handleDrawCard = (card: Card) => {
    dispatch(GameAction.Draw(card))
  }

  const handleRakeCards = () => {
    dispatch(GameAction.Rake())
  }

  useEffect(() => {
    if (GameEffect.isPlayEnding(gameEffect)) {
      setTimeout(() => {
        dispatch(GameAction.PlayNext())
      }, 1000)
    }
  }, [gameEffect.kind])

  return (
    <div className={css.gameLayout}>
      <div className={css.sidebar}>
        <h2 className={css.sidebarHeader}>
          Players
        </h2>
        {sortedGamePlayers.map((gamePlayer) => {
          const { player } = gamePlayer
          const { name } = player

          const isPlayerActive = GamePlayers.isActive(gamePlayer)
          const isPlayerWinningCurrentPlay = 
            GameEffect.isPlayEnding(gameEffect) 
            && GamePlayers.isEqual(gameEffect.winner, gamePlayer)
          
          const playerHand = handCards.filter(card => 
            GamePlayers.isEqual(card.player, gamePlayer)
          )
          
          return (
            <div key={`hand-${name}`} className={css.playerItem}>
              <h3 className={css.playerName(isPlayerWinningCurrentPlay)}>
                {name}
              </h3>
              <div className={css.cardList}>
                {playerHand.map(({ card }) => {
                  const isCardPlayable = Opt.isNone(suitInPlay) || suitInPlay.value === card.suit
                  const disableCard = Opt.isSome(gameWinner) || (isPlayerActive && !isCardPlayable)
                  return (
                    <div
                      key={`hand-${card.rank}-${card.suit}`}
                      className={css.cardContainer}
                    >
                      <PlayingCardView
                        card={card}
                        down={!isPlayerActive}
                        disabled={disableCard}
                        onClick={isPlayerActive ? () => handlePlayCard(card) : undefined}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className={css.gameTable}>
        {Opt.isSome(gameWinner) && (
          <div className={css.winnerName}>
            {GamePlayers.getName(gameWinner.value)} wins the game!
          </div>
        )}
        <div className={css.deck}>
          {Opt.isSome(topMostDeck) ? (
            <PlayingCardView 
              card={topMostDeck.value.card} 
              onClick={() => handleDrawCard(topMostDeck.value.card)}
              disabled={disableDeck}
              down
            />
          ) : (
            !disableDeck && <button className={css.rakeButton} onClick={handleRakeCards}>Rake</button>
          )}
        </div>
        {playedCards.map((play) => (
          <div 
            key={`play-${GamePlayers.getId(play.player)}`} 
            className={css.playedCard(GamePlayers.getId(play.player), gamePlayers.length)}
          >
            <PlayingCardView card={play.card} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Game
