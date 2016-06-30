var path = require('path')
var webpack = require('webpack')


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()//,
//    new NyanProgressPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel?compact=false' ],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loaders: ['style','css','sass?sourceMap']
    }
    // ,
    // {
    //   test: /\.js$/,
    //   loader: './webpack/react-architect.js'
    // }
    ]
  }
}
