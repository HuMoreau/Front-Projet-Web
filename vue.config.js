const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "cfg",
            to: "cfg",
          },
        ],
      }),
    ]
  },
  transpileDependencies: true
};