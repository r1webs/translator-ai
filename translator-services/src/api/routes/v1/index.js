const express = require('express');
const translatorRoutes = require('./translator.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/main', translatorRoutes);

module.exports = router;
