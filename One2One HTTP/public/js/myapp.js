var lndngPgDiv = document.querySelector("#lndngPg");
var patntEtryDiv = document.querySelector("#patntEtry");
var drSignupDiv = document.querySelector("#drSignup");
var vidPgDiv = document.querySelector("#vidPg");
var patientNme = document.querySelector("#patientNme");
var drName = document.querySelector("#drName");
var drSpecialty = document.querySelector("#drSpecialty");
var loginAsPatient = document.querySelector("#loginAsPatient");
var requstDr = document.querySelector("#requstDr");
var requstDrFrm = document.querySelector("#requstDrFrm");
var waitingForDr = document.querySelector("#waitingForDr");
var waitingForDrProgress = document.querySelector("#waitingForDrProgress");
var drSignupFrm = document.querySelector("#drSignupFrm");
var drSignupBtn = document.querySelector("#drSignupBtn");
var waitngPatnt = document.querySelector("#waitngPatnt");
var drLsting = document.querySelector("#drLsting");
var callDr = document.querySelector("#callDr");
var loginAsDr = document.querySelector("#loginAsDr");

loginAsPatient.addEventListener('click', function(ev){
	lndngPgDiv.style.display = 'none';
	patntEtryDiv.style.display = 'block';
	drSignupDiv.style.display = 'none';
	vidPgDiv.style.display = 'none';
	
	myUsrTy = "patient";
	requstDrFrm.style.display = 'block';
	waitingForDr.style.display = 'none';
	drLsting.style.display = 'none';
	ev.preventDefault();
}, false);

requstDr.addEventListener('click', function(ev){
	requstDrFrm.style.display = 'none';
	waitingForDr.style.display = 'block';
	drLsting.style.display = 'none';
	patientUsrNme = patientNme.value || 'no name';
	myNme = patientUsrNme;
	io.emit('signl', {"usrty": "patient", "usrnme": patientUsrNme, "usrdata": "no data, just a patient", "commnd": "joinroom"});
	console.log("patient " + patientUsrNme + " has joined.");
	
	ev.preventDefault();
}, false);

loginAsDr.addEventListener('click', function(ev){
	lndngPgDiv.style.display = 'none';
	patntEtryDiv.style.display = 'none';
	drSignupDiv.style.display = 'block';
	vidPgDiv.style.display = 'none';
	
	myUsrTy = "dr";
	drSignupFrm.style.display = 'block';
	waitngPatnt.style.display = 'none';
	ev.preventDefault();
}, false);

drSignupBtn.addEventListener('click', function(ev){
	drSignupFrm.style.display = 'none';
	waitngPatnt.style.display = 'block';
	drUserName = drName.value || 'no name';
	myNme = drUserName;
	io.emit('signl', {"usrty": "dr", "usrnme": drUserName, "usrdata": drSpecialty.value, "commnd": "joinroom"});
	console.log("Dr. " + drUserName + " has joined.");
	
	ev.preventDefault();
}, false);

callDr.addEventListener('click', function(ev){
	lndngPgDiv.style.display = 'none';
	patntEtryDiv.style.display = 'none';
	vidPgDiv.style.display = 'block';
	patientUsrNme = patientNme.value || 'no name';
	io.emit('signl', {"usrty": "patient", "usrnme": patientUsrNme, "usrdata": "calling dr", "commnd": "calldr"});
	console.log("patient " + patientUsrNme + " is calling.");

	if (!rtcPrCon) startSiglng();
	
	ev.preventDefault();
}, false);