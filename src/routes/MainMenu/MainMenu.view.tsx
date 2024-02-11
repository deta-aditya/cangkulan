import { useState } from "react"
import { useNavigate } from "react-router-dom"
import dotenv from "dotenv"

import { getErrorByCause, createConfig } from "@/modules/game/config"
import Modal from "@/components/Modal"
import Tooltip from "@/components/Tooltip"

import * as css from "./MainMenu.styles"

dotenv.config()
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

function MainMenu() {
  const navigate = useNavigate()
  const [displayModal, setDisplayModal] = useState(false)
  const [numberOfPlayers, setNumberOfPlayers] = useState('4')
  const [cardsPerPlayer, setCardsPerPlayer] = useState('7')
  const [isStartFromDeck, setIsStartFromDeck] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const gameConfig = createConfig({
    numberOfPlayers,
    cardsPerPlayer,
  })
  
  const numberOfPlayersError = getErrorByCause('numberOfPlayers', gameConfig)
  const cardsPerPlayerError = getErrorByCause('cardsPerPlayer', gameConfig)

  function handleCloseModal() {
    setNumberOfPlayers('4')
    setCardsPerPlayer('7')
    setDisplayModal(false)
  }

  async function handlePlay() {
    if (!gameConfig.success) {
      return
    }

    const requestBody = {
      numberOfPlayers: gameConfig.value.numberOfPlayers,
      cardsPerPlayer: gameConfig.value.cardsPerPlayer,
      isStartFromDeck,
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${BACKEND_URL}/games`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
      const result = await response.json()
      if (response.ok) {
        navigate(`/game/${result.id}`)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={css.mainMenu}>
      <h1 className={css.title}>Cangkulan</h1>
      <Modal
        title="New Cangkulan Game"
        display={displayModal} 
        onClose={handleCloseModal}
        actions={onClose => (
          <>
            <button onClick={onClose} type="button" className={css.linkButton}>Cancel</button>
            <button onClick={handlePlay} type="button" className={css.primaryButton}>Create</button>
          </>
        )} 
      >
        <div className={css.formControl}>
          <label className={css.formLabel} htmlFor="numberOfPlayers">Players</label>
          <Tooltip display={numberOfPlayersError !== null} value={numberOfPlayersError} mode="danger">
            <input className={css.formInput} id="numberOfPlayers" name="numberOfPlayers" value={numberOfPlayers} onChange={e => setNumberOfPlayers(e.target.value)} min={2} />
          </Tooltip>
        </div>
        <div className={css.formControl}>
          <label className={css.formLabel} htmlFor="cardsPerPlayer">Cards</label>
          <Tooltip display={cardsPerPlayerError !== null} value={cardsPerPlayerError} mode="danger">
            <input className={css.formInput} id="cardsPerPlayer" name="cardsPerPlayer" value={cardsPerPlayer} onChange={e => setCardsPerPlayer(e.target.value)} min={5} />
          </Tooltip>
        </div>
        <div className={css.formCheckbox}>
          <input type="checkbox" id="isStartFromDeck" name="isStartFromDeck" checked={isStartFromDeck} onChange={() => setIsStartFromDeck(current => !current)} />
          <label htmlFor="isStartFromDeck">Start from deck</label>
        </div>
      </Modal>
      <button type="button" onClick={() => setDisplayModal(true)} className={css.playButton}>
        New Game
      </button>
    </div>
  )
}

export default MainMenu

