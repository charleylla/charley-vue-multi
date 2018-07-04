const env = process.env.ENVIROMENT.replace(/(\s*$)|(^\s*)/ig,"");
const option = process.env.OPTION.replace(/(\s*$)|(^\s*)/ig,"");
const webpackConfigFn = require(`./build/webpack.config.${env}`);
module.exports = webpackConfigFn(env,{ option })
