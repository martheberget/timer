const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = 2 * Math.PI * circle.getAttribute("r");
circle.setAttribute("stroke-dasharray", perimeter);

let duration, pauseTime;
let paused = 0;

playSound = () => {
  let ding = new Audio("ding.mp3");
  ding.play();
};

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    if (paused === 0) {
      duration = totalDuration;
    } else {
      if (Math.abs(totalDuration + pauseTime - duration) > 0.1) {
        duration = totalDuration;
      }
    }
  },
  onTick(timeRemaining) {
    offset = (perimeter * timeRemaining) / duration - perimeter;
    circle.setAttribute("stroke-dashoffset", offset);
  },
  onComplete() {
    playSound();
    circle.setAttribute("stroke-dashoffset", 0);
    durationInput.value = duration;
  },
  onPause(timeRemaining) {
    paused = 1;
    pauseTime = duration - timeRemaining;
  },

  onReset() {
    durationInput.addEventListener("keydown", function () {
      circle.setAttribute("stroke-dashoffset", 0);
    });
  },
});
