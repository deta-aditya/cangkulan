export const suitProperties = {
  diamonds: {
    symbol: '♦',
    color: 'red',
  },
  clubs: {
    symbol: '♣',
    color: 'black',
  },
  hearts: {
    symbol: '♥',
    color: 'red',
  },
  spades: {
    symbol: '♠',
    color: 'black',
  }
} as const

export const suits = ['spades', 'hearts', 'clubs', 'diamonds'] as const
export const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'] as const
