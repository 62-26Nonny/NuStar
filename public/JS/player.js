var play_icon = document.getElementById("play");
play_icon.addEventListener('click', playSong);
var song = document.getElementById('song');
var progressBar = document.getElementById('progress_bar');
var current_time = document.getElementById('current_time');
var duration_time = document.getElementById('duration_time');
var length = document.getElementById('length');
var skip_button = document.getElementById('skip');
var playback_button = document.getElementById('playback');
var mute_button = document.getElementById('mute');
var current_volume = 0;

function setVolume(){
    song.volume = 15 / 100;
}
setVolume();

function playSong(){
    song.play();
    play_icon.src = "/IMG/pause_button.png";
    play_icon.removeEventListener('click', playSong);
    play_icon.addEventListener('click', pauseSong);
}

function pauseSong(){
    song.pause();
    play_icon.src = "/IMG/play_button.png";
    play_icon.removeEventListener('click', pauseSong);
    play_icon.addEventListener('click', playSong);
}

song.addEventListener('ended', e => {
    pauseSong();
    resetValue();
});

playback_button.addEventListener('click', playbackSong);
function playbackSong(){
    song.currentTime = song.currentTime - 5;
}

skip_button.addEventListener('click', skipSong);
function skipSong(){
    song.currentTime = song.currentTime + 5;
}

mute_button.addEventListener('click', muteSong);
function muteSong(){
    current_volume = song.volume;
    song.volume = 0;
    mute_button.removeEventListener('click', muteSong);
    mute_button.addEventListener('click', unMuteSong);
    mute_button.src = "/IMG/mute_icon.png";
}
function unMuteSong(){
    song.volume = current_volume;
    mute_button.removeEventListener('click', unMuteSong);
    mute_button.addEventListener('click', muteSong);
    mute_button.src = "/IMG/volume_icon.png";
}

var volume = document.getElementById('volume_control');
volume.addEventListener('change', () => {
    song.volume = volume.value / 100;
});

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function progressValue(){
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;

    current_time.textContent = formatTime(song.currentTime);
    duration_time.textContent = formatTime(song.duration);
    length.innerHTML = "Length: " + duration_time.textContent + " mins";
}

function resetValue(){
    progressBar.value = 0;
    song.currentTime = 0;
}

setInterval(progressValue, 1000);

function changeProgressBar() {
    song.currentTime = progressBar.value;
}

progressBar.addEventListener("click", changeProgressBar);