const webpackMerge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { resolve } = require("./bundle")
const { externals } = require("./externals")
const webpackBaseFn = require("./webpack.config.base");

module.exports = function(env){
  const baseConfig = webpackBaseFn(env)
  return webpackMerge(baseConfig,{
    mode:"production",
    optimization:{
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: false,
              drop_console: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ]
    },
    externals,
    plugins:[
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash].css",
      }),
      // new BundleAnalyzerPlugin()
    ],
  });
}
