const miss = require("mississippi")
const path = require("path")
const fs = require("fs")

exports.command = 'run [file]'

exports.describe = 'Generate a readme by providing a .json file'

exports.builder = {
  file: {
    desc: 'provide a json file to create a readme',
    alias: 'f'
  }
}

exports.handler = function (argv) {
  var input = path.join(process.cwd(), argv.file)
  // read current path, and create a file in current path
  var output = path.join(process.cwd(), 'README.md')
  var read = fs.createReadStream(input)
  var write = fs.createWriteStream(output)

  var readyou = miss.through(
    function (chunk, enc, callback) {
      var text = ''
      var file = JSON.parse(chunk.toString())
      Object.keys(file).forEach(function (key) {
        // keys are headings, values are filler text if there are any
        text = text.concat(`# ${key} \n ${file[key]} \n`)
      })
      callback(null, text)
    },
    // last run
    function (callback) {
      callback(null, 'last run')
    }
  )

  // create a read stream to read pckg.json
  miss.pipe(read, readyou, write, function (err) {
    if (err) return console.error(`Can't process json ${err}`)
    console.log(`file written successfully`)
  })
}
