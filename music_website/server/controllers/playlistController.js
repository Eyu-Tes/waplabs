const Playlist = require('../models/playlist');

const getPlaylist = (req, res) => {
    const playlist = Playlist.getPlaylist(req.user);
    res.send(playlist);
};

const addToPlaylist = (req, res) => {
    const { songId } = req.body;
    const updatedPlaylist = Playlist.addToPlaylist(req.user, songId);
    res.send(updatedPlaylist);
};

const removeFromPlaylist = (req, res) => {
    const { songId } = req.body;
    const updatedPlaylist = Playlist.removeFromPlaylist(req.user, songId);
    res.send(updatedPlaylist);
};

module.exports = { getPlaylist, addToPlaylist, removeFromPlaylist };
