import React, { useEffect, useReducer } from "react"
import * as GameModule from "../../modules/game";
import * as GameCards from "../../modules/game/card";
import * as GameAction from "../../modules/game/action";
import * as GameEffect from "../../modules/game/effect";
import * as GamePlayers from "../../modules/game/player";
import * as Opt from "../../modules/option";

import type { Card } from "../../modules/card"

import PlayingCardView from '../../components/PlayingCard';
import * as css from "./CangkulanGame.styles"
import { getPlaySuit, getTopMostDeck, isHandPlayable, isPlayerIdActive, sortGamePlayers, groupCards } from "./CangkulanGame.helpers"
import { useNavigate } from "react-router-dom";

const PLAYERS = ['Heejin', 'Hyunjin', 'Haseul', 'Vivi']

const CangkulanGame = () => {
  const navigate = useNavigate()
  const [gameState, dispatch] = useReducer(GameModule.reduce, null, () => GameModule.create(PLAYERS))
  const { cards: gameCards, players: gamePlayers, effect: gameEffect } = gameState

  const { 
    handCards, 
    playedCards,
    deckCards, 
  } = groupCards(gameCards, gamePlayers)

  const perhapsGameWinner = gamePlayers.find(GamePlayers.isWonGame)
  const gameWinner = Opt.fromNullable(perhapsGameWinner)

  const isPlaying = gamePlayers.some(GamePlayers.isActive)
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

  const showPlayAgainButton = Opt.isSome(gameWinner);
  const showDeck = Opt.isNone(gameWinner) && Opt.isSome(topMostDeck);
  const showRakeButton = Opt.isNone(gameWinner) && Opt.isNone(topMostDeck) && !disableDeck;

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    navigate('/')
  }

  const handlePlayAgain = () => {
    dispatch(GameAction.Reset())
  }

  const handlePlayCard = (card: Card) => {
    dispatch(GameAction.Play(card))
  }

  const handleDrawCard = (card: Card) => {
    dispatch(GameAction.Draw(card))
  }

  const handleRakeCards = () => {
    dispatch(GameAction.Rake())
  }

  const stylePerPlayer = [
    css.playerHandHorizontal,
    css.playerHandVertical,
    css.playerHandHorizontal,
    css.playerHandVertical,
  ]

  useEffect(() => {
    if (GameEffect.isPlayEnding(gameEffect)) {
      setTimeout(() => {
        dispatch(GameAction.PlayNext())
      }, 1000)
    }
  }, [gameEffect.kind])

  return (
    <div className={css.background}>
      <div className={css.navbar}>
        <a className={css.backLink} href="#" onClick={handleBack}>&times;</a>
        <h1 className={css.title}>Cangkulan</h1>
      </div>
      <div className={css.layout4}>
        {gamePlayers.map((player) => {
          const playerId = GamePlayers.getId(player)
          const isPlayerActive = GamePlayers.isActive(player)
          const isPlayerWinningPlay = 
            GameEffect.isPlayEnding(gameEffect) 
            && GamePlayers.isEqual(gameEffect.winner, player)
          const isPlayerWinningGame = Opt.isSome(gameWinner) && GamePlayers.isEqual(gameWinner.value, player)
          return (
            <section className="player-container">
              <h2 className={isPlayerWinningPlay ? css.playerNameWinPlay : css.playerName}>
                {GamePlayers.getName(player)}
                {isPlayerWinningGame && ' won the game!'}
              </h2>
              <div className={stylePerPlayer[playerId]}>
                {handCards[playerId].map(hand => {
                  const { card } = hand
                  const isCardPlayable = Opt.isNone(suitInPlay) || suitInPlay.value === card.suit
                  const disableCard = Opt.isSome(gameWinner) || (isPlayerActive && !isCardPlayable)
                  return (
                    <PlayingCardView
                      key={`hand-${playerId}-${GameCards.getKey(hand)}`}
                      card={card}
                      down={!isPlayerActive}
                      disabled={disableCard}
                      onClick={isPlayerActive ? () => handlePlayCard(card) : undefined} 
                    />
                  );
                })}
              </div>
            </section>
          )
        })}
        <div className={css.gameTable}>
          {Object.entries(playedCards).map(([playerId, perhapsCard]) => (
            <section key={`play-${playerId}`} className="player-play">
              {Opt.fold(
                gameCard => <PlayingCardView card={gameCard.card} />, 
                () => <div className={css.voidCard} />, 
                perhapsCard
              )}
            </section>
          ))}
          <div>
            {showDeck && <PlayingCardView 
              card={topMostDeck.value.card} 
              onClick={() => handleDrawCard(topMostDeck.value.card)}
              disabled={disableDeck}
              down
            />}
            {showRakeButton && <button className={css.centerButton} onClick={handleRakeCards}>Rake</button>}
            {showPlayAgainButton && <button className={css.centerButton} onClick={handlePlayAgain}>Play Again</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CangkulanGame
