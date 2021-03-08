const express = require('express');
const router = express.Router();

const { main } = require('../controllers/test');
const { convertNaver, convertYoutube, scrap } = require('../controllers/converter');

// main
router.get('/main', main);
// converter
router.post('/convert/naver', convertNaver);
router.post('/convert/youtube', convertYoutube);
router.post('/convert/scrap', scrap);

module.exports = router;