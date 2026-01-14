const express = require('express');
const router = express.Router();

const { createCMSOrganizer } = require('./controller');

// Route untuk membuat organizer baru
router.post('/organizers', createCMSOrganizer);

module.exports = router;