import { ReactNode, useEffect, useRef, useState } from 'react';
import { cx } from '@emotion/css';
import * as css from './Modal.styles';

interface Props {
  display: boolean
  children: ReactNode
  title?: ReactNode
  actions?: ReactNode | ((handleClose: Props['onClose']) => ReactNode)
  onClose?: () => void
}

function Modal({ display, children, title, actions, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const [isHiding, setIsHiding] = useState(false)
  const isDisplay = !isHiding && display
  const isHidden = !isHiding && !display

  const handleClose = () => {
    onClose?.()
    setIsHiding(true)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHiding(isHiding => isHiding ? !isHiding : isHiding)
    }, 500)

    return () => clearTimeout(timeout)
  }, [isHiding])

  return (
    <div 
      ref={modalRef} 
      className={cx(css.modal, { 
        [css.modalDisplay]: isDisplay, 
        [css.modalHiding]: isHiding, 
        [css.modalHidden]: isHidden, 
      })}
    >
      <div 
        ref={dialogRef}
        className={cx(css.modalDialog, { 
          [css.modalDialogDisplay]: isDisplay, 
          [css.modalDialogHiding]: isHiding 
        })}
      >
        {title && <h1 className={css.modalTitle}>{title}</h1>}
        <button onClick={handleClose} className={css.modalCloseButton}>&times;</button>
        {children}
        {actions && <div className={css.modalFooter}>{typeof actions === 'function' ? actions(handleClose) : actions}</div>}
      </div>
    </div>
  )
}

export default Modal