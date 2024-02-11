import { css } from "@emotion/css";

export const tooltipContainer = css`
  position: relative;
`;

export const tooltip = css`
  position: absolute;
  padding: 6px 12px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 5px 0 #00000033;
  z-index: 1;
`;

export const tooltipArrow = css`
  position: absolute;
  width: 16px;
  height: 16px;
  overflow: hidden;

  ::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    transform: rotate(45deg);
    top: 12px;
    left: 4px;
    box-shadow: 0 2px 5px 0 #00000033;
    z-index: 2;
  }
`;

export const hide = css`
  display: none;
`;

export const dangerColorTooltip = css`
  ::after {
    background-color: #f7d9d0;
  }
`

export const dangerColor = css`
  background-color: #f7d9d0;
  color: #a80000;
`;