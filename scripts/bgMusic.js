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
});