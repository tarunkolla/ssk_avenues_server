const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: false,
        sourceMap: false,
      }),
    ],
  },
};
