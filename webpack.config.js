const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");
const webpackConfigFn = require(`./build/webpack.config.${env}`);
module.exports = webpackConfigFn(env)
