const express = require('express');
const router = express.Router();
const con = require('../controller/ConTroller');

router.get('/', con.music);
router.get('/a', con.artist);
router.post('/create', con.uploadSong);

module.exports = router;
