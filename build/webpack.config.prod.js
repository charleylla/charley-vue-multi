const webpackMerge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { resolve } = require("./bundle")
const { externals } = require("./externals")
const webpackBaseFn = require("./webpack.config.base");

module.exports = function(env,{ option }){
  const baseConfig = webpackBaseFn(env)
  const reportOn = option === "report"
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
  ];
  if(reportOn){
    plugins.push(new BundleAnalyzerPlugin())
  }

  return webpackMerge(baseConfig,{
    mode:"production",
    optimization:{
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      },
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
    stats:{
      chunkGroups: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      moduleTrace: false,
      source: false,
      children: false,
    },
    externals,
    plugins
  });
}
