const Song = require('../models/song');

const port = 3000;

const getSongs = (req, res) => {
    res.send(Song.getAllSongs());
};

const getSongById = (req, res) => {
    const song = Song.getSongById(req.params.id);
    if (song) {
        res.send({ ...song, url: `http://localhost:${port}/songs/${song.url}` }); // Ensure the full URL is provided
    } else {
        res.status(404).send('Song not found');
    }
};

module.exports = { getSongs, getSongById };
