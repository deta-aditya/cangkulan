import { css } from "@emotion/css"

export const cardStyle = (color: string, clickable: boolean, disabled: boolean) => css`
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 8px;
  font-size: 20px;
  display: flex;
  padding: 4px;
  align-items: stretch;
  width: 50px;
  height: 70px;
  color: ${color};
  position: relative;
  ${clickable ? `
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    transition: 0.25s;
    &:hover {
      box-shadow: 0px 0px 4px 1px #ccc;
      z-index: 99;
    }
    &:active {
      box-shadow: 0px 0px 4px 1px #ccc inset;
    }
  ` : ''}
  ${disabled ? `
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 70px;
      padding: 4px;
      background-color: #ddd;
      border-radius: 8px;
      opacity: 0.8;
    }
  ` : ''}
`

export const suitStyle = css`
  font-size: 28px;
  margin-left: 4px;
`

export const cardFront = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

export const cardBack = css`
  border-radius: 8px;
  flex-grow: 1;
  background-image: url('card-back.jpg');
  background-size: cover;
  background-position: center;
`