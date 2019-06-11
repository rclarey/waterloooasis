const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, "web_service/static"),
    filename: "client_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$|/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
