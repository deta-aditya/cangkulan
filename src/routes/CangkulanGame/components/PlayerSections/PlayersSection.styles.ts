import { css } from "@emotion/css";

export const playerName = css`
  margin: 0 0 8px;
  font-size: 16px;
`;

export const winningPlayerName = css`
  ${playerName}
  color: #ff4958;
`;

export const playerHandHorizontal = (numberOfCards: number) => css`
  display: flex;
  & > *:not(:first-child) {
    margin-left: ${(() => {
      if (numberOfCards > 17) {
        return '-15px'
      }
      if (numberOfCards > 15) {
        return '-5px;'
      }
      return '4px;'
    })()}
  }
`;

export const playerHandVertical = (numberOfCards: number) => css`
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: ${(() => {
      if (numberOfCards > 19) {
        return '-55px;'
      }
      if (numberOfCards > 14) {
        return '-50px;'
      }
      if (numberOfCards > 10) {
        return '-40px;'
      }
      if (numberOfCards > 8) {
        return '-30px;'
      }
      return '-20px;'
    })()}
  }
`;