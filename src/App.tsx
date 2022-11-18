import { css } from '@emotion/css'
import './App.css'
import Game from './components/Game'
import PlayingCard from './components/PlayingCard'

function App() {
  const allSuits = ['spades', 'hearts', 'clubs', 'diamonds'] as const
  const allRanks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'] as const

  return (
    <div className="App">
      <Game />
      {/* {allSuits.map(suit => (
        <div 
          className={css`
            display: flex;
          `}
        >
          {allRanks.map(rank => (
            <PlayingCard card={{ suit, rank }} />
          ))}
        </div>
      ))} */}
    </div>
  )
}

export default App
