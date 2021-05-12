const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-create-react-app"],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../src/components/"),
      "@layouts": path.resolve(__dirname, "../src/layouts/"),
      "@pages": path.resolve(__dirname, "../src/pages/"),
      "@routers": path.resolve(__dirname, "../src/routers/"),
      "@actions": path.resolve(__dirname, "../src/store/actions/"),
      "@reducers": path.resolve(__dirname, "../src/store/reducers/"),
      "@store": path.resolve(__dirname, "../src/store/"),
      "@services": path.resolve(__dirname, "../src/services/"),
    };
    return config;
  },
};
