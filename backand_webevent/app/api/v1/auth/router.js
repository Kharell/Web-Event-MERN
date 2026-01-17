const express = require('express');
const router = express();
const { signinCms } = require('../auth/controller');

router.post('/aut/signin', signinCms);

module.exports = router;