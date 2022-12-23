import { css } from '@emotion/css'

export const mainMenu = css`
  background: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const title = css`
  color: #fff;
  margin: 0;
`;

export const playButton = css`
  margin-top: 32px;
  font-size: 20px;
  padding: 16px 32px;
  border-radius: 12px;
  background-image: linear-gradient(#89b6ff 0%, #1f85c0 100%);
  color: #fff;
  border: 0;
  cursor: pointer;
`;
