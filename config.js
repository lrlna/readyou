const fs = require("fs")
const miss = require("mississippi")
const path = require("path")

exports.command = 'config [--path]'

exports.describe = 'Set up a config file for readyou to use'

exports.builder = {
  path: {
    desc: 'provide a path to the config file to be used by readyou',
    alias: 'p'
  }
}

exports.handler = function (argv) {
  var configFile = argv.path
  var rootDirectory = path.join(process.env.HOME, '.readyou-config.json')
  var read = fs.createReadStream(configFile)
  var write = fs.createWriteStream(rootDirectory)
  // stream the file to copy it to root
  miss.pipe(read, write, function (err) {
    if (err) return console.error(`Can't setupt config file ${err}`)
    console.log(`Successfully setup config file`)
  })
}

function copyFileToRoot () {
  // copy files from the path provided into root directory
  // little loopy thingy while waiting for file to copy
}
