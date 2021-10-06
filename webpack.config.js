const path = require('path');

module.exports = {
  entry: './source/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, './source'),
      watch: true,
    },
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
