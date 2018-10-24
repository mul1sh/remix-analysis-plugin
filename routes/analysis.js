const express = require('express');
const router = express.Router();
const { runCmd,} = require('../helpers/analysis');

// handle the analysis
router.post('/:analysisType', function(req, res, next) {

	console.log(req.body);
	console.log(req.params);
	
  
});

module.exports = router;
