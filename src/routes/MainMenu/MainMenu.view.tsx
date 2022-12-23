import { useNavigate } from "react-router-dom"
import * as css from "./MainMenu.styles"

function MainMenu() {
  const navigate = useNavigate()

  const handlePlay = () => {
    navigate('/cangkulan')
  }

  return (
    <div className={css.mainMenu}>
      <h1 className={css.title}>Cangkulan</h1>
      <button type="button" className={css.playButton} onClick={handlePlay}>Play</button>
    </div>
  )
}

export default MainMenu
