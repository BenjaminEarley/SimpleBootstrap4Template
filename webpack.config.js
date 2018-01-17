const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default'],
      'Util': "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      'jquery': 'jquery/dist/jquery.slim.js',
    }
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html-loader'
    }],
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function() { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ],
  },
};
