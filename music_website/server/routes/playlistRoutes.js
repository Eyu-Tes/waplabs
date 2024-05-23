const express = require('express');
const { getPlaylist, addToPlaylist, removeFromPlaylist } = require('../controllers/playlistController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, getPlaylist);
router.post('/', authenticate, addToPlaylist);
router.delete('/', authenticate, removeFromPlaylist);

module.exports = router;
