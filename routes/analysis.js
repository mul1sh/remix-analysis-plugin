const express = require('express');
const router = express.Router();
const { isEmpty, isNull, isUndefined } = require('underscore');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const randomstring = require("randomstring");

// handle the analysis
router.post('/:analysisType', async function(req, res, next) {
	const { analysisType } = req.params;
	const { data, source } = req.body[0];
	

	if(analysisType === 'mythril' || analysisType === 'manticore') {
		const sources = source.sources;
		let fileName = source.target;
		if(objectIsValid(sources) && objectIsValid(fileName)){
			const contract = sources[fileName].content;
			fileName = randomstring.generate() + '-' +fileName.split('/').pop();
			const filePath = path.join(__dirname,'..','data/'+fileName);
		
			try{
				// save contract locally
				fs.writeFileSync(filePath,contract);

				// then run the mythril or manticore analysis
				const cmd = analysisType === 'mythril' ? `myth -x ${filePath}`: `manticore --detect-all ${filePath}`;
				const { stdout, stderr } = await exec(cmd);
				//delete the file once we are done with it
                fs.unlinkSync(filePath);
            
				if(objectIsValid(stdout)) {
					if(typeof stdout === String){
						stdout = { output : stdout };
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
				res.status(500).send(error);
			}
		}

	}  

	if(analysisType === 'slither') {

	}

});

function objectIsValid(obj) {
	return !isEmpty(obj) && !isUndefined(obj) && !isNull(obj);
}

module.exports = router;
