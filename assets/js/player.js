// Initialize variables
var player,
    video,
    controls,
    playBtn,
    playBtnIcon,
    seekSlider,
    progressBar,
    bufferBar,
    info,
    currentTime,
    durationTime,
    muteBtn,
    muteBtnIcon,
    volumeSlider,
    fullscreenBtn;

function init(){
    // Video components
    player          = document.getElementsByClassName('player')[0],
    video           = player.querySelector('video'),
    controls        = player.querySelector('.player-controls'),
    playBtn         = controls.querySelector('.player-play-btn'),
    playBtnIcon     = playBtn.querySelector('svg').querySelector('use'),
    seekSlider      = controls.querySelector('.player-seek-slider'),
    progressBar     = controls.querySelector('.player-progress-bar'),
    bufferBar       = controls.querySelector('.player-buffer-bar'),
    info            = controls.querySelector('.player-info'),
    currentTime     = info.querySelector('.player-info-current-time'),
    durationTime    = info.querySelector('.player-info-duration-time'),
    muteBtn         = controls.querySelector('.player-mute-btn'),
    muteBtnIcon     = muteBtn.querySelector('svg').querySelector('use'),
    volumeSlider    = controls.querySelector('.player-volume-slider'),
    fullscreenBtn   = controls.querySelector('.player-fullscreen-btn');

    // Event listeners
    playBtn.addEventListener("click", _playPause, false);
    seekSlider.addEventListener("change", _seek, false);
    video.addEventListener("timeupdate", _seekTimeUpdate, false);
    video.addEventListener("click", _playPause, false);
    player.addEventListener("mouseover", _showControls, false);
    player.addEventListener("mouseout", _hideControls, false);
    muteBtn.addEventListener("click", _mute, false);
    volumeSlider.addEventListener("change", _setVolume, false);
    fullscreenBtn.addEventListener("click", _toggleFullscreen, false);

}

window.onload = init;

// Play/Pause video
function _playPause(){
    if(video.paused){
        video.play();
        playBtnIcon.setAttribute("xlink:href", "#icon-pause");
    }else{
        video.pause();
        playBtnIcon.setAttribute("xlink:href", "#icon-play");
    }
}

// Seek in video
function _seek(){
    var seekTo = video.duration * (seekSlider.value / 100);
    video.currentTime = seekTo;
    progressBar.value = seekSlider.value;
}

// Update seek time
function _seekTimeUpdate(){
    var newTime             = video.currentTime * (100 / video.duration);
        seekSlider.value    = newTime;
        progressBar.value   = newTime,
        buffered            = video.buffered.end(0)  * (100 / video.duration),
        bufferBar.value     = buffered;

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
        muteBtnIcon.setAttribute("xlink:href", "#icon-volume-up");
    }else{
        video.muted = true;
        muteBtnIcon.setAttribute("xlink:href", "#icon-volume-mute");
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

// Show controls
function _showControls(){
    if(_hasClass(controls, 'invisible')){
        _removeClass(controls, 'invisible');
        _addClass(controls, 'visible');
    }
}

function _hideControls(){
    if(_hasClass(controls, 'visible')){
        _removeClass(controls, 'visible');
        _addClass(controls, 'invisible');
    }
}

// Classes functions
function _hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function _addClass(ele,cls) {
    if (!this._hasClass(ele,cls)) ele.className += " "+cls;
}
function _removeClass(ele,cls) {
    if (_hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}
