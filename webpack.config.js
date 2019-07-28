const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/app.jsx',
    public: './client/public.jsx',
  },
  output: {
    path: path.join(__dirname, 'web_service/static'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$|/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'client')],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_styles.css',
    }),
  ],
};
