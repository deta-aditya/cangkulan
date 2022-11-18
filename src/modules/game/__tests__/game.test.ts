import { describe, expect, it } from 'vitest'
import * as Game from '../index'

describe('Game.create', () => {
  it('should return initial game', () => {
    const result = Game.create(['Alpha', 'Beta', 'Gamma', 'Delta'])
    expect(result.players).toStrictEqual(['Alpha', 'Beta', 'Gamma', 'Delta'])
    expect(result.cards).toHaveLength(52)
    expect(result.turn.kind).toBe('active')
    expect(result.winner.kind).toBe('nobody')
    expect(result.effect.kind).toBe('noop')
  })
})
