let audioCont = document.getElementsByClassName('audio-hud');
let audioPlayer = document.getElementById('audio-player');
let progressBar = document.getElementById('audio-hud__progress-bar');
let currTime = document.getElementById('audio-hud__curr-time');
let timeRemain = document.getElementById('audio-hud__time-remain');
let actionButton = document.getElementById('audio-hud__action');
let muteButton = document.getElementById('audio-hud__mute');
let volumeChange = document.getElementById('audio-hud__speaker');
let volumeScale = document.getElementById('audio-hud__volume');
let currSpeed = document.getElementById('audio-hud__curr-speed');
let speedDown = document.getElementById('audio-hud__speed-down');
let speedUp = document.getElementById('audio-hud__speed-up');
let download = document.getElementById('player__download');

function audioAct() {
	actionButton.style.cssText = 'background-image: none';
	audioPlayer.paused ? (
		audioPlayer.play(),
		actionButton.setAttribute('class','audio-hud__element audio-hud__action audio-hud__action_play')
	) : (
		audioPlayer.pause(),
		actionButton.setAttribute('class','audio-hud__element audio-hud__action audio-hud__action_pause')
	);
	if(timeRemain.innerHTML == '00:00') {
		timeRemain.innerHTML = audioTime(Math.floor(audioPlayer.duration) - Math.floor(audioPlayer.currentTime));
	}
}

actionButton.addEventListener('click',audioAct);

function audioTime(time) {
	time = Math.floor(time);
	let minutes = Math.floor(time / 60);
	let seconds = Math.floor(time - minutes * 60);
	let minutesVal = minutes;
	let secondsVal = seconds;
	if(minutes < 10) {
		minutesVal = '0' + minutes;
	}
	if(seconds < 10) {
		secondsVal = '0' + seconds;
	}
	return minutesVal + ':' + secondsVal;
}

function audioProgress() {
	progress = (Math.floor(audioPlayer.currentTime) / (Math.floor(audioPlayer.duration) / 100));
	progressBar.value = progress;
	currTime.innerHTML = audioTime(audioPlayer.currentTime);
}

function audioRemain() {
	timeRemain.innerHTML = audioTime((Math.floor(audioPlayer.duration)) - (Math.floor(audioPlayer.currentTime)));
}

function audioChangeTime(e) {
	let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
	let progress = mouseX / (progressBar.offsetWidth / 100);
	audioPlayer.currentTime = audioPlayer.duration * (progress / 100);
}

audioPlayer.addEventListener('timeupdate',audioProgress);
audioPlayer.addEventListener('timeupdate',audioRemain);
progressBar.addEventListener('click',audioChangeTime);

function speedActDown() {
	switch (audioPlayer.playbackRate) {
  case 2.5:
		audioPlayer.playbackRate = 2;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
  case 2:
		audioPlayer.playbackRate = 1.75;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
	case 1.75:
		audioPlayer.playbackRate = 1.5;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
	case 1.5:
		audioPlayer.playbackRate = 1.25;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
	case 1.25:
		audioPlayer.playbackRate = 1;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
  case 1:
	  audioPlayer.playbackRate = 0.5;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
	  break;
  case 0.5:
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
  }
}

function speedActUp() {
	switch (audioPlayer.playbackRate) {
  case 2.5:
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
  case 2:
		audioPlayer.playbackRate = 2.5;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
	case 1.75:
		audioPlayer.playbackRate = 2;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
	case 1.5:
		audioPlayer.playbackRate = 1.75;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
	case 1.25:
		audioPlayer.playbackRate = 1.5;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
  case 1:
	  audioPlayer.playbackRate = 1.25;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
	  break;
  case 0.5:
	  audioPlayer.playbackRate = 1;
		currSpeed.innerHTML = audioPlayer.playbackRate + 'x';
    break;
  }
}

speedDown.addEventListener('click',speedActDown);
speedUp.addEventListener('click',speedActUp);
currSpeed.innerHTML = audioPlayer.playbackRate + 'x';

function audioChangeVolume() {
	var volume = volumeScale.value / 100;
	audioPlayer.volume = volume;
}

function getVolumeSpin() {
	volumeScale.classList.contains('visually-hidden') ? (
		volumeScale.classList.remove('visually-hidden'),
		download.classList.remove('visually-hidden')
	) : (
		volumeScale.classList.add('visually-hidden'),
		download.classList.add('visually-hidden')
	);
}

volumeChange.addEventListener('click',getVolumeSpin);
volumeScale.addEventListener('change',audioChangeVolume);
