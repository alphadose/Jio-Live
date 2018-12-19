function getParam(param){
  return window.location.href.split("?")[1].split("=")[1];
}

let stream = getParam('stream')
let webRTCRoot = 'http://192.168.43.164:5080/WebRTCApp/'
let streamIframeURL = webRTCRoot + 'play.html?autoplay=true&name=' + stream

document.getElementById('embedded_player').src = streamIframeURL

document.getElementsByClassName('stream-name')[0].innerHTML = stream
naviBoard.setNavigation('parent')

window.addEventListener('keyup', function(event) {
	if(event.key == 'Enter') {
		console.log(naviBoard.getActiveElement().attributes)
		switch(naviBoard.getActiveElement().attributes[2].nodeValue) {
			case "start": start();
						break;
			case "stop": stop();
						break;

			default: console.log("Illegal.")
		}
	}
}, true)

function start() {
	console.log('Called start')
	fetch(webRTCRoot + "streams/" + stream + ".m3u8", {
		method : 'HEAD'
	})
	.then(function(response) {
		if (response.status == 200) {
			$("#embedded_player").attr(
					"src",
					streamIframeURL);
		} else if (response.status == 404) {
			console.log("Are you sure you are broadcasting? If yes, wait a few seconds like 5-10sec then press play button again");
		} else {
			console.log("An error occured. Please send us an email(contact@antmedia.io) by providing OS, browser info and exact sceneraio")
		}
	});
}

function stop() {
	console.log('Called stop')
	$("#embedded_player").attr("src", webRTCRoot + "play.html?name=");
}

function openNav() {
    document.getElementById("sideNavigation").style.width = "150px";
    naviBoard.setNavigation('sideNavigation')
}
 
function closeNav() {
    document.getElementById("sideNavigation").style.width = "0px";
    naviBoard.setNavigation('parent')
}

window.addEventListener('keyup', function(event) {
	if(event.key == 'SoftLeft') {
		if (document.getElementById("sideNavigation").style.width == "0px")
			openNav()
		else
			closeNav()
	}
}, true)
