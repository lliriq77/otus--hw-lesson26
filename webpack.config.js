const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { NODE_ENV } = process.env;

module.exports = {
  entry: resolve(__dirname, "./src/index.ts"),
  output: {
    filename: "[name].[hash:10].js",
    path: resolve(`${__dirname}/dist`),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  mode: NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
    }),
  ],
  devServer: {
    client: {
      logging: "info",
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  experiments: {
    futureDefaults: true,
    topLevelAwait: true,
  },
};
