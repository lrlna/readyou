const fs   = require("fs")
const miss = require("mississippi")
const path = require("path")

exports.command = 'run [--file]'

exports.describe = 'Generate a readme by providing a .json file'

exports.builder = {
  file: {
    desc: 'provide an absolute path to json file to create a readme',
    alias: 'f'
  }
}

exports.handler = function (argv) {
  // input is file
  // if there is no input, try reading from config
  var input = argv.file || path.join(process.env.HOME, '.readyou')
  // read current path, and create a file in current path
  var output = path.join(process.cwd(), 'README.md')

  var read = fs.createReadStream(input)
  read.on('error', function (err) {
    console.log([
      `Please provide a path to file, or alternatively run:`,
      `\n readyou config --path /path/to/file \n`,
      `to set up a default configuration file`
    ].join(`\n`))
    // don't continue
    process.exit()
  })

  var write = fs.createWriteStream(output)

  var readyou = miss.through(
    function (chunk, enc, callback) {
      var text = ''
      var file = JSON.parse(chunk.toString())
      Object.keys(file).forEach(function (key) {
        // keys are headings, values are filler text if there are any
        // probably should be less hacky on next iteration
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
    console.log(`Set up README file in ${process.cwd()}`)
  })
}

function getConfigFile() {
  var configFile = path.join(process.env.HOME, '.readyou')
  return fs.statSync(configFile) ? '.readyou' : null
}
