export const MAX_CARDS = 52

export type GameConfigResult = 
  | { success: true; value: { numberOfPlayers: number, cardsPerPlayer: number } }
  | { success: false; error: { cause: 'numberOfPlayers' | 'cardsPerPlayer', message: string } }

export function createConfig(config: { numberOfPlayers: string; cardsPerPlayer: string }): GameConfigResult {
  const numberOfPlayers = Number(config.numberOfPlayers);
  if (Number.isNaN(numberOfPlayers)) {
    return { success: false, error: { cause: 'numberOfPlayers', message: 'Players must be a number!' } }
  }

  if (numberOfPlayers < 2) {
    return { success: false, error: { cause: 'numberOfPlayers', message: 'There must be at least 2 players!' } }
  }

  if (numberOfPlayers > 9) {
    return { success: false, error: { cause: 'numberOfPlayers', message: 'The maximum number of players is 9!' } }
  }

  const cardsPerPlayer = Number(config.cardsPerPlayer);
  if (Number.isNaN(cardsPerPlayer)) {
    return { success: false, error: { cause: 'cardsPerPlayer', message: 'Cards must be a number!' } }
  }
  
  if (cardsPerPlayer < 5) {
    return { success: false, error: { cause: 'cardsPerPlayer', message: 'There must be at least 5 cards per player!' } }
  }
  
  if (MAX_CARDS - cardsPerPlayer * numberOfPlayers < cardsPerPlayer) {
    return { success: false, error: { cause: 'cardsPerPlayer', message: 'Deck is too few! Try reducing the number of cards per player.' } }
  }

  return { success: true, value: { numberOfPlayers, cardsPerPlayer } }
}

export function getErrorByCause(cause: Extract<GameConfigResult, { success: false }>['error']['cause'], gameConfigValidity: GameConfigResult) {
  return !gameConfigValidity.success && gameConfigValidity.error.cause === cause 
    ? gameConfigValidity.error.message : null
}