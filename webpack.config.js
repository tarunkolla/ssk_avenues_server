const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    main: "./server.mjs",
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "index.js",
  },
  target: "node",
  resolve: {
    extensions: [".mjs", ".ts", ".js"],
  },
  // devtool: "source-map",

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
