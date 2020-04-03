const RADIUS = 70;

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