import MainRouter from "@routers/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "@store";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@layouts/GlobalStyle";
import "antd/dist/antd.css";

const store = createStore(reducers);

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <MainRouter />
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
