var webpack = require("webpack");

module.exports = {
  entry: {
    // Dirty workaround. See https://github.com/webpack/webpack/issues/300
    index: ["./src/index"],
    test: "./src/test",
    polyfill: "./src/polyfill",
  },
  output: {
    publicPath: "/build/",
    filename: "build/[name].js"
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
