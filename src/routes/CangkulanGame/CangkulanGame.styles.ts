import { css } from "@emotion/css";

export const background = css`
  background-color: #333333;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const navbar = css`
  padding: 16px;
  display: flex;
  align-items: baseline;
  color: #fff;
`;

export const backLink = css`
  color: #fff;
  font-size: 24px;
`;

export const title = css`
  font-size: 24px;
  margin: 0 0 0 16px;
`;

export const layout4 = css`
  display: grid;
  grid-template-columns: 225px auto 225px;
  grid-template-rows: 160px auto 160px;
  color: #fff;
  flex-grow: 1;
  align-items: center;
  justify-items: center;

  & .player-container:nth-of-type(1) {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
  }

  & .player-container:nth-of-type(2) {
    grid-row: 1 / 4;
    grid-column: 1 / 2;
  }

  & .player-container:nth-of-type(3) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  & .player-container:nth-of-type(4) {
    grid-row: 1 / 4;
    grid-column: 3 / 4;
  }
`;

export const gameTable = css`
  place-self: stretch;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
  align-items: center;
  justify-items: center;
  
  & .player-play:nth-of-type(1) {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
  }

  & .player-play:nth-of-type(2) {
    grid-row: 1 / 4;
    grid-column: 1 / 2;
  }

  & .player-play:nth-of-type(3) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  & .player-play:nth-of-type(4) {
    grid-row: 1 / 4;
    grid-column: 3 / 4;
  }
`;

// export const playerContainer = css`
//   display: flex;

// `;

export const playerName = css`
  margin: 0 0 8px;
  font-size: 16px;
`;

export const playerNameWinPlay = css`
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

export const centerButton = css`
  padding: 10px;
  border-radius: 4px;
  border: none;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

export const voidCard = css`
  width: 60px;
  height: 80px;
`;
