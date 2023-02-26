import type { PropsWithChildren } from "react"

import { CardsProvider } from "../../contexts/CardsContext"
import { ConfigProvider } from "../../contexts/ConfigContext"
import { EffectProvider } from "../../contexts/EffectContext"
import { GameProvider } from "../../contexts/GameContext"
import { PlayersProvider } from "../../contexts/PlayersContext"

import * as css from './GameShell.styles'

const GameShell = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider>
      <PlayersProvider>
        <CardsProvider>
          <EffectProvider>
            <GameProvider>
              <div className={css.background}>
                {children}
              </div>
            </GameProvider>
          </EffectProvider>
        </CardsProvider>
      </PlayersProvider>
    </ConfigProvider>
  )
}

export default GameShell
