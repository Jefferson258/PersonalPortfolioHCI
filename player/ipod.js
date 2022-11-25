// Create your global variables below:
var tracklist = ["Let's Go Up", "Shield", "Not Alone", "Concrete Evidence", "Freedom", "Brave", "A Root out of Dry Ground", "Lawgiver", "Disciples", "A Tender Plant"];
var volLevels = [];
const DEFAULT_COLOR = 'rgb(95, 147, 154)'

//Retrieve element nodes from DOM
var switchBtn = document.getElementById('switch-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var volumeUpBtn = document.getElementById('volume-up');
var volumeDownBtn = document.getElementById('volume-down');
var playerBar = document.getElementById("song-duration-bar");

const style = document.createElement('style');

style.textContent = `
  .volumeFill {
    background-color: salmon;
  }`;

  document.head.appendChild(style);

function init() {
	// Your code goes here

	var volLevel = 'vl';

	for(var i=0; i<=5; i++){
		volLevel = 'vl';
		volLevel = volLevel + i;
		volLevels.push(document.getElementById(volLevel))
	}

	let id0 = volLevels[0].id;
	let id1 = volLevels[1].id;
	let id2 = volLevels[2].id;

	const newStyle0 = document.createElement('style');
	const newStyle1 = document.createElement('style');
	const newStyle2 = document.createElement('style');

	newStyle0.textContent = '#' + id0 + '{ background-color: rgb(95, 147, 154); }';
	volLevels[0].appendChild(newStyle0);
	newStyle1.textContent = '#' + id1 + '{ background-color: rgb(95, 147, 154); }';
	volLevels[1].appendChild(newStyle1);
	newStyle2.textContent = '#' + id2 + '{ background-color: rgb(95, 147, 154); }';
	volLevels[2].appendChild(newStyle2);
};

function volUp() {
	for(var i=0; i<=5; i++){
		if(!(volLevels[i].hasChildNodes())) {
			volLevels[i].innerHTML = "<style>#vl" + i + "{background-color: rgb(95, 147, 154); }</style>";
			return;
		}
	}
}

function volDown() {
	for(var i=5; i>=0; i--){
		if(volLevels[i].hasChildNodes()) {
			volLevels[i].innerHTML = "";
			return;
		}
	}
}

setInterval(addToPlayer, 1000);

function addToPlayer() {
  if(switchBtn.innerHTML == `<i class="material-icons">pause</i>`){
	// playerBar = document.getElementById("song-duration-bar");
	if(playerBar.value == playerBar.max) {
		nextSong();
		playerBar.value = 0;
	}
	else {
		playerBar.value = parseInt(playerBar.value) + 1
	}
  }
  changeTimer();
}


function switchPlay() {
	if(switchBtn.innerHTML == `<i class="material-icons">play_arrow</i>`) {
		switchBtn.innerHTML = `<i class="material-icons">pause</i>`;
	}
	else if(switchBtn.innerHTML == `<i class="material-icons">pause</i>`) {
		switchBtn.innerHTML = `<i class="material-icons">play_arrow</i>`;
	}
}

function nextSong() {
	// playerBarValue = document.getElementById("song-duration-bar").value;
	playerBar.value = 0;
	currentTime = document.getElementById("current-time");
	currentTime.innerHTML = secondsToMs(playerBarValue);
	currentTrack = document.getElementById('song-title').innerHTML;
	numberTracks = tracklist.length;
	for(var i=0; i < numberTracks; i++) {
		if(currentTrack == tracklist[i]) {
			if(i == numberTracks - 1) {
				document.getElementById('song-title').innerHTML = tracklist[0];
				return;
			}
			document.getElementById('song-title').innerHTML = tracklist[i + 1];
			return;
		}
	}
}

function prevSong() {
	currentTrack = document.getElementById('song-title').innerHTML;
	numberTracks = tracklist.length;
	for(var i=numberTracks - 1; i >= 0; i--) {
		if(currentTrack == tracklist[i]) {
			if(i == 0) {
				document.getElementById('song-title').innerHTML = tracklist[numberTracks - 1];
				return;
			}
			document.getElementById('song-title').innerHTML = tracklist[i - 1];
			return;
		}
	}
}

function changeTimer() {
	playerBarValue = document.getElementById("song-duration-bar").value;
	currentTime = document.getElementById("current-time");
	currentTime.innerHTML = secondsToMs(playerBarValue);
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);
    console.log(`00${sec}`);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

switchBtn.addEventListener('click', switchPlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeUpBtn.addEventListener('click', volUp);
volumeDownBtn.addEventListener('click', volDown);


init();