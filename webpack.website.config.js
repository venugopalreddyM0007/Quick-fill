const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, 'src', 'website', 'index.jsx'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/website/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/website/assets',
          to: path.join(__dirname, 'dist/assets'),
          force: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
