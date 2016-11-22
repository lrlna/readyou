const fs = require("fs")
const miss = require("mississippi")
const path = require("path")

exports.command = 'config [--file]'

exports.describe = 'Set up a config file for readyou to use'

exports.builder = {
  file: {
    desc: 'provide a path to the config file to be used by readyou',
    alias: 'p'
  }
}

exports.handler = function (argv) {
  var configFile = argv.file
  var rootDirectory = path.join(process.env.HOME, '.readyou')
  var read = fs.createReadStream(configFile)
  var write = fs.createWriteStream(rootDirectory)
  // stream the file to copy it to root
  // possibly add a lil loopy thingy while waiting for file to copy
  miss.pipe(read, write, function (err) {
    if (err) return console.error(`Can't setupt config file ${err}`)
    console.log(`Successfully setup config file`)
  })
}
