#! /usr/bin/env node

const yargs = require("yargs")
  .command(require('run'))
  .demand(1)
  .help()
  .argv

// if path is provided instead, create the file in that path

// if readme exists ask for another name to name this file
