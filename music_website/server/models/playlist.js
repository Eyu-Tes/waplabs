class Playlist {
    static playlists = {
        user1: [1, 2, 4, 6, 7],
        user2: [2, 3, 1]
    };

    static getPlaylist(username) {
        return this.playlists[username] || [];
    }

    static addToPlaylist(username, songId) {
        if (!this.playlists[username]) {
            this.playlists[username] = [];
        }
        this.playlists[username].push(songId);
        return this.playlists[username];
    }

    static removeFromPlaylist(username, songId) {
        if (!this.playlists[username]) {
            return [];
        }
        this.playlists[username] = this.playlists[username].filter(id => id !== songId);
        return this.playlists[username];
    }
}

module.exports = Playlist;
