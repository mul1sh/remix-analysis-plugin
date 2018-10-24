const express = require('express');
const router = express.Router();
const { isEmpty, isNull, isUndefined } = require('underscore');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// handle the analysis
router.post('/:analysisType', async function(req, res, next) {
	const { analysisType } = req.params;
	const { data, source } = req.body[0];
	

	if(analysisType === 'mythril') {
		const sources = source.sources;
		let fileName = source.target;
		if(objectIsValid(sources) && objectIsValid(fileName)){
			const contract = sources[fileName].content;
			fileName = fileName.split('/').pop();
			const filePath = path.join(__dirname,'..','data/'+fileName);
		
			try{
				// save contract locally
				fs.writeFileSync(filePath,contract);

				// then run the mythril analysis
				const cmd = 'myth -x ' + filePath;
				const { stdout, stderr } = await exec(cmd);

				console.log(stdout);
				console.log(stderr);

				if(stdout) {
					res.status(200).send(stdout);
				}

				if(stderr) {
					res.status(500).send(stderr);
				}
              
			}
			catch(error) {
				console.log(error);
			}
		}

	}  

	if(analysisType === 'slither') {

	}

	if(analysisType === 'manticore') {

	}
});

function objectIsValid(obj) {
	return !isEmpty(obj) && !isUndefined(obj) && !isNull(obj);
}

module.exports = router;
