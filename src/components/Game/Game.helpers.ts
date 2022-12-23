import * as Opt from "../../modules/option";
import * as GamePlayers from "../../modules/game/player";

import type { Option } from "../../modules/option";
import type { CardDeck, CardPlayed, GameCard } from "../../modules/game/card";
import type { Suit } from "../../modules/card"
import type { GamePlayer } from "../../modules/game/player";

export function getPlaySuit(playedCards: CardPlayed[]): Option<Suit> {
  if (playedCards.length === 0) {
    return Opt.None()
  }
  return Opt.Some(playedCards[0].card.suit);
}

export function getTopMostDeck(deckCards: CardDeck[]): Option<CardDeck> {
  if (deckCards.length === 0) {
    return Opt.None()
  }
  return Opt.Some(deckCards[0])
}

export function isHandPlayable(suit: Option<Suit>, handCards: GameCard[]) {
  return Opt.isNone(suit) || handCards.some(({ card }) => card.suit === suit.value)
}

export function sortGamePlayers(players: GamePlayer[]) {
  return players.sort((player1, player2) => GamePlayers.getId(player1) - GamePlayers.getId(player2));
}
