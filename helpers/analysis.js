'use strict';
// file that does the actual analysis
const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function runCmd(cmd) {
  const { stdout, stderr } = await exec(cmd);
  
  return { stdout, stderr };
}

module.exports = { runCmd }
