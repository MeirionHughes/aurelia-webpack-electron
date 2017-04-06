const path = require('path');
const baseDirectory = __dirname;
const build = "build"
const buildPath = path.resolve(baseDirectory, './build');

const webpack = require("webpack");
const WriteFilePlugin = require('write-file-webpack-plugin');
const AureliaPlugin = require("aurelia-webpack-plugin").AureliaPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require("autoprefixer");

let config = {
  entry: { "main": "aurelia-bootstrapper" },
  target:"electron-renderer",
  output: {
    path: buildPath,
    filename: "[name].js",
  },
  devtool: "inline-source-maps"  ,
  devServer: {
    contentBase: 'build'
  },
  resolve: {                                  // (3)
    extensions: [".ts", ".js"],
    modules: ["src", "node_modules"],
  },
  module: {                                   // (4)
    rules: [
      {
        test: /\.scss$/i, use: [
          "css-loader",
          "postcss-loader",
          "sass-loader"]
      },
      { test: /\.html$/i, use: ["html-loader"] },
      { test: /\.ts$/i, loaders: [/*'babel-loader?presets[]=es2015',*/ 'ts-loader'], exclude: path.resolve(__dirname, 'node_modules') },
      { test: /\.json$/i, loader: 'json-loader', exclude: path.resolve(__dirname, 'node_modules') },
      { test: /tether\.js$/, loader: "expose-loader?Tether" },
      { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
      { test: /\.(png|gif|jpg)$/, loader: 'url-loader', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ]
  },
  plugins: [
    new AureliaPlugin({
      pal: "aurelia-pal-browser",
      dist: 'es2015',
      features: { ie: false, svg: false, unparser: false },

    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'Tether': 'tether'
    }),
    new webpack.LoaderOptionsPlugin(
      {
        test: /\.scss$/,
        minimize: false,
        debug: false,
        context: __dirname,
        options: {
          postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
        }
      }
    ),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'src/main.ejs',
      filename: "index.html"
    }),
    new WriteFilePlugin(),
  ]
};

module.exports = config;
