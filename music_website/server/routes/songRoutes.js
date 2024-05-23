const express = require('express');
const { getSongs, getSongById } = require('../controllers/songController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, getSongs);
router.get('/:id', authenticate, getSongById);

module.exports = router;
