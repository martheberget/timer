const durationInput = document.querySelector(".duration");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");

// Separating the timer from the border
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log("Timer started");
  },
  onTick() {
    console.log("On tick");
  },
  onComplete() {
    console.log("On complete");
  },
});
