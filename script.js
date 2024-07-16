let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    isRunning = true;
    startPauseButton.textContent = 'Pause';
}

function pauseStopwatch() {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startPauseButton.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    startPauseButton.textContent = 'Start';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    lapsList.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
}

function recordLap() {
    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}
