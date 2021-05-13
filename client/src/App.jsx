import React, { useEffect } from "react";
import MainRouter from "@routers/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "@store";
import Header from "@components/common/header/Header";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@layouts/GlobalStyle";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import koKR from "antd/lib/locale/ko_KR";

const store = createStore(reducers);

const App = () => {
  const initAuthState = async () => {};

  useEffect(() => {
    initAuthState();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <ConfigProvider locale={koKR}>
            <Header />
            <MainRouter />
          </ConfigProvider>
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
