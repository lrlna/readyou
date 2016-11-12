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
  console.log(argv)
}

