import GameShell from "./components/GameShell";
import Navbar from "./components/Navbar";
import PlayerSections from "./components/PlayerSections";
import PlayedCards from "./components/PlayedCards";
import DeckButton from "./components/DeckButton";

import * as css from "./CangkulanGame.styles";

const CangkulanGame = () => {
  return (
    <GameShell>
      <Navbar />
      <div className={css.layout4}>
        <PlayerSections />
        <div className={css.gameTable}>
          <PlayedCards />
          <DeckButton />
        </div>
      </div>
    </GameShell>
  )
}

export default CangkulanGame
