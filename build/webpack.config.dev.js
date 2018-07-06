const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const { resolve } = require("./bundle")
const webpackBaseFn = require("./webpack.config.base");

module.exports = function(env){
  const baseConfig = webpackBaseFn(env)
  return webpackMerge(baseConfig,{
    mode:"development",
    devServer:{
      contentBase:resolve("dist"),
      host:"0.0.0.0",
      useLocalIp: true,
      overlay:{
        errors:true,
        warnings:true
      },
      open:true,
      hot:true,
      historyApiFallback: true,
      inline: true,
      disableHostCheck: true,
      stats:{
        assets: false,
        chunks: false,
        chunkGroups: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
        moduleTrace: false,
        source: false,
        builtAt: false,
        children: false,
        hash:false,
      },
    },
    plugins:[
      //热更新
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}
