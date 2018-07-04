const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const vueLoader = {
  test: /\.vue$/,
  use: "vue-loader"
}

const cssLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    "vue-style-loader",
    "css-loader",
    "postcss-loader"
  ]
}

const sassLoader = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    "vue-style-loader",
    "css-loader",
    "sass-loader",
    "postcss-loader"
  ]
}

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ["babel-loader"]
}

const imgLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    }
  }
}

const fontLoader = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: ["url-loader"]
}

exports.initLoader = function(env){
  if(env !== "dev"){
    cssLoader.use = [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "postcss-loader"
    ];

    sassLoader.use = [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
      "postcss-loader"
    ]
  }
  return [
    vueLoader,
    cssLoader,
    sassLoader,
    jsLoader,
    imgLoader,
    fontLoader
  ]
}
