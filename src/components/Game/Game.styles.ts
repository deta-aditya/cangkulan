import { css } from "@emotion/css";

export const gameLayout = css`
  display: flex;
` 

export const sidebar = css`
  height: 100vh;
  width: 500px;
  background: #fff;
`

export const sidebarHeader = css`
  margin: 0;
  padding: 16px;
`

export const playerItem = css`
  border-top: 1px solid #ddd;
`

export const playerName = (isWinning: boolean) => css`
  margin: 16px 16px 8px;
  color: ${isWinning ? 'red' : 'black'}
`

export const cardList = css`
  display: flex;
  margin: 0 0 16px 16px;
  width: calc(100% - 16px);
  overflow-x: auto;
`

export const cardContainer = css`
  margin-left: -30px;
  &:first-of-type {
    margin-left: 0px;
  }
`

export const gameTable = css`
  position: relative;
  flex-grow: 1;
`

// This style determines card position based on player number.
// Looks like trigonometry is used in real life after all!
export const playedCard = (playerNo: number, numOfPlayers: number) => css`
  position: absolute;
  top: calc(50% - 70px - ${Math.cos(Math.PI * playerNo / (numOfPlayers / 2)) * 90}px);
  left: calc(50% - 50px + ${Math.sin(Math.PI * playerNo / (numOfPlayers / 2)) * 70}px);
`

export const deck = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 80px;
  top: calc(50% - 70px);
  left: calc(50% - 50px);
`

export const winnerName = css`
  text-align: center;
  margin-top: 30px;
  font-size: 24px;
  color: black;
`

export const rakeButton = css`
  padding: 10px;
  border-radius: 4px;
  border: none;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`