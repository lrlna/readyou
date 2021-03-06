#! /usr/bin/env node

// initial yargs argv object with run command
const yargs = require("yargs")
  .command(require('./run'))
  .command(require('./config'))
  // need at least one command to run the application
  .demand(1)
  .help()
  .argv
