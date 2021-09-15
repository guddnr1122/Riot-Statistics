const path = require('path');


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: __dirname,
    },
    proxy: {
      '/api': { //insert the end point to set server proxy
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
        exclude: /npm_modules/
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader",]
      }
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"],
  }
};