import MainRouter from "@routers/index";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@layouts/GlobalStyle";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainRouter />
      </ThemeProvider>
    </div>
  );
};

export default App;
