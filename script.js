const startBtn = document.getElementById("start-btn");
const display = document.getElementById("display");
const timeElem = document.getElementById("time");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");

const notes = ["A", "B", "C", "D", "E", "F", "G"];
let time = 1;
let changed = false;
let interval = null;

let startShowing = false;

startBtn.addEventListener("click", () => {
    startShowing = !startShowing;
    startBtn.innerHTML = startShowing ? "Stop" : "Start";
    temp()
})

incBtn.addEventListener("click", () => {
    time += 0.5;
    timeElem.innerHTML = time;
    changed = true;
}
)

decBtn.addEventListener("click", () => {
    time -= 0.5;
    timeElem.innerHTML = time;
    changed = true;
}
)


function temp(){
    if(!startShowing && interval) {
        clearInterval(interval);
    }else {

        interval = setInterval(
            () => {
                if (changed) {
                    clearInterval(interval);
                    temp();
                    changed = false;
                }
                const randomNumber = Math.floor(Math.random() * notes.length);
                display.innerHTML = notes[randomNumber];
            }, time*1000
        )
    }
}






