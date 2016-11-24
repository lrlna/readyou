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

exports.handler = (argv) => {
  // input is file
  // if there is no input, try reading from config
  var input = argv.file || path.join(process.env.HOME, '.readyou')
  // read current path, and create a file in current path
  var output = path.join(process.cwd(), 'test.md')

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
      var readme = text.concat.apply('', [].concat.apply([], flattenReadme(file)))
      callback(null, readme)
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

// probably should be less hacky on next iteration cause this is painful af
var flattenReadme = (file, heading, isNestedKey) => {
  // assign a heading depth to the current state
  if (!heading) heading = '#'

  return Object.keys(file).map(function (key, index) {
    if (typeof file[key] != 'object') {
      // ok, if this is the first prop, then we assume it's a previous
      // level of a heading, so just use the value assigned below
      return !!isNestedKey && index === 0 ?
        file[key] :
        `${heading} ${key} \n ${file[key]} \n`
    } else {
      var headingObj = {}
      // we need to keep the heading hierarchy,
      // so let's assign a direct string to headingObj[key]
      headingObj[key] = `${heading} ${key} \n`
      heading += '#'
      var newObj = Object.assign(headingObj, file[key])
      // last value is to track whether we're in recurse
      return flattenReadme(newObj, heading, true)
    }
  })
}
