const fs = require("fs")
const miss = require("mississippi")
const path = require("path")
const prompt = require("prompt")

exports.command = 'config [--path]'

exports.describe = 'Set up a config file for readyou to use'

exports.builder = {
  path: {
    desc: 'provide a path to the config file to be used by readyou',
    alias: 'p'
  }
}

exports.handler = function (argv) {
  var path = argv.path
  // stream the file to copy it to root
  var read = fs.createReadStream(path)
  var write = fs.createWriteStream('~/readyou-config.json')
  miss.pipe(read, write, function (err) {
    if (err) return console.error(`Can't setupt config file ${err}`)
    console.log(`Successfully setup config file`)
  })
}

function copyFileToRoot () {
  // copy files from the path provided into root directory
  // little loopy thingy while waiting for file to copy
}
