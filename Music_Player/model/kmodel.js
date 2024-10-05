const db = require('../config/database');

const getAllSongs = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, title, artist, file_path, image_path FROM songs', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const addSong = (title, artist, file_path, image_path) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO songs (title, artist, file_path, image_path) VALUES (?, ?, ?, ?)';
        db.query(query, [title, artist, file_path, image_path], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { getAllSongs, addSong };
