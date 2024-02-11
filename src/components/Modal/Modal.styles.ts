import { css, keyframes } from "@emotion/css";

export const modal = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #00000099;
  display: flex;
`;

export const modalDialog = css`
  position: relative;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
`;

export const modalCloseButton = css`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  line-height: 0;
`;

export const modalTitle = css`
  margin: 0 0 36px;
  font-size: 24px;
`;

export const modalFooter = css`
  display: flex;
  justify-content: flex-end;
`;


export const fadeInAnimation = keyframes`
  from { 
    opacity: 0;
  }
  to { 
    opacity: 1;
  }
`;

export const fadeOutAnimation = keyframes`
  from { 
    opacity: 1;
  }
  to { 
    opacity: 0;
  }
`;

export const fadeSlideInAnimation = keyframes`
  from { 
    opacity: 0;
    transform: translateY(50px); 
  }
  to { 
    opacity: 1;
  }
`;

export const fadeSlideOutAnimation = keyframes`
  from { 
    opacity: 1;
  }
  to { 
    opacity: 0;
    transform: translateY(50px); 
  }
`;

export const modalDisplay = css`
  animation: ${fadeInAnimation} 0.5s ease-out;
`;

export const modalDialogDisplay = css`
  animation: ${fadeSlideInAnimation} 0.5s ease-out;
`;

export const modalHiding = css`
  animation-name: ${fadeOutAnimation};
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-fill-mode: both;
`;

export const modalDialogHiding = css`
  animation: ${fadeSlideOutAnimation};
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-fill-mode: both;
`;

export const modalHidden = css`
  display: none;
`;