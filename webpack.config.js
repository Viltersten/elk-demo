const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");

const webpack = {
  entry: "./src/index.tsx",
  mode: "development",
  output: { filename: 'bundle.js' },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  serve: {
    clipboard: true,
    logLevel: "debug",
    logTime: true,
    host: "localhost",
    port: 8080
  },
  plugins: [
    new CleanWebpackPlugin(["_dist"]),
    new HtmlWebpackPlugin({
      title: "Reactify Poc",
      favicon: "src/assets/favicon.png",
      inject: false,
      template: HtmlWebpackTemplate,
      appMountIds: ["nav", "app"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png)$/,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.[t]sx?$/,
        include: /src/,
        use: [{
          loader: "awesome-typescript-loader",
          options: { configFileName: "tsconfig.json" }
        }]
      }
    ]
  }
};

module.exports = webpack;