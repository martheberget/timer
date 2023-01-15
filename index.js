const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = 2 * Math.PI * circle.getAttribute("r");
circle.setAttribute("stroke-dasharray", perimeter);

let duration, pauseTime;
let paused = 0; // False

// Separating the timer from the border
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
    console.log("Done!");
    circle.setAttribute("stroke-dashoffset", 0);
    durationInput.value = duration;
  },
  onPause(timeRemaining) {
    paused = 1;
    pauseTime = duration - timeRemaining;
  },
});
