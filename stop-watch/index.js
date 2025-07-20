// DOM element
const time = document.querySelector(".time");
const startBtn = document.querySelector(".startStopButton");
const resetBtn = document.querySelector(".resetButton");

// state variables
let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let isRunning = false;

// function to show time
function showTime() {
  let timeDiff = Date.now() - startTime + elapsedTime;
  let seconds = Math.floor(timeDiff / 1000);
  time.innerHTML = seconds;
}

// start button
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    intervalId = setInterval(showTime, 1000);
    startBtn.innerHTML = "Stop";
    isRunning = true;
  } else {
    startBtn.innerHTML = "Start";
    clearInterval(intervalId);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
});

// reset Button
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  time.innerHTML = 0;
  isRunning = false;
  startBtn.innerHTML = "Start";
});
