const durationInput = document.querySelector(".duration");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");

const circle = document.querySelector(".circle");

const perimeter = 2 * Math.PI * circle.getAttribute("r");
circle.setAttribute("stroke-dasharray", perimeter);

let duration;

// Separating the timer from the border
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    offset = (perimeter * timeRemaining) / duration - perimeter;
    circle.setAttribute("stroke-dashoffset", offset);
  },
  onComplete() {
    console.log("On complete");
  },
});
