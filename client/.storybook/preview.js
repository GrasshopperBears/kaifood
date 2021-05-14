import { ThemeProvider } from "styled-components";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "@store";
import { GlobalStyle, theme } from "@layouts/GlobalStyle";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import koKR from "antd/lib/locale/ko_KR";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore(reducers);
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <ConfigProvider locale={koKR}>
          <Story />
        </ConfigProvider>
      </Provider>
    </ThemeProvider>
  ),
];
