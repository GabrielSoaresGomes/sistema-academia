const express = require('express');
const router = express.Router();

const ResultValidation = require('./result-validation');
const responseStatusCode = require('./response-status-code');
const applyResult = require('./apply-result');

router.get('/activity', async (req, res) => {
    const result = new ResultValidation();
    result.setResult('OK');
    applyResult(result, res, responseStatusCode.OK);
});

module.exports = router;