import { afterEach, describe, expect, it, vi } from 'vitest'
import * as Game from '../index'
import * as GameCards from '../card'

vi.mock('../../card', () => ({
  generateDeck: vi.fn(() => [
    { rank: 'A', suit: 'diamonds' },
    { rank: 'A', suit: 'clubs' },
    { rank: 'A', suit: 'hearts' },
    { rank: 'A', suit: 'spades' },
    { rank: 'K', suit: 'diamonds' },
  ]),
}))

vi.mock('../../array', () => ({
  shuffle: vi.fn((arr) => arr),
}))

describe('Game.create', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return initial game', () => {
    const result = Game.create(['Alpha', 'Beta', 'Gamma', 'Delta'], 1)
    expect(result.players).toStrictEqual(['Alpha', 'Beta', 'Gamma', 'Delta'])
    expect(result.cards).toStrictEqual([
      GameCards.Hand({ rank: 'A', suit: 'diamonds' }, 'Alpha'),
      GameCards.Hand({ rank: 'A', suit: 'clubs' }, 'Beta'),
      GameCards.Hand({ rank: 'A', suit: 'hearts' }, 'Gamma'),
      GameCards.Hand({ rank: 'A', suit: 'spades' }, 'Delta'),
      GameCards.Deck({ rank: 'K', suit: 'diamonds' })
    ])
    expect(result.turn.kind).toBe('active')
    expect(result.winner.kind).toBe('nobody')
    expect(result.effect.kind).toBe('noop')
  })
})

describe('Game.reduce', () => {
  it('should handle play action', () => {
    const game = {
      
    }
  })
})