var play_icon = document.getElementById("play");
play_icon.addEventListener('click', playSong);
var song = document.querySelectorAll('#song');
var progressBar = document.getElementById('progress_bar');
var current_time = document.getElementById('current_time');
var duration_time = document.getElementById('duration_time');
var length = document.getElementById('length');
var skip_button = document.getElementById('skip');
var playback_button = document.getElementById('playback');
var mute_button = document.getElementById('mute');
var loop_button = document.getElementById('loop');
var shuffle_button = document.getElementById('shuffle');
var playing = document.querySelectorAll('.playing_icon_container');
var playing_icon = Array.from(playing);
var song_name = document.querySelectorAll('.song_name');
var current_volume = 0;
var selectedIndex = 0;
var isLoop = false;
var isShuffle = false;

function setVolume(){
    song.forEach(song => {
        song.volume = 15 / 100;
    })
}
setVolume();

function playSong(){
    song[selectedIndex].play();
    playing_icon[selectedIndex].firstElementChild.src = "/IMG/playing_icon.png";
    song_name[selectedIndex].classList.add("selected");
    play_icon.src = "/IMG/pause_button.png";
    play_icon.removeEventListener('click', playSong);
    play_icon.addEventListener('click', pauseSong);
}

function pauseSong(){
    song[selectedIndex].pause();
    playing_icon[selectedIndex].firstElementChild.src = "/IMG/play_icon.png";
    play_icon.src = "/IMG/play_button.png";
    play_icon.removeEventListener('click', pauseSong);
    play_icon.addEventListener('click', playSong);
}

song.forEach(audio => {
    audio.addEventListener('ended', e => {
        song[selectedIndex].pause();
        playing_icon[selectedIndex].firstElementChild.src = "/IMG/play_icon.png";
        song_name[selectedIndex].classList.remove("selected");
        resetValue();
        if((isShuffle && selectedIndex != song.length - 1) || (isShuffle && isLoop)){
            shuffleIndex();
        } else {
            selectedIndex = selectedIndex + 1;
            if(selectedIndex == song.length){
                selectedIndex = song.length - 1;
            }
        }
        if(selectedIndex < song.length - 1){
            playSong();
        } else if(selectedIndex == song.length - 1 && !isLoop){
            playing_icon[selectedIndex].removeEventListener('click', pauseSelected);
            playing_icon[selectedIndex].addEventListener('click', playSelected);
            pauseSong();
            selectedIndex = 0;
        } else if (selectedIndex == song.length - 1 && isLoop){
            playing_icon[selectedIndex].removeEventListener('click', pauseSelected);
            playing_icon[selectedIndex].addEventListener('click', playSelected);
            selectedIndex = 0;
            playSong();
        }
    });
})

playing_icon.forEach(icon => {
    icon.addEventListener('click', playSelected);
});
function playSelected(){
    pauseSong();
    resetValue();
    song_name[selectedIndex].classList.remove("selected");
    playing_icon[selectedIndex].removeEventListener('click', pauseSelected);
    playing_icon[selectedIndex].addEventListener('click', playSelected);
    selectedIndex = playing_icon.indexOf(this);
    playSong();
    playing_icon[selectedIndex].removeEventListener('click', playSelected);
    this.addEventListener('click', pauseSelected);
}
function pauseSelected(){
    pauseSong();
    this.removeEventListener('click', pauseSelected);
    this.addEventListener('click', playSelected);
}

playback_button.addEventListener('click', playbackSong);
function playbackSong(){
    song[selectedIndex].pause();
    playing_icon[selectedIndex].firstElementChild.src = "/IMG/play_icon.png";
    song_name[selectedIndex].classList.remove("selected");
    resetValue();
    if(isShuffle){
        shuffleIndex();
    } else {
        selectedIndex = selectedIndex - 1;
        if(selectedIndex < 0){
            selectedIndex = 0;
        }
    }
    playSong();
}

skip_button.addEventListener('click', skipSong);
function skipSong(){
    song[selectedIndex].pause();
    playing_icon[selectedIndex].firstElementChild.src = "/IMG/play_icon.png";
    song_name[selectedIndex].classList.remove("selected");
    resetValue();
    if(isShuffle){
        shuffleIndex();
    } else {
        selectedIndex = selectedIndex + 1;
        if(selectedIndex == song.length){
            selectedIndex = song.length - 1;
        }
    }
    
    playSong();
}

mute_button.addEventListener('click', muteSong);
function muteSong(){
    current_volume = song[selectedIndex].volume;
    song[selectedIndex].volume = 0;
    mute_button.removeEventListener('click', muteSong);
    mute_button.addEventListener('click', unMuteSong);
    mute_button.src = "/IMG/mute_icon.png";
}

function unMuteSong(){
    song[selectedIndex].volume = current_volume;
    mute_button.removeEventListener('click', unMuteSong);
    mute_button.addEventListener('click', muteSong);
    mute_button.src = "/IMG/volume_icon.png";
}

var volume = document.getElementById('volume_control');
volume.addEventListener('change', () => {
    song[selectedIndex].volume = volume.value / 100;
});

loop_button.addEventListener('click', loopOn);
function loopOn(){
    loop_button.style.opacity = 1;
    isLoop = true;
    loop_button.removeEventListener('click', loopOn);
    loop_button.addEventListener('click', loopOff);
}

function loopOff(){
    loop_button.style.opacity = 0.7;
    isLoop = false;
    loop_button.removeEventListener('click', loopOff);
    loop_button.addEventListener('click', loopOn);
}

shuffle_button.addEventListener('click', shuffleOn);
function shuffleOn(){
    shuffle_button.style.opacity = 1;
    isShuffle = true;
    shuffle_button.removeEventListener('click', shuffleOn);
    shuffle_button.addEventListener('click', shuffleOff);
}

function shuffleOff(){
    shuffle_button.style.opacity = 0.7;
    isShuffle = false;
    shuffle_button.removeEventListener('click', shuffleOff);
    shuffle_button.addEventListener('click', shuffleOn);
}

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function progressValue(){
    progressBar.max = song[selectedIndex].duration;
    progressBar.value = song[selectedIndex].currentTime;

    current_time.textContent = formatTime(song[selectedIndex].currentTime);
    duration_time.textContent = formatTime(song[selectedIndex].duration);
}

function resetValue(){
    progressBar.value = 0;
    song[selectedIndex].currentTime = 0;
}

function shuffleIndex(){
    var oldIndex = selectedIndex;
    selectedIndex = Math.floor(Math.random() * song.length);
    if(selectedIndex == oldIndex){
        shuffleIndex();
    }
}

setInterval(progressValue, 1000);

function changeProgressBar() {
    song[selectedIndex].currentTime = progressBar.value;
}

progressBar.addEventListener("click", changeProgressBar);