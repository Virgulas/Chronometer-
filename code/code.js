let c1 = document.body.getElementsByClassName("c1");
let c2 = document.body.getElementsByClassName("c2");
let buttons = document.body.getElementsByTagName("p");
let preventDef = document.body.getElementsByClassName("menu");
let audio = new Audio("./audio/w_p.mp3");
let script, current;

preventDef[0].addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

buttons[0].addEventListener("click", start);
buttons[1].addEventListener("click", stop);
buttons[2].addEventListener("click", reset);

let ms = 0;
let secs = 0;
let min = 0;

function startWorker() {
  if (typeof Worker !== "undefined") {
    if (typeof script == "undefined") {
      script = new Worker("code/worker/worker.js");
    }
  }
}

function reset() {
  if (current != "stop") return;
  ms = secs = min = 0;
  c1[0].innerHTML =
    String(min).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  c2[0].innerHTML = ":" + String(ms).padStart(3, "0");
  script.postMessage([ms, secs, min, st]);
}

function stop() {
  current = "stop";
  buttons[0].addEventListener("click", start);
  script.terminate();
  script = undefined;
  audio.pause();
}

function start() {
  current = "start";
  startWorker();
  buttons[0].removeEventListener("click", start);
  script.addEventListener("message", result, true);
  script.postMessage([ms, secs, min]);
  audio.play();
  audio.volume = 0.1;
  audio.loop = true;
}

function result(e) {
  ms = e.data[0];
  secs = e.data[1];
  min = e.data[2];
  c1[0].innerHTML =
    String(min).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  c2[0].innerHTML = ":" + String(ms).padStart(3, "0");
}
