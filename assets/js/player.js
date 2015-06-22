// Initialize variables
var player,
    video,
    controls,
    playBtn,
    seekSlider,
    info,
    currentTime,
    durationTime,
    muteBtn,
    volumeSlider,
    fullscreenBtn;

function init(){
    // Video components
    player          = document.getElementsByClassName('player')[0],
    video           = player.querySelector('video'),
    controls        = player.querySelector('.player-controls'),
    playBtn         = controls.querySelector('.player-play-btn'),
    seekSlider      = controls.querySelector('.player-seek-slider'),
    info            = controls.querySelector('.player-info'),
    currentTime     = info.querySelector('.player-info-current-time'),
    durationTime    = info.querySelector('.player-info-duration-time'),
    muteBtn         = controls.querySelector('.player-mute-btn'),
    volumeSlider    = controls.querySelector('.player-volume-slider'),
    fullscreenBtn   = controls.querySelector('.player-fullscreen-btn');

    // Event listeners
    playBtn.addEventListener("click", _playPause, false);
    seekSlider.addEventListener("change", _seek, false);
    video.addEventListener("timeupdate", _seekTimeUpdate, false);
    muteBtn.addEventListener("click", _mute, false);
    volumeSlider.addEventListener("change", _setVolume, false);
    fullscreenBtn.addEventListener("click", _toggleFullscreen, false);

}

window.onload = init;

// Play/Pause video
function _playPause(){
    if(video.paused){
        video.play();
        playBtn.innerHTML = 'Pause';
    }else{
        video.pause();
        playBtn.innerHTML = 'Play';
    }
}

// Seek in video
function _seek(){
    var seekTo = video.duration * (seekSlider.value / 100);
    video.currentTime = seekTo;
}

// Update seek time
function _seekTimeUpdate(){
    var newTime = video.currentTime * (100 / video.duration);
    seekSlider.value = newTime;

    // Set current time and duration time
    var currentMinutes  = Math.floor(video.currentTime / 60),
        currentSeconds  = Math.floor(video.currentTime - currentMinutes * 60),
        durationMinutes  = Math.floor(video.duration / 60),
        durationSeconds  = Math.floor(video.duration - durationMinutes * 60);

    if(currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if(currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if(durationMinutes < 10) durationMinutes = "0" + durationMinutes;
    if(durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
    durationTime.innerHTML = durationMinutes + ":" + durationSeconds;
}

// Mute video
function _mute(){
    if(video.muted){
        video.muted = false;
        muteBtn.innerHTML = 'Mute';
    }else{
        video.muted = true;
        muteBtn.innerHTML = 'Unmute';
    }
}

// Set volume
function _setVolume(){
    video.volume = volumeSlider.value / 10;
}

// Toggle Fullscreen
function _toggleFullscreen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }else if(video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    }else if(video.mozRequestFullscreen){
        video.mozRequestFullscreen();
    }
}
