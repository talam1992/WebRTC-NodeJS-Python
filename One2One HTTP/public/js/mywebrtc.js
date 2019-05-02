io = io.connect();
var myNme = "";
var theirNme = "";
var myUsrTy = "";
var config = {
	'iceServers': [{
		'url': 'stun:stun.l.google.com:19302'
	}]
};
var rtcPrCon;
var mainVidAra = document.querySelector("#mainVidTg");
var smallVidAra = document.querySelector("#smallVidTg");

io.on('signl', function(data) {
	if (data.usrty == "dr" && data.commnd == "joinroom") {
		console.log("The dr is here!");
		if (myUsrTy == "patient") {
			theirNme = data.usrnme;
			document.querySelector("#msgOutNme").textContent = theirNme;
			document.querySelector("#msgInNme").textContent = myNme;
		}
		document.querySelector("#requstDrFrm").style.display = 'none';
		document.querySelector("#waitingForDr").style.display = 'none';
		document.querySelector("#drLsting").style.display = 'block';
	}
	else if (data.usrty == "patient" && data.commnd == "calldr") {
		console.log("Patient is calling");
		if (myUsrTy == "dr") {
			theirNme = data.usrnme;
			document.querySelector("#msgOutNme").textContent = theirNme;
			document.querySelector("#msgInNme").textContent = myNme;
		}
		document.querySelector("#drSignup").style.display = 'none';
		document.querySelector("#vidPg").style.display = 'block';
	}
	else if (data.usrty == 'siglng') {
		if (!rtcPrCon) startSiglng();
		var msg = JSON.parse(data.usrdata);
		if (msg.sdp) {
			rtcPrCon.setRemoteDescription(new RTCSessionDescription(msg.sdp), function () {
				if (rtcPrCon.remoteDescription.type == 'offer') {
					rtcPrCon.createAnswer(sendLocalDescription, logError);
				}
			}, logError);
		}
		else {
			rtcPrCon.addIceCand(new RTCIceCandidate(msg.cand));
		}
	}
}); 

function startSiglng() {
	console.log("starting signalling...");
	rtcPrCon = new webkitRTCPeerConnection(config);
	
	rtcPrCon.onicecand = function (evt) {
		if (evt.cand)
			io.emit('signl',{"usrtype":"siglng", "commnd":"icecand", "usrdata": JSON.stringify({ 'cand': evt.cand })});
		console.log("completed sending an ice candidate...");
	};
	
	rtcPrCon.onnegotiationneeded = function () {
		console.log("on negotiation called");
		rtcPrCon.createOffer(sendLocalDescription, logError);
	};
	
	rtcPrCon.onaddstream = function (evt) {
		console.log("going to add their stream...");
		mainVidAra.srcObject = evt.stream;
	};
	
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	navigator.getUserMedia({
		'audio': true,
		'video': true
	}, function (stream) {
		console.log("going to display my stream...");
		smallVidAra.srcObject = stream;
		rtcPrCon.addStream(stream);
	}, logError);
			  
}

function sendLocalDescription(desc) {
	rtcPrCon.setLocalDescription(desc, function () {
		console.log("sending local description");
		io.emit('signl',{"usrty":"siglng", "commnd":"SDP", "usrdata": JSON.stringify({ 'sdp': rtcPrCon.localDescription })});
	}, logError);
}
			
function logError(error) {
}

var muteMyself = document.querySelector("#muteMyself");
var pauseMyVid = document.querySelector("#pauseMyVid");

muteMyself.addEventListener('click', function(ev){
	console.log("muting/unmuting myself");
	var strms = rtcPrCon.getLocalStreams();
	for (var strm of strms) {
		for (var audioTrck of strm.getAudioTracks()) {
			if (audioTrck.enabled) { muteMyself.innerHTML = "Unmute" }
			else { muteMyself.innerHTML = "Mute Myself" }
			audioTrck.enabled = !audioTrck.enabled;
		}
		console.log("Local stream: " + strm.id);
	}
	ev.preventDefault();
}, false);

pauseMyVid.addEventListener('click', function(ev){
	console.log("pausing/unpausing my video");
	var strms = rtcPrCon.getLocalStreams();
	for (var strm of strms) {
		for (var videoTrck of strm.getVideoTracks()) {
			if (videoTrck.enabled) { pauseMyVid.innerHTML = "Start Video" }
			else { pauseMyVid.innerHTML = "Pause Video" }
			videoTrck.enabled = !videoTrck.enabled;
		}
		console.log("Local stream: " + strm.id);
	}
	ev.preventDefault();
}, false);