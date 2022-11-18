import { Card } from "../../modules/card/card.types"

export interface Props {
  card: Card
  down?: boolean
  disabled?: boolean
  onClick?: () => void
}