import { extractPlays, flushPlayedCards, getGameWinnerIndex, getPlayWinnerIndex, mapDrewToHand, mapToPlayedCard, nextTurn } from "./Game.helpers";
import { GameAction, GameState, Players } from "./Game.types";

export const initialGameState = (players: Players): GameState => 
  ({ cards: [], players, turn: 0, effect: { kind: 'noop' }, winner: -1 })

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.kind) {
    case 'play':
      return handlePlayAction(state, action)
    case 'play-next':
      return handlePlayNextAction(state)
    case 'draw':
      return handleDrawAction(state, action)
    default:
      return state
  }
}

const handlePlayAction = (
  state: GameState, 
  action: Extract<GameAction, { kind: 'play' }>
): GameState => {
  const mappedCards = mapToPlayedCard(state.cards, action.card, state.players[state.turn])
  const gameWinner = getGameWinnerIndex(mappedCards, state.players)
  const plays = extractPlays(mappedCards, state.players)
  const allHasPlayed = gameWinner === -1 && plays.every(play => play !== undefined)
  const winnerIndex = getPlayWinnerIndex(plays)

  return {
    ...state,
    cards: mappedCards,
    turn: gameWinner >= 0 || allHasPlayed 
      ? -1 
      : nextTurn(state.turn, state.players.length),
    effect: allHasPlayed ? { kind: 'play-ending', winnerIndex } : state.effect,
    winner: gameWinner,
  }
}

const handlePlayNextAction = (state: GameState): GameState => {
  if (state.effect.kind !== 'play-ending') {
    return state
  }
  return {
    ...state,
    cards: flushPlayedCards(state.cards),
    turn: state.effect.winnerIndex,
    effect: { kind: 'noop' },
  }
}

const handleDrawAction = (
  state: GameState, 
  action: Extract<GameAction, { kind: 'draw' }>
): GameState => {
  return {
    ...state,
    cards: mapDrewToHand(state.cards, action.card, state.players[state.turn]),
  }
}

const handleEndGameAction = (state: GameState): GameState => {
  if (state.effect.kind !== 'play-ending') {
    return state
  }
  return {
    ...state,
    winner: state.effect.winnerIndex,
    effect: { kind: 'noop' }
  }
}