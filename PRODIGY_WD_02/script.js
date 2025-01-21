const timeDisplay = document.querySelector('.time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

// Format time into MM:SS:mm
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// Update time display
function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start/Pause Button
startPauseBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        startPauseBtn.textContent = 'Pause';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        running = false;
        startPauseBtn.textContent = 'Start';
    }
});

// Reset Button
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    timeDisplay.textContent = '00:00:00.00';
    startPauseBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapList.innerHTML = '';
});

// Lap Button
lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
});
