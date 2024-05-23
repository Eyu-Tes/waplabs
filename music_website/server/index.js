// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(cors())
// app.use(bodyParser.json());
// app.use('/songs', express.static(path.join(__dirname, 'songs')));


// const users = [
//     { username: 'user1', password: 'password1' },
//     { username: 'user2', password: 'password2' }
//   ];
  
//   const songs = [
//     { id: 1, title: 'Song 1', releaseDate: '2020-01-01', url: 'song1.mp3' },
//     { id: 2, title: 'Song 2', releaseDate: '2019-01-01', url: 'song2.mp3' },
//     { id: 3, title: 'Song 3', releaseDate: '2015-01-01', url: 'song3.mp3' },
//     { id: 4, title: 'Song 4', releaseDate: '2014-01-01', url: 'song4.mp3' },
//     { id: 5, title: 'Song 5', releaseDate: '2021-01-01', url: 'song5.mp3' },
//     { id: 6, title: 'Song 6', releaseDate: '2022-01-01', url: 'song6.mp3' },
//     { id: 7, title: 'Song 7', releaseDate: '2023-01-01', url: 'song7.mp3' },
//   ];
  
//   const playlists = {
//     user1: [1, 2, 4, 6, 7],
//     user2: [2, 3, 1]
//   };
  
//   const authenticate = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//       return res.status(401).send('Unauthorized');
//     }
//     const [username, expirationDate] = token.split('_');
//     if (new Date(expirationDate) > new Date()) {
//       req.user = username;
//       next();
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   };
  
//   app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//       const token = `${username}_${new Date(new Date().getTime() + 3600000).toISOString()}`; // Token valid for 1 hour
//       res.send({ token });
//     } else {
//       res.status(401).send('Error');
//     }
//   });
  
//   app.get('/songs', authenticate, (req, res) => {
//     res.send(songs);
//   });
  
//   app.get('/songs/:id', authenticate, (req, res) => {
//     const song = songs.find(s => s.id == req.params.id);
//     if (song) {
//       res.send({ ...song, url: `http://localhost:${port}/songs/${song.url}` }); // Ensure the full URL is provided
//     } else {
//       res.status(404).send('Song not found');
//     }
//   });
  
//   app.get('/playlist', authenticate, (req, res) => {
//     const playlist = playlists[req.user] || [];
//     res.send(playlist);
//   });
  
//   app.post('/playlist', authenticate, (req, res) => {
//     const { songId } = req.body;
//     if (!playlists[req.user]) {
//       playlists[req.user] = [];
//     }
//     playlists[req.user].push(songId);
//     res.send(playlists[req.user]);
//   });
  
//   app.delete('/playlist', authenticate, (req, res) => {
//     const { songId } = req.body;
//     if (!playlists[req.user]) {
//       return res.status(404).send('Playlist not found');
//     }
//     playlists[req.user] = playlists[req.user].filter(id => id !== songId);
//     res.send(playlists[req.user]);
//   });
  
//   app.post('/logout', authenticate, (req, res) => {
//     delete playlists[req.user];
//     res.send('Logged out');
//   });
  
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
//   });
  
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/songs', express.static(path.join(__dirname, 'songs')));

app.use('/api/users', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
