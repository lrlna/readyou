#! /usr/bin/env node

const yargs = require("yargs")
  .command(require('./run'))
  .demand(1)
  .help()
  .argv
