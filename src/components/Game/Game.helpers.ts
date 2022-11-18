import { Card, generateDeck, rankToNumber, Suit } from "../../modules/card"
import { cardsPerHand } from "./Game.constants"
import { GameCard, GameState, Hands, Players, Plays } from "./Game.types"

export const shuffleDeck = () => {
  const deck = generateDeck()
  return deck
    .map(card => [card, Math.random()] as const)
    .sort(([, a], [, b]) => a - b)
    .map(([card]) => card)
}

export const distributeCards = (
  deck: Array<Card>, 
  players: Players
): Array<GameCard> => {
  interface ReduceObject { distributed: number, gameCards: Array<GameCard> }

  const { gameCards } = deck.reduce<ReduceObject>((obj, card, idx) => {
    const { distributed, gameCards } = obj
    const distributionFinished = distributed === players.length * cardsPerHand
    const player = players[idx % players.length]
    return {
      distributed: distributionFinished ? distributed : distributed + 1,
      gameCards: [
        ...gameCards,
        {
          card,
          state: distributionFinished
            ? { kind: 'deck' }
            : { kind: 'hand', player },
        }
      ]
    }
  }, { distributed: 0, gameCards: [] })

  return gameCards
}

export const randomTurn = (numberOfPlayers: number) => {
  return Math.floor(Math.random() * numberOfPlayers)
}

export const initializeGame = (players: Players): GameState => {
  const deck = shuffleDeck()
  const cards = distributeCards(deck, players)
  const turn = randomTurn(players.length)
  return {
    cards,
    turn,
    players,
    effect: { kind: 'noop' },
    winner: -1,
  }
}

export const extractHands = (
  cards: Array<GameCard>, 
  players: Players
): Array<Hands> => {
  return players.map((player) => {
    return cards
      .filter(card => card.state.kind === 'hand' && card.state.player === player)
      .map(({ card }) => card)
  })
}

export const extractPlays = (
  cards: Array<GameCard>, 
  players: Players
): Plays => {
  return players.map(player => {
    const playersCards = cards
      .filter(card => card.state.kind === 'played' && card.state.player === player)
      .map(({ card }) => card)

    if (playersCards.length === 0) {
      return undefined
    }
    return playersCards[0]
  })
}

export const mapToPlayedCard = (
  cards: Array<GameCard>, 
  playedCard: Card, 
  player: string
): Array<GameCard> => {
  return cards.map(gameCard => {
    if (gameCard.card === playedCard) {
      return { 
        ...gameCard, 
        state: { 
          kind: 'played',
          player,
        },
      }
    }
    return gameCard
  })
}

export const nextTurn = (currentTurn: number, numOfPlayers: number): number => {
  return (currentTurn + 1) % numOfPlayers
}

export const getSuitInPlay = (plays: Plays): Suit | undefined => {
  return plays.filter(play => play !== undefined)[0]?.suit
}

export const flushPlayedCards = (cards: Array<GameCard>): Array<GameCard> => {
  return cards.map(gameCard => {
    if (gameCard.state.kind === 'played') {
      return {
        ...gameCard,
        state: { kind: 'done' }
      }
    }
    return gameCard
  })
}

export const getPlayWinnerIndex = (plays: Plays): number => {
  return plays
    .map((play, idx) => [play === undefined ? 0 : rankToNumber(play.rank), idx])
    .sort(([a], [b]) => a - b)
    .reverse()[0][1]
}

export const getTopMostDeck = (cards: Array<GameCard>): Card | undefined => {
  const deck = cards.filter(card => card.state.kind === 'deck')

  if (deck.length === 0) {
    return undefined
  }
  return deck[0].card
}

export const isHandsPlayable = (hands: Hands, suitInPlay: Suit | undefined): boolean => {
  return suitInPlay === undefined || hands.some(card => card.suit === suitInPlay)
}

export const mapDrewToHand = (
  cards: Array<GameCard>, 
  drewCard: Card, 
  player: string
): Array<GameCard> => {
  return cards.map(gameCard => {
    if (gameCard.card === drewCard) {
      return {
        ...gameCard,
        state: {
          kind: 'hand',
          player,
        }
      }
    }
    return gameCard
  })
}

export const getGameWinnerIndex = (cards: Array<GameCard>, players: Players): number => {
  const currentHands = extractHands(cards, players)
  return currentHands.findIndex(cards => cards.length === 0)
}