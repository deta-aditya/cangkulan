import { css } from "@emotion/css";

export const playerName = css`
  margin: 0 0 8px;
  font-size: 16px;
`;

export const winningPlayerName = css`
  ${playerName}
  color: #ff4958;
`;

export const playerHandHorizontal = css`
  display: flex;
  gap: 4px;
`;

export const playerHandVertical = css`
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: -20px;
  }
`;