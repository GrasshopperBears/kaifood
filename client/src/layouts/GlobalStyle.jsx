import { createGlobalStyle } from "styled-components";

const theme = {
  color: {
    textColor: "#24292e",
    secondaryTextColor: "#586069",
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
};

/** reset css */
const GlobalStyle = createGlobalStyle`
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

  #app {
    width: 100%;
    height: 100%;
  }
`;

export { GlobalStyle, theme };
