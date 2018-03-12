const path = require("path");
const ExamplePlugin = require("./ExamplePlugin.js");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
	     {
	       test: /\.jpe?g$/,
               use: ["file-loader"]
	     }
    ]
  },
  plugins: [
    new ExamplePlugin(),
    new webpack.ContextReplacementPlugin()
  ], 
  mode: "production",
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
}
