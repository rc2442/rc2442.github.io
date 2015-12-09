'use strict';

document.addEventListener('DOMContentLoaded', function(){
	//Audio player stuff
	var player = new Tone.Player("./sounds/shortsample.mp3").toMaster();
	Tone.Buffer.onload = function(){
		player.loopStart = 3;	//CHANGE THIS DEPENDING ON WHEN AUDIO STARTS IN OTHER FILES
		player.loop = true;
		//player.start();
	}

	var playButton = document.getElementById("playBackground")
	playButton.addEventListener('click', playBackground);

	function playBackground(){
		if (player.state == "stopped"){
			player.start();
			playButton.textContent = "Pause Music";
		}
		else {
			player.stop();
			playButton.textContent = "Play Music";
		}
	}


	//Timer stuff
	var bellplayer = new Tone.Player("./sounds/bell.mp3").toMaster();
	var bell = document.getElementsByTagName("IMG")[0];
	var infoContainer = bell.parentElement;
	var muteMessage = document.createTextNode("Click bell to mute");

	var timeLabel = document.getElementById('TimeLabel');
	var startButton = document.getElementById('TimerStart');
	var pauseButton = document.getElementById('TimerPause');
	var inputMinutes = document.getElementById('Minutes');

	var timer = new Timer({
	  tick: 1
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

	function muteBell(){
		if (bellplayer.state == "started"){
			bellplayer.stop();
			bell.id = "";
			infoContainer.removeChild(muteMessage);
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
		bellplayer.start();
		bell.id = "swinging";
		infoContainer.appendChild(muteMessage);
		// Stop music in case it's playing
		player.stop();
		playButton.textContent = "Play Music";
		//pause at end for long last second aesthetic ALSO ADD SOUND
		setTimeout(function(){
			timeLabel.textContent = '00:00';
		}, 1000);
	});

	startButton.addEventListener('click', startTimer);
	pauseButton.addEventListener('click', pauseTimer);
	inputMinutes.addEventListener('input', updateLabel);
	bell.addEventListener('click', muteBell)
});
