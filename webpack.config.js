const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./Demo/index.js",
  mode: "development",
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  resolve: {
    alias: {
      ToyReact: path.resolve(__dirname, "ToyReact"),
      "~": path.resolve(__dirname, "./Demo"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "ToyReact.createElement" },
              ],
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({template: './Demo/index.html'})],
};
