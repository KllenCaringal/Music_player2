const model = require('../model/kmodel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'song_file') {
            cb(null, 'public/uploads/songs/');
        } else if (file.fieldname === 'image_file') {
            cb(null, 'public/uploads/images/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const print = {
    music: async (req, res) => {
        try {
            const songs = await model.getAllSongs();
            res.render('play', { songs }); // Pass the songs to the view
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    },
    artist: (req, res) => {
        res.render('create');
    },
    uploadSong: [
        upload.fields([
            { name: 'song_file', maxCount: 1 },
            { name: 'image_file', maxCount: 1 }
        ]), 
        async (req, res) => {
            try {
                const { title, artist } = req.body;
                const songPath = `/uploads/songs/${req.files['song_file'][0].filename}`;
                const imagePath = `/uploads/images/${req.files['image_file'][0].filename}`;
                
                await model.addSong(title, artist, songPath, imagePath);
                
                res.redirect('/');
            } catch (error) {
                console.error(error);
                res.status(500).send("Error uploading the song.");
            }
        }
    ]
};

module.exports = print;
