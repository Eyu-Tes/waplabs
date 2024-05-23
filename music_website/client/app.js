document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';

    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error');
    const logoutButton = document.getElementById('logoutButton');
    const playPauseButton = document.getElementById('playPauseButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const playModeButton = document.getElementById('playModeButton');
    const songsTable = document.getElementById('songsTable');
    const playlistTable = document.getElementById('playlistTable');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const songTitleElement = document.querySelector('.song-title');
    const audioPlayer = document.getElementById('audioPlayer');
    let currentSongIndex = -1; // Updated to start with no song selected
    let isPlaying = false;
    let playMode = 'sequential';
    let playlist = [];

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_BASE_URL}/users/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful, token:', data.token);
                    sessionStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    console.log('Login failed');
                    if (errorElement) errorElement.style.display = 'block';
                }
            } catch (error) {
                console.error('Error during login request:', error);
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('Logging out');
            sessionStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }

    if (songsTable && playlistTable) {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('No token found, redirecting to login page');
            window.location.href = 'login.html';
            return;
        }

        fetch(`${API_BASE_URL}/songs`, {
            headers: { 'Authorization': token }
        }).then(response => response.json())
          .then(data => {
              console.log('Fetched songs:', data);
              data.forEach(song => {
                  const isAdded = playlist.includes(song.id);
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${song.id}</td>
                                   <td>${song.title}</td>
                                   <td>${song.releaseDate || 'N/A'}</td>
                                   <td class="actions"><button onclick="addToPlaylist(${song.id})" class="${isAdded ? 'disabled' : ''}" ${isAdded ? 'disabled' : ''} title="Add to Playlist">+</button></td>`;
                  songsTable.querySelector('tbody').appendChild(row);
              });
          });

        fetch(`${API_BASE_URL}/playlists`, {
            headers: { 'Authorization': token }
        }).then(response => response.json())
          .then(data => {
              console.log('Fetched playlist:', data);
              playlist = data;
              renderPlaylistTable(); // Render the playlist table initially
              // Re-render songs table to disable buttons for songs already in playlist
              renderSongsTable();
          });
    }

    window.addToPlaylist = async (songId) => {
        const token = sessionStorage.getItem('token');
        if (playlist.includes(songId)) {
            console.log('Song already in playlist');
            return; // Exit the function if the song is already in the playlist
        }

        try {
            const response = await fetch(`${API_BASE_URL}/playlists`, {
                method: 'POST',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId })
            });
            if (response.ok) {
                console.log('Added song to playlist:', songId);
                playlist.push(songId);
                renderSongsTable(); // Re-render songs table to disable button for added song
                renderPlaylistTable(); // Re-render playlist table to include the new song
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    window.removeFromPlaylist = async (songId) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/playlists`, {
                method: 'DELETE',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId })
            });
            if (response.ok) {
                console.log('Removed song from playlist:', songId);
                playlist = playlist.filter(id => id !== songId);
                renderSongsTable(); // Re-render songs table to enable button for removed song
                renderPlaylistTable(); // Re-render playlist table to remove the song
            }
        } catch (error) {
            console.error('Error removing song from playlist:', error);
        }
    };

    const renderSongsTable = () => {
        const token = sessionStorage.getItem('token');
        fetch(`${API_BASE_URL}/songs`, {
            headers: { 'Authorization': token }
        }).then(response => response.json())
          .then(data => {
              songsTable.querySelector('tbody').innerHTML = ''; // Clear existing rows
              data.forEach(song => {
                  const isAdded = playlist.includes(song.id);
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${song.id}</td>
                                   <td>${song.title}</td>
                                   <td>${song.releaseDate || 'N/A'}</td>
                                   <td class="actions"><button onclick="addToPlaylist(${song.id})" class="${isAdded ? 'disabled' : ''}" ${isAdded ? 'disabled' : ''} title="Add to Playlist">+</button></td>`;
                  songsTable.querySelector('tbody').appendChild(row);
              });
          });
    };

    const renderPlaylistTable = () => {
        playlistTable.querySelector('tbody').innerHTML = ''; // Clear existing rows
        playlist.forEach((songId, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td>
                             <td>Song ${songId}</td>
                             <td class="actions">
                                 <button class="play" onclick="playSong(${index})" id="playPauseBtn-${index}" title="Play">▶️</button>
                                 <button class="remove" onclick="removeFromPlaylist(${songId})" title="Remove from Playlist">🗑</button>
                             </td>`;
            playlistTable.querySelector('tbody').appendChild(row);
        });
    };

    window.playSong = (index) => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audioPlayer.play();
        isPlaying = true;
        if (playPauseButton) {
            playPauseButton.textContent = '⏸';
            playPauseButton.title = 'Pause';
        }
        updatePlayPauseButtons();
        updatePrevNextButtons();
    };

    const loadSong = (index) => {
        const playlistItem = playlist[index];
        const songId = playlistItem;
        const songTitle = `Song ${songId}`;

        fetch(`${API_BASE_URL}/songs/${songId}`, {
            headers: { 'Authorization': sessionStorage.getItem('token') }
        }).then(response => response.json())
          .then(data => {
              audioPlayer.src = data.url;
              songTitleElement.textContent = songTitle;
              if (isPlaying) {
                  audioPlayer.play(); // Automatically play the next song if it is currently playing
              }
              updatePlayPauseButtons();
              updatePrevNextButtons();
          });
    };

    const pauseSong = () => {
        audioPlayer.pause();
        isPlaying = false;
        if (playPauseButton) {
            playPauseButton.textContent = '▶️';
            playPauseButton.title = 'Play';
        }
        updatePlayPauseButtons();
        updatePrevNextButtons();
    };

    const prevSong = () => {
        if (playMode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            playSong(randomIndex);
        } else {
            if (currentSongIndex > 0) {
                currentSongIndex--;
            } else {
                currentSongIndex = playlist.length - 1;
            }
            playSong(currentSongIndex); // Start playing the previous song immediately
        }
    };

    const nextSong = () => {
        if (playMode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            playSong(randomIndex);
        } else {
            if (currentSongIndex < playlist.length - 1) {
                currentSongIndex++;
            } else {
                currentSongIndex = 0;
            }
            playSong(currentSongIndex); // Start playing the next song immediately
        }
    };

    const updatePlayPauseButtons = () => {
        document.querySelectorAll('.play').forEach((button, index) => {
            if (index === currentSongIndex && isPlaying) {
                button.textContent = '🔊';  // Use the speaker icon for the currently playing song
                button.disabled = true;
                button.title = 'Currently Playing';
            } else {
                button.textContent = '▶️';
                button.disabled = false;
                button.title = 'Play';
            }
        });
    };

    const updatePrevNextButtons = () => {
        const hasSongSelected = currentSongIndex >= 0 && currentSongIndex < playlist.length;
        if (prevButton) {
            prevButton.disabled = !hasSongSelected;
            prevButton.title = hasSongSelected ? 'Previous Song' : 'No Previous Song';
        }
        if (nextButton) {
            nextButton.disabled = !hasSongSelected;
            nextButton.title = hasSongSelected ? 'Next Song' : 'No Next Song';
        }
    };

    const updateProgressBar = () => {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        if (progressBar) progressBar.style.width = `${progressPercent}%`;
    };

    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const clickX = e.offsetX;
            const width = progressContainer.clientWidth;
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / width) * duration;
        });
    }

    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgressBar);
    }

    if (playPauseButton) {
        playPauseButton.addEventListener('click', () => {
            if (!isPlaying && audioPlayer.src === '') {
                // No song loaded, load and play the first song in the playlist
                if (playlist.length > 0) {
                    playSong(0);
                }
            } else if (isPlaying) {
                pauseSong();
            } else {
                audioPlayer.play();  // Play the audio directly when resuming
                isPlaying = true;
                updatePlayPauseButtons();
                updatePrevNextButtons();
                playPauseButton.textContent = '⏸';
                playPauseButton.title = 'Pause';
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSong);
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextSong);
    }

    if (playModeButton) {
        playModeButton.addEventListener('click', () => {
            if (playMode === 'sequential') {
                playMode = 'shuffle';
                playModeButton.textContent = '🔀';
                playModeButton.title = 'Shuffle Play';
            } else if (playMode === 'shuffle') {
                playMode = 'repeat';
                playModeButton.textContent = '🔁';
                playModeButton.title = 'Repeat Play';
            } else {
                playMode = 'sequential';
                playModeButton.textContent = '▶️';
                playModeButton.title = 'Sequential Play';
            }
        });
    }

    if (audioPlayer) {
        audioPlayer.addEventListener('ended', () => {
            if (playMode === 'repeat') {
                playSong(currentSongIndex);
            } else if (playMode === 'shuffle') {
                const randomIndex = Math.floor(Math.random() * playlist.length);
                playSong(randomIndex);
            } else {
                nextSong();
            }
        });
    }

    updatePrevNextButtons(); // Initial check to disable buttons if no song is playing
});
