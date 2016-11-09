#! /usr/bin/env node

const miss = require("mississippi")
const path = require("path")
const fs = require("fs")
const yargs = require("yargs")
  .command({
    command: 'run',
    desc: 'Generate a readme by providing a .json file',
    builder: {
      file: {
        desc: 'provide a json file',
      }
    },
    handler: (argv) => {
      var output = path.join(process.cwd(), 'README.md')
      var read = fs.createReadStream(argv.file)
      var write = fs.createWriteStream(output)

      // create a read stream to read pckg.json
      miss.pipe(read, readyou, write, function (err) {
        if (err) return console.error(`Can't process json`)
        console.log(`file written successfully`)
      })
    }
  })
  .demand(1)
  .help()
  .argv

var readyou = function() {
  
}

// keys are headings, values are filler text if there are any

// read current path, and create a file in current path

// if path is provided instead, create the file in that path

// if readme exists ask for another name to name this file
