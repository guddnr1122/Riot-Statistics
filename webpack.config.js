const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  mode: 'development',
  devServer: {
    static: {
      directory: __dirname,
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
  }
};