var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')

module.exports = {
  watch: true,
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve('./dist'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          // the loader(s) that should be used when the css is not extracted,
          // i.e. in an additional chunk when `allChunks: false`
          'style-loader',
          // `localIdentName` configure the pattern of generated CSS class
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
        ),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      // it extracts styles only from the initial chunk(s),
      // not from additional chunk(s)
      allChunks: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.tmpl',
      // relative to `output.path`
      filename: 'index.html',
      inject: false,
      favicon: false,
      hash: false,
    }),
  ],
  devServer: {
    contentBase: './dist',
  },
}
