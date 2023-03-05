const assert = require("assert");
const { JSDOM } = require("jsdom");
const Timer = require("./public/timer");

describe("Timer", function () {
  let timer;
  let startButton;
  let pauseButton;
  let durationInput;

  before(function () {
    const dom = new JSDOM(`
      <div>
        <input id="duration" type="text" value="1.00">
        <button id="start">Start</button>
        <button id="pause">Pause</button>
      </div>
    `);
    global.window = dom.window;
    global.document = dom.window.document;
    startButton = document.querySelector("#start");
    pauseButton = document.querySelector("#pause");
    durationInput = document.querySelector("#duration");
  });

  beforeEach(function () {
    timer = new Timer(durationInput, startButton, pauseButton);
  });

  afterEach(function () {
    timer.pause();
  });

  it("Should start the timer", function (done) {
    timer.startButton.click();
    setTimeout(function () {
      assert.ok(timer.timeRemaining < 1);
      done();
    }, 100);
  });

  it("Should pause the timer", function (done) {
    timer.startButton.click();
    setTimeout(function () {
      timer.pauseButton.click();
      const timeRemaining = timer.timeRemaining;
      setTimeout(function () {
        assert.equal(timer.timeRemaining, timeRemaining);
        done();
      }, 100);
    }, 100);
  });

  it("Should reset the timer", function (done) {
    timer.startButton.click();
    setTimeout(function () {
      timer.reset();
      assert.equal(timer.timeRemaining, 1);
      done();
    }, 100);
  });
});
