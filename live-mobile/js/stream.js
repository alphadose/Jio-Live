naviBoard.setNavigation('stream-button')
var websocketURL = "ws://" + "192.168.43.164" + ":5080/WebRTCApp/websocket";
var mediaConstraints = {
	video : true,
	audio : true
};

var sdpConstraints = {
	OfferToReceiveAudio : false,
	OfferToReceiveVideo : false

};

var webRTCAdaptor = new WebRTCAdaptor({
	websocket_url : websocketURL,
	mediaConstraints : mediaConstraints,
	peerconnection_config : null,
	sdp_constraints : sdpConstraints,
	localVideoId : "localVideo",
	debug:true,

	callback : function(info, description) {
		console.log("Inside Callback")
	},
	callbackError : function(error, message) {
		console.log("Inside callback error")
	}
});


window.addEventListener('keyup', function(event) {
	if(event.key == 'Enter') {
		console.log("Starting to publish webrtc adaptor")
		let streamName = "fristonio"
		$.ajax
        ({
            type: "POST",
            url: 'https://cors-anywhere.herokuapp.com/http://shaddygarg.pythonanywhere.com/events/',
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            //json object to sent to the authentication url
            data: JSON.stringify({ "username": "fristonio", "link" : "rtmp://192.168.43.164:1935/WebRTCApp/"+streamName, "name": streamName, "current_live": true}),
            success: function () {
            }
        })
		webRTCAdaptor.publish(streamName, null);
	}
}, true)


function openNav() {
    document.getElementById("sideNavigation").style.width = "150px";
    naviBoard.setNavigation('sideNavigation')
}
 
function closeNav() {
    document.getElementById("sideNavigation").style.width = "0px";
    naviBoard.setNavigation('stream-button')
}

window.addEventListener('keyup', function(event) {
	if(event.key == 'SoftLeft') {
		if (document.getElementById("sideNavigation").style.width == "0px")
			openNav()
		else
			closeNav()
	}
}, true)
