import * as Effects from "./effect";
import * as GamePlayerLists from "./playerList";
import * as GameCardLists from "./cardList";

import type { Game } from "./game.types";

const CARDS_PER_PLAYER = 7
export function create(playerNames: string[], cardsPerPlayer = CARDS_PER_PLAYER): Game {
  const players = GamePlayerLists.initialize(playerNames)
  const cards = GameCardLists.initialize(players, cardsPerPlayer)

  return { 
    players,
    cards,
    effect: Effects.NoOp(),
    config: {
      cardsPerPlayer,
    }
  }
}