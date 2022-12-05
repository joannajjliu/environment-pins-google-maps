require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "none",
  // "maxEntrySize": 200,
  // "optimization": {
  //     "splitChunks": true,
  // "maxEntrypointSize": 204800 //in bytes
  // },
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  devtool: "cheap-module-source-map",
  devServer: {
    // "contentBase": path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
    // "overlay": true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      apiUrl: `https://maps.googleapis.com/maps/api/js?key=${process.env.google_map_key}&libraries=places&callback=initMap&v=weekly`,
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            // "attrs": ['img:src', ":data-src"],
            minimize: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
