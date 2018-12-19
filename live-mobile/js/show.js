window.addEventListener("keydown", function(event) {
	if(event.keyCode === 54)
		document.getElementById("start_publish_button").click();
	else if (even.keyCode === 52)
		document.getElementById("stop_publish_button").click();
	}, true);


window.addEventListener('load', function() {


var start_publish_button = document.getElementById("start_publish_button");
var stop_publish_button = document.getElementById("stop_publish_button");

var screen_share_checkbox = document.getElementById("screen_share_checkbox");
var install_extension_link = document.getElementById("install_chrome_extension_link");

var streamNameBox = document.getElementById("streamName");

var streamId;

function startPublishing() {
	streamId = streamNameBox.value;
	webRTCAdaptor.publish(streamId, token);
}

function stopPublishing() {
	webRTCAdaptor.stop(streamId);
}

function enableDesktopCapture(enable) {
	if (enable == true) {
		webRTCAdaptor.switchDesktopCapture(streamId);
	}
	else {
		webRTCAdaptor.switchVideoCapture(streamId);
	}
}

function startAnimation() {

    $("#broadcastingInfo").fadeIn(800, function () {
      $("#broadcastingInfo").fadeOut(800, function () {
    	var state = webRTCAdaptor.signallingState(streamId);
        if (state != null && state != "closed") {
        	var iceState = webRTCAdaptor.iceConnectionState(streamId);
        	if (iceState != null && iceState != "failed" && iceState != "disconnected") {
          		startAnimation();
        	}
        }
      });
    });

  }

var pc_config = null;

var sdpConstraints = {
	OfferToReceiveAudio : false,
	OfferToReceiveVideo : false

};

var mediaConstraints = {
	video : true,
	audio : true
};

var websocketURL = "ws://" + "10.197.5.8" + ":5080/WebRTCApp/websocket";

if (location.protocol.startsWith("https")) {
	websocketURL = "wss://" + "10.197.5.8" + ":5443/WebRTCApp/websocket";
}


var webRTCAdaptor = new WebRTCAdaptor({
	websocket_url : websocketURL,
	mediaConstraints : mediaConstraints,
	peerconnection_config : pc_config,
	sdp_constraints : sdpConstraints,
	localVideoId : "localVideo",
	debug:true,
	callback : function(info, description) {
		if (info == "initialized") {
			console.log("initialized");
			start_publish_button.disabled = false;
			stop_publish_button.disabled = true;
		} else if (info == "publish_started") {
			//stream is being published
			console.log("publish started");
			start_publish_button.disabled = true;
			stop_publish_button.disabled = false;
			startAnimation();
		} else if (info == "publish_finished") {
			//stream is being finished
			console.log("publish finished");
			start_publish_button.disabled = false;
			stop_publish_button.disabled = true;
		}
		else if (info == "screen_share_extension_available") {
			screen_share_checkbox.disabled = false;
			install_extension_link.style.display = "none";
		}
		else if (info == "closed") {
			//console.log("Connection closed");
			if (typeof description != "undefined") {
				console.log("Connecton closed: " + JSON.stringify(description));
			}
		}
	},
	callbackError : function(error, message) {
		//some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError
        
		console.log("error callback: " +  JSON.stringify(error));
		var errorMessage = JSON.stringify(error);
		if (typeof message != "undefined") {
			errorMessage = message;
		}
		var errorMessage = JSON.stringify(error);
		if (error.indexOf("NotFoundError") != -1) {
			errorMessage = "Camera or Mic are not found or not allowed in your device";
		}
		else if (error.indexOf("NotReadableError") != -1 || error.indexOf("TrackStartError") != -1) {
			errorMessage = "Camera or Mic is being used by some other process that does not let read the devices";
		}
		else if(error.indexOf("OverconstrainedError") != -1 || error.indexOf("ConstraintNotSatisfiedError") != -1) {
			errorMessage = "There is no device found that fits your video and audio constraints. You may change video and audio constraints"
		}
		else if (error.indexOf("NotAllowedError") != -1 || error.indexOf("PermissionDeniedError") != -1) {
			errorMessage = "You are not allowed to access camera and mic.";
		}
		else if (error.indexOf("TypeError") != -1) {
			errorMessage = "Video/Audio is required";
		}
	
		alert(errorMessage);
	}
});
});
