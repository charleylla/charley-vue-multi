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

const eslintLoader = {
  test: /\.(js|vue)$/,
  enforce: "pre",
  exclude: /node_modules/,
  loader: "eslint-loader",
  options: {
    fix:true,
    emitWarning:true,
  }
}

exports.initLoader = function(env){
  const loaders = [];
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
  }else{
    loaders.push(eslintLoader)
  }

  loaders.push(
    vueLoader,
    cssLoader,
    sassLoader,
    jsLoader,
    imgLoader,
    fontLoader
  );

  return loaders;
}
