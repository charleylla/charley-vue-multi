const fs = require("fs")
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const alias = require("./alias")
const resolve = (p) => path.resolve(__dirname,"..",p)

const entryDir = resolve("src/page")
const outputDir = resolve("dist")
const templatePath = resolve("template/index.html")
const entryFiles = fs.readdirSync(entryDir)
const
  entry = {},
  output = {}
  htmlPlugins = [];


// Map alias
function resolveAlias(){
  Object.keys(alias).forEach(attr => {
    const val = alias[attr]
    alias[attr] = resolve(val)
  })
}

// Handle Entry and Output of Webpack
function resolveEntryAndOutput(env){
  entryFiles.forEach(dir => {
    entry[dir] = resolve(`${entryDir}/${dir}`)
    if(env === "dev"){
      output.filename = "js/[name].bundle.js";
    }else{
      output.filename = "js/[name].bundle.[hash].js";
    }
    output.path = outputDir;
  })
}

// Handle HTML Templates
function combineHTMLWithTemplate(){
  entryFiles.forEach(dir => {
    const htmlPlugin = new HTMLWebpackPlugin({
      filename:`${dir}.html`,
      template:templatePath,
      chunks:[dir,"vendor"]
    })
    htmlPlugins.push(htmlPlugin)
  })
}

function initConfig(env){
  resolveAlias();
  resolveEntryAndOutput(env);
  combineHTMLWithTemplate();
  return{
    entry,
    output,
    alias,
    htmlPlugins
  }
}

exports.initConfig = initConfig;
exports.resolve = resolve;
