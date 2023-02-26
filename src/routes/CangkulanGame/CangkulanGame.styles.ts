import { css } from "@emotion/css";

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
