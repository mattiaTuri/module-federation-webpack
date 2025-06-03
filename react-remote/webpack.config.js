const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
  },
  experiments:{
    outputModule:true
  },
  output: {
    filename: 'bundle.js',
    module:true,
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'reactapp',
      library: { type: "module"},
      filename: 'remoteEntry.js',
      exposes: {
        './ReactApp': './src/App',
      },
      shared: {
        react: { singleton: true, strictVersion:true, requiredVersion: "^19.0.0"},
        'react-dom': { singleton:true, strictVersion:true, requiredVersion: "^19.0.0"},
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    port: 4202,
    liveReload:true,
    hot: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};