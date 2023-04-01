class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onPause = callbacks.onPause;
      this.onReset = callbacks.onReset;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("click", this.reset);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }

    this.tick();
    this.interval = setInterval(this.tick, 20);
    this.startButton.disabled = true;
  };

  pause = () => {
    clearInterval(this.interval);
    if (this.onPause) {
      this.onPause(this.timeRemaining);
    }
    this.startButton.disabled = false;
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete(this.playSound);
        this.startButton.disabled = false;
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  reset = () => {
    if (this.onReset) {
      this.pause();
      this.onReset();
    }
  };

  playSound = () => {
    let ding = new Audio("ding.mp3");
    ding.play();
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}

module.exports = Timer;
