const express = require('express');
const multer = require('multer');
const { audioToText } = require('../controllers/audioController');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/convert', upload.single('audio'), audioToText);

module.exports = router;
