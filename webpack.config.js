const path = require('path');
const webpack = require('webpack');
 
// I stole this from create-react-app
// ... :(
//
// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.prod.js
module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        // @remove-on-eject-begin
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
        },
        // @remove-on-eject-end
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: true,
    }),
  ],
};
