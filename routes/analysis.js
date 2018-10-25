'use strict';
const express = require('express');
const router = express.Router();
const { isEmpty, isNull, isUndefined } = require('underscore');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const shell = require('shelljs');

// handle the analysis
router.post('/:analysisType', async function(req, res, next) {
	const { analysisType } = req.params;
	const { data, source } = req.body[0];
	
	let sources = source.sources;
	const  originalFileName = source.target;
	if(objectIsValid(sources) && objectIsValid(originalFileName)){

		const contract = sources[originalFileName].content;
		const fileName = originalFileName.split('/').pop();
		const fileDir = path.dirname(originalFileName);
		shell.mkdir('-p', fileDir);
		const filePath = fileDir + '/'+fileName;

		if(analysisType === 'mythril' || analysisType === 'slither') {
		
			try{
				// save contract locally
				fs.writeFileSync(filePath, contract);

				// then run the mythril or manticore analysis
				const cmd = analysisType === 'mythril' ? `myth -x ${filePath}` :  `slither ${filePath}`;;
				let { stdout, stderr } = await exec(cmd);
			
            
				if(objectIsValid(stdout)) {
					if(typeof stdout === 'string'){
						stdout = { output : stdout };
					}
				}

				if(objectIsValid(stderr)) {
					if(typeof stderr === 'string'){
						stderr = { output : stderr };
					}

					if(typeof stderr === 'object'){
						console.log(stderr.stderr)
						stderr = { output : stderr.stderr };
					}
				}

				
	
				if(stdout) {
					res.status(200).send(stdout);
				}

				if(stderr) {
					res.status(500).send(stderr);
				}
              
			}
			catch(error) {
				console.log(error);
				if(typeof error === 'object' && objectIsValid(error.stderr)){
						console.log(error.stderr)

						error = JSON.parse(JSON.stringify({ "output" : error.stderr }));
				}
				else{
					error = { output : JSON.stringify(error) };
				}
				
				res.status(500).send(error);
			}
			finally {
					//delete the file once we are done with it
                fs.unlinkSync(filePath);
			}
		}


		


	}  

	
});

function objectIsValid(obj) {
	return !isEmpty(obj) && !isUndefined(obj) && !isNull(obj);
}

module.exports = router;
