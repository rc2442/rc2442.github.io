'use strict';
//Audio player stuff
// var player = new Tone.Player("./sounds/shortsample.mp3").toMaster();
// Tone.Buffer.onload = function(){
// 	player.loopStart = 3;	//CHANGE THIS DEPENDING ON WHEN AUDIO STARTS IN OTHER FILES
// 	player.loop = true;
// 	//player.start();
// }

// document.getElementById("playBackground").addEventListener('click', playBackground);
// document.getElementById("pauseBackground").addEventListener('click', pauseBackground);

// function playBackground(){
// 	if (player.state == "stopped")
// 		player.start();
// }
// function pauseBackground(){
// 	if (player.state == "started")
// 		player.stop();
// }


//Timer stuff
var timeLabel = document.getElementById('TimeLabel');
var startButton = document.getElementById('TimerStart');
var pauseButton = document.getElementById('TimerPause');
var inputMinutes = document.getElementById('Minutes');

var timer = new Timer({
  tick: 1,
  onstart: function() { console.log('timer started'); },
  onstop: function() { console.log('timer stop'); },
  onpause: function() { console.log('timer set on pause'); },
  onend: function() { console.log('timer ended normally'); }
});

function updateLabel(){
	if (timer.getStatus() !== 'started' && timer.getStatus() !== 'paused'){
		timeLabel.textContent = inputMinutes.value + ':00';
	}
}

function startTimer(){
	if (timer.getStatus() === 'initialized'){
		timer.start(60 * (inputMinutes.value));
	}
	else {
		timer.stop();
		updateLabel();
		timer.start(60 * (inputMinutes.value));
		pauseButton.textContent = 'Pause Timer';
	}
}

function pauseTimer(){
	if (timer.getStatus() === 'paused'){
		timer.start();
		pauseButton.textContent = 'Pause Timer';
	}
	else if (timer.getStatus() !== 'initialized'){
		timer.pause();
		pauseButton.textContent = 'Play Timer';
	}
}

timer.on('ontick', function(sec){
	var minutes = Math.ceil(sec / 1000 / 60) - 1;
	if (minutes > 9) {
		minutes += '';
	} else {
		minutes = '0' + minutes;
	}
	var seconds = Math.ceil(sec / 1000) % 60;
	if (seconds > 9) {
		seconds += '';
	} else {
		seconds = '0' + seconds;
	}
	timeLabel.textContent = minutes + ':' + seconds;
});

timer.on('end', function(){
	//pause at end for long last second aesthetic ALSO ADD SOUND
	setTimeout(function(){
		timeLabel.textContent = '00:00';
	}, 1000);
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
inputMinutes.addEventListener('input', updateLabel);






