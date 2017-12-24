const path = require('path');

const MockjsWebpackPlugin = require('../dist/index');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new MockjsWebpackPlugin({
        path: path.join(__dirname, './mock'),
        port: 3000
    })
  ],
  devServer: {
    port: 5001,
    proxy: {
      '/': 'http://localhost:3000/'
    }
  }
};