const timerDisplay = document.getElementById("timer");
const startTimer = document.getElementById("start");
const stopTimer = document.getElementById("stop");
const resetTimer = document.getElementById("reset");

console.log(startTimer);

let timer = null;
let [seconds,centiseconds,miliseconds] = [000,00,0];

function runTimer() {
    let seperatedTime = [];
    miliseconds += 10;
    seperatedTime = (miliseconds * 0.001).toFixed(2).split('.');
    seconds = seperatedTime[0] < 10 ? `00${seperatedTime[0]}` : seperatedTime[0] < 100 ? `0${seperatedTime[0]}` : seperatedTime[0];
    
    centiseconds = seperatedTime[1];
    timerDisplay.innerHTML = `${seconds}:${centiseconds}`;
    // console.log(typeof((miliseconds * 0.001).toFixed(2)));
}

window.addEventListener("load", function(){
    startTimer.addEventListener('click', function() {
        if(timer !== null) clearInterval(timer);
        timer = setInterval(runTimer,10);
    })

    stopTimer.addEventListener('click', function() {
        clearInterval(timer);
    })
    resetTimer.addEventListener('click', function() {
        clearInterval(timer);
        seconds,centiseconds,miliseconds = 0;
        timerDisplay.innerHTML = '000:00';
        console.log('reset');
    })
})
