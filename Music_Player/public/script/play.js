let isPlaying = false;
let currentSongIndex = 0;
let songs = []; 

// Initialize the list of songs from the rendered page
window.onload = function() {
    const songElements = document.querySelectorAll('#songList .card');
    songs = Array.from(songElements).map((songElement, index) => ({
        title: songElement.querySelector('.card-title').textContent,
        artist: songElement.querySelector('.card-text').textContent,
        file_path: songElement.querySelector('button').getAttribute('onclick').match(/'([^']+)'/g)[2].replace(/'/g, ''),
        image_path: songElement.querySelector('.album-cover').src
    }));
};

// Play selected song
function playSong(title, artist, songPath, imagePath, songIndex) {
    const audioPlayer = document.getElementById('audioPlayer');
    currentSongIndex = songIndex; 

    // Set song details
    document.getElementById('songTitle').textContent = title;
    document.getElementById('songArtist').textContent = artist;
    document.getElementById('albumCover').src = imagePath;

    // Set audio source and play
    audioPlayer.src = songPath;
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseBtn();
}

// Toggle play/pause
function togglePlayPause() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseBtn();
}

// Update play/pause button
function updatePlayPauseBtn() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
}

// Update progress bar
function updateProgress() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');

    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
}

// Update song duration
function updateDuration() {
    const audioPlayer = document.getElementById('audioPlayer');
    const duration = document.getElementById('duration');
    duration.textContent = formatTime(audioPlayer.duration);
}

// Seek song
function seekSong(event) {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressContainer = event.target;
    const progressWidth = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / progressWidth) * duration;
}

// Format time in minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to play the next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0; 
    }
    const nextSong = songs[currentSongIndex];
    playSong(nextSong.title, nextSong.artist, nextSong.file_path, nextSong.image_path, currentSongIndex);
}

// Function to play the previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; 
    }
    const prevSong = songs[currentSongIndex];
    playSong(prevSong.title, prevSong.artist, prevSong.file_path, prevSong.image_path, currentSongIndex);
}

document.getElementById('audioPlayer').addEventListener('ended', nextSong);
