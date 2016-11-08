#! /usr/bin/env node

const pull = require("pull-stream")
const argv = require("yargs")
  .command({
    command: 'run',
    desc: 'Run readyou',
    handler: readyou()
  })
  .demand(1)
  .help()
  .argv

function readyou(argv) {
  var from = argv.from
  // stream data from .json file to a .md file
  pull(getData(), transformData(), writeData())
}

// create a read stream to read pckg.json
function getData(file) {
  return function(read) {
    return function (err, callback) {
      if (!file--) return read(true, callback)
      read(null, callback)
    }
  }
}

// keys are headings, values are filler text if there are any
function transformData() {
}

function writeData() {
}

// read current path, and create a file in current path

// if path is provided instead, create the file in that path

// if readme exists ask for another name to name this file
