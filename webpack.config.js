var path = require('path')
var config = {
  entry: './src/main.js',
  output: {
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    inline: true,
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
module.exports = config
