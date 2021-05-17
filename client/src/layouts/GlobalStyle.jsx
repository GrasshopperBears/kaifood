import { createGlobalStyle } from "styled-components";

const theme = {
  color: {
    textColor: "#24292e",
    secondaryTextColor: "#586069",
    borderGray: "#b1b1b1",
    darkPurple: "rgba(31, 26, 56, 0.9)",
    mistyRose: "rgba(239, 210, 203, 0.3)",
  },
  fontSize: {
    xl: "32px",
    lg: "20px",
    md: "16px",
    sm: "14px",
    xs: "12px",
  },
  radius: {
    md: "6px",
  },
  padding: {
    sidePadding: "25px",
    headerSidePadding: "30px",
  },
};

/** reset css */
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'S-CoreDream-5Medium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'S-CoreDream-8Heavy';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    font-family: inherit;
    color: inherit;
    outline: 0;
    
  }

  html {
    width: 100%;
    height: 100%;
    * {
      font-family: 'S-CoreDream-5Medium';
    }
  }

  body {
    width: 100%;
    height: 100%;
    color: ${theme.textColor};
    font-size: 100%;
    line-height: 1.2;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    cursor: pointer;
    background-color: transparent;
  }
  
  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }
  /******************************** */
  /* antd design 관련 global setting */
  /******************************** */
  .ant-popover-inner-content {
    padding: 0 28px;
  }

  .ant-modal {
    top: 50px;
  }

  .ant-btn-primary{
    border-color: rgba(31, 26, 56, 0.9);
    background-color: rgba(31, 26, 56, 0.9);
  }
  /******************************** */
  /* -------antd setting end------- */
  /******************************** */

  #app {
    width: 100%;
    height: 100%;
  }
`;

export { GlobalStyle, theme };
