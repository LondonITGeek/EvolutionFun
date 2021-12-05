const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  watch: true,
  entry: "./src/index.js",
  devtool: "eval-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
