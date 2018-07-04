const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const { resolve } = require("./bundle")
const webpackBaseFn = require("./webpack.config.base");

module.exports = function(env){
  const baseConfig = webpackBaseFn(env)
  return webpackMerge(baseConfig,{
    mode:"development",
    module:{
      rules:[
        {
          test: /\.(js|vue)$/,
          enforce: "pre",
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            fix:true,
            emitWarning:true,
          }
        },
      ]
    },
    devServer:{
      contentBase:resolve("dist"),
      overlay:{
        errors:true,
        warnings:true
      },
      hot:true
    },
    plugins:[
      //热更新
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}
