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

export const formControl = css`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const formLabel = css`
  width: 100px;
  text-align: right;
  margin-right: 8px;
  font-size: 16px; 
`;

export const formInput = css`
  font-size: 16px;
  padding: 6px 8px; 
`;

export const formCheckbox = css`
  ${formControl}
  margin-left: 108px;
`;

export const button = css`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
`;

export const primaryButton = css`
  ${button}
  background: linear-gradient(#89b6ff 0%, #1f85c0 100%);
  color: #fff;
`;

export const linkButton = css`
  ${button}
  background: none;
`;
