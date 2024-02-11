import { ReactNode, useEffect, useRef } from "react"
import { cx } from "@emotion/css";

import * as css from './Tooltip.styles';

interface Props {
  display: boolean;
  value: ReactNode;
  children: ReactNode;
  mode?: 'default' | 'danger'
}

function Tooltip({ display, children, value, mode = 'default' }: Props) {
  const tooltipContainerRef = useRef<HTMLDivElement>(null)
  const tooltipArrowRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!display || tooltipContainerRef.current === null || tooltipArrowRef.current === null || tooltipRef.current === null) {
      return
    }

    const tooltipContainerRect = tooltipContainerRef.current.getBoundingClientRect()
    const tooltipArrowRect = tooltipArrowRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    tooltipArrowRef.current.style.top = `${tooltipContainerRect.height - tooltipArrowRect.height / 2}px`
    tooltipArrowRef.current.style.left = `${(tooltipRect.width / 2) - (tooltipArrowRect.width / 2)}px`
    tooltipRef.current.style.top = `${tooltipContainerRect.height + tooltipArrowRect.height - tooltipArrowRect.height / 2}px`
  }, [display, value])

  return (
    <div ref={tooltipContainerRef} className={css.tooltipContainer}>
      <div ref={tooltipArrowRef} className={cx(css.tooltipArrow, { [css.hide]: !display, [css.dangerColorTooltip]: mode === 'danger' })} />
      <div ref={tooltipRef} className={cx(css.tooltip, { [css.hide]: !display, [css.dangerColor]: mode === 'danger' })}>{value}</div>
      {children}
    </div>
  )
}

export default Tooltip
