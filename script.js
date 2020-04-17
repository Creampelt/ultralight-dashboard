let socket = new WebSocket('ws://192.168.1.120:8000', ['soap', 'xmpp']);

socket.onopen = (e) => {
  console.log("Connection established");
};

socket.onmessage = function(event) {
  let eventData = JSON.parse(event.data);
  if (eventData.type === "json") {
    let data = eventData.data;
    if (data.altitude) {
      setAltimeter(data.altitude);
      setVerticalSpeed(data.altitude);
    }
    if (data.airspeed) {
      setASI(data.airspeed);
    }
  }
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

const RADIUS = 70;

function setASI(airspeed) {
  let asi = document.getElementById("asi");
  asi.innerText = Math.round(airspeed * 1.94384);
}

function setAltimeter(altitude) {
  let altimeter = document.getElementById("altimeter");
  altimeter.innerText = Math.round(altitude * 3.28084).toString();
}

function setVerticalSpeed(altitude) {
  let prevTime = document.getElementById("time-lapsed");
  let currentTime = (new Date()).getMilliseconds();
  let timeLapsed = (currentTime - parseInt(prevTime.innerText, 10)) / (1000 * 60.0);
  let vsi = document.getElementById("vsi");
  let prevAltitude = document.getElementById("altimeter").innerText;
  console.log((altitude * 3.28084 - parseInt(prevAltitude, 10)));
  vsi.innerText = Math.round((altitude - parseInt(prevAltitude, 10)) / timeLapsed).toString();
  prevTime.innerText = currentTime.toString();
}

function setAttitudeAngle(theta) {
  let path = document.getElementsByClassName("attitude-path");
  let polygon = document.getElementById("attitude-polygon");
  let text = document.getElementById("attitude-text");

  for (let i = 0; i < path.length; i++) {
    path[i].style.strokeDashoffset = `${Math.PI * RADIUS * (180 - theta) / 180}`;
  }

  polygon.style.transform = `rotate(${theta}deg)`;
  text.innerText = theta;
}

function setTurnAngle(theta) {
  let path = document.getElementsByClassName("turn-path");
  let polygon = document.getElementById("turn-polygon");

  for (let i = 0; i < path.length; i++) {
    path[i].style.strokeDashoffset = `${Math.PI * RADIUS * (180 - theta) / 180}`;
  }

  polygon.style.transform = `rotate(${theta}deg)`;
}

function setHeadingAngle(theta) {
  let HIGroup = document.getElementById("hi-group");
  let text = document.getElementById("heading-text");

  HIGroup.style.transform = `rotate(${-theta}deg`;
  text.innerText = theta;
}

window.onload = function() {
  setAttitudeAngle(0);
};