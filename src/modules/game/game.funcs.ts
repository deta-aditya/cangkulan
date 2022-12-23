import * as Cards from "../card";
import * as Arrays from "../array";
import * as Opt from "../option";
import * as GameCards from "./card";
import * as Effects from "./effect";
import * as Players from "../player";
import * as GamePlayers from './player';
import * as PlayEndingNextActions from './effect/nextAction';

import type { Card } from "../card";
import type { Option } from "../option";
import type { ActionDraw, ActionPlay, GameAction } from "./action";
import type { Game } from "./game.types";
import type { GamePlayer, PlayerActive } from "./player";

const CARDS_PER_PLAYER = 7
export function create(playerNames: string[], cardsPerPlayer = CARDS_PER_PLAYER): Game {
  const players = initializePlayers(playerNames)
  return { 
    players,
    cards: initalizeCards(players, cardsPerPlayer),
    effect: Effects.NoOp(),
  }
}

export function reduce(game: Game, action: GameAction): Game {
  switch (action.kind) {
    case 'play':
      return handlePlayAction(game, action)
    case 'play-next':
      return handlePlayNextAction(game)
    case 'draw':
      return handleDrawAction(game, action)
    case 'rake':
      return handleRakeAction(game)
    default:
      return game
  }
}

function handlePlayAction(game: Game, action: ActionPlay): Game {
  const playedGame = playCard(game, action);
  const { 
    hasWinner: hasGameWinner, 
    players: newGameWinnerPlayers 
  } = getGameWinner(playedGame);

  if (hasGameWinner) {
    return {
      ...playedGame,
      players: newGameWinnerPlayers,
    }
  }

  const { 
    winner: playWinner, 
    players: newPlayWinnerPlayers 
  } = getPlayWinner(playedGame);

  if (Opt.isSome(playWinner)) {
    return {
      ...playedGame,
      players: newPlayWinnerPlayers,
      effect: Effects.PlayEnding(
        playWinner.value, 
        PlayEndingNextActions.Flush(),
      )
    }
  }

  const nextPlayers = getDefaultNextPlayers(playedGame)
  return {
    ...playedGame,
    players: nextPlayers,
  }
}

function handlePlayNextAction(game: Game): Game {
  const { effect } = game
  if (!Effects.isPlayEnding(effect)) {
    return game
  }

  const { nextAction } = effect
  const nextCards = PlayEndingNextActions.when({
    flush: () => flushCards(game),
    rake: raker => rakeCards(game, raker),
  }, nextAction)

  const nextPlayers = getStartingNextPlayers(game)
  return {
    ...game,
    players: nextPlayers,
    cards: nextCards,
    effect: Effects.NoOp(),
  }
}

function handleDrawAction(game: Game, { card: drawnCard }: ActionDraw): Game {
  const currentPlayer = getActivePlayer(game)
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { value: player } = currentPlayer;
  const { cards } = game;

  const newGameCards = cards.map(gameCard => {
    if (GameCards.isDeck(gameCard) && Cards.isEqual(gameCard.card, drawnCard)) {
      return GameCards.Hand(drawnCard, player)
    }
    return gameCard
  })

  return {
    ...game,
    cards: newGameCards,
  }
}

function handleRakeAction(game: Game): Game {
  const currentPlayer = getActivePlayer(game)
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { 
    winner: playWinner, 
    players: newPlayWinnerPlayers 
  } = getPlayWinner(game, true);

  if (Opt.isNone(playWinner)) {
    return game;
  }

  return {
    ...game,
    players: newPlayWinnerPlayers,
    effect: Effects.PlayEnding(
      playWinner.value,
      PlayEndingNextActions.Rake(currentPlayer.value),
    )
  }
}
  
function initializePlayers(names: string[]) {
  const players = Players.toPlayers(names)
  const firstTurn = Math.floor(Math.random() * players.length)

  return players.map((player) => {
    if (firstTurn === player.id) {
      return GamePlayers.Active(player)
    }
    return GamePlayers.Passive(player)
  })
}

function initalizeCards(players: GamePlayer[], cardsPerPlayer: number) {
  const deck = Cards.generateDeck()
  const shuffledDeck = Arrays.shuffle(deck)
  const finalCards = distributeCards(shuffledDeck, players, cardsPerPlayer)

  return finalCards
}

function distributeCards(cards: Card[], players: GamePlayer[], cardsPerPlayer: number) {
  return cards.map((card, cardIndex) => {
    const targetPlayer = players[cardIndex % players.length]
    const handsCapacity = players.length * cardsPerPlayer

    if (cardIndex < handsCapacity) {
      return GameCards.Hand(card, targetPlayer)
    }
    return GameCards.Deck(card)
  })
}

function playCard(game: Game, { card: playedCard }: ActionPlay) {
  const currentPlayer = getActivePlayer(game);
  if (Opt.isNone(currentPlayer)) {
    return game;
  }

  const { value: player } = currentPlayer;
  const { cards } = game;

  const newGameCards = cards.map(gameCard => {
    const isCardOnPlayersHand = GameCards.isCardHandedBy(player, gameCard); 
    const isCardSameAsPlayed = Cards.isEqual(gameCard.card, playedCard)

    if (isCardOnPlayersHand && isCardSameAsPlayed) {
      return GameCards.Played(playedCard, player)
    }
    
    return gameCard;
  });

  return {
    ...game,
    cards: newGameCards,
  }
}

function flushCards({ cards }: Game) {
  return cards.map(gameCard => {
    if (GameCards.isPlayed(gameCard)) {
      return GameCards.Flushed(gameCard.card)
    }
    return gameCard;
  })
}

function rakeCards({ cards }: Game, raker: GamePlayer) {
  return cards.map(gameCard => {
    if (GameCards.isPlayed(gameCard)) {
      return GameCards.Hand(gameCard.card, raker)
    }
    return gameCard
  })
}

function getPlayWinner({ cards, players }: Game, forceWin = false) {
  let winner = Opt.None<GamePlayer>()

  const playedCards = cards.filter(GameCards.isPlayed)
  if (!forceWin && playedCards.length < players.length) {
    return { winner, players }
  }
  
  const rankPerPlayers = playedCards.map(({ card, player }) => {
    const rank = Cards.getRankInNumber(card)
    return { rank, player }
  })

  let highestRank = 0
  for (const { rank, player } of rankPerPlayers) {
    if (rank > highestRank) {
      highestRank = rank
      winner = Opt.Some(player)
    }
  }

  const newPlayers = players.map(player => {
    if (Opt.isSome(winner) && GamePlayers.isEqual(winner.value, player)) {
      return GamePlayers.WonPlay(player.player)
    }
    return GamePlayers.Passive(player.player)
  })

  return {
    winner,
    players: newPlayers,
  }
}

function getGameWinner({ cards, players }: Game) {
  let hasWinner = false
  const newPlayers = players.map((player) => {
    const cardsInHand = cards.filter(card => 
      GameCards.isCardHandedBy(player, card)
    )

    if (cardsInHand.length === 0) {
      hasWinner = true
      return GamePlayers.WonGame(player.player)
    }
    return GamePlayers.Passive(player.player)
  })

  return { hasWinner, players: newPlayers }
}

function getDefaultNextPlayers(game: Game) {
  const { players } = game
  const currentActivePlayer = getActivePlayer(game)
  if (Opt.isNone(currentActivePlayer)) {
    return players
  }

  const currentActivePlayerId = currentActivePlayer.value.player.id
  const nextActivePlayerId = (currentActivePlayerId + 1) % players.length

  return players.map((player) => {
    if (nextActivePlayerId === player.player.id) {
      return GamePlayers.Active(player.player)
    }
    return GamePlayers.Passive(player.player)
  })
}

function getStartingNextPlayers({ players }: Game) {
  const playWinner = players.find(GamePlayers.isWonPlay)
  if (!playWinner) {
    return players
  }

  return players.map((player) => {
    if (GamePlayers.isEqual(player, playWinner)) {
      return GamePlayers.Active(player.player)
    }
    return GamePlayers.Passive(player.player)
  })
}

function getActivePlayer({ players }: Game): Option<PlayerActive> {
  const activePlayer = players.find(GamePlayers.isActive)
  if (!activePlayer) {
    return Opt.None()
  }
  return Opt.Some(activePlayer)
}

export function divideCardsByState({ cards }: Game) {
  let handCards = []
  let playedCards = []
  let deckCards = []
  
  for (const card of cards) {
    if (GameCards.isPlayed(card)) {
      playedCards.push(card)
    }
    if (GameCards.isHand(card)) {
      handCards.push(card)
    }
    if (GameCards.isDeck(card)) {
      deckCards.push(card)
    }
  }

  return {
    handCards,
    playedCards,
    deckCards,
  }
}

export function getCurrentPlayerHands(game: Game) {
  const activePlayer = getActivePlayer(game)
  if (Opt.isNone(activePlayer)) {
    return []
  }

  const { cards } = game
  return cards.filter(card => 
    GameCards.isCardHandedBy(activePlayer.value, card)
  )
}
