var webpack = require("webpack");

module.exports = {
  entry: "./src/index",
  output: {
    publicPath: "build/",
    filename: "build/index.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  }
};
