class Song {
    static songs = [
        { id: 1, title: 'Song 1', releaseDate: '2020-01-01', url: 'song1.mp3' },
        { id: 2, title: 'Song 2', releaseDate: '2019-01-01', url: 'song2.mp3' },
        { id: 3, title: 'Song 3', releaseDate: '2015-01-01', url: 'song3.mp3' },
        { id: 4, title: 'Song 4', releaseDate: '2014-01-01', url: 'song4.mp3' },
        { id: 5, title: 'Song 5', releaseDate: '2021-01-01', url: 'song5.mp3' },
        { id: 6, title: 'Song 6', releaseDate: '2022-01-01', url: 'song6.mp3' },
        { id: 7, title: 'Song 7', releaseDate: '2023-01-01', url: 'song7.mp3' }
    ];

    static getAllSongs() {
        return this.songs;
    }

    static getSongById(id) {
        return this.songs.find(song => song.id == id);
    }
}

module.exports = Song;
