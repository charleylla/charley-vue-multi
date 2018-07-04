const env = process.env.ENVIROMENT.trim();
const option = process.env.OPTION ? process.env.OPTION.trim() : "";
const webpackConfigFn = require(`./build/webpack.config.${env}`);
module.exports = webpackConfigFn(env,{ option })
