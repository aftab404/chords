// HTML Elements
const startBtn = document.getElementById("start-btn");
const display = document.getElementById("display");
const timeElem = document.getElementById("time");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const qualityBtn = document.getElementById("quality");

// Variables
const notes = ["A", "B", "C", "D", "E", "F", "G"];
const qualities = ["M","m","dim","aug"]
let time = 1;
let changed = false;
let interval = null;
let startShowing = false;
let showQuality = false;

// Event Listeners
startBtn.addEventListener("click", () => {
    startShowing = !startShowing;
    startBtn.innerHTML = startShowing ? "Stop" : "Start";
    temp()
})

body.addEventListener("keydown", (event) => {
    if(event.key === " "){
        startShowing = !startShowing;
        startBtn.innerHTML = startShowing ? "Stop" : "Start";
        temp()
    }
})

incBtn.addEventListener("click", () => {
        time += 0.5;
        timeElem.innerHTML = time;
        changed = true;
    }
)

body.addEventListener("keydown", (event) => {

        if(event.key === "i"){
            time += 0.5;
            timeElem.innerHTML = time;
            changed = true;
        }
    }
)

decBtn.addEventListener("click", () => {
        time -= 0.5;
        timeElem.innerHTML = time;
        changed = true;
    }
)

body.addEventListener("keydown", (event) => {
        if(event.key === "d"){
            time -= 0.5;
            timeElem.innerHTML = time;
            changed = true;
        }
    }
)

qualityBtn.addEventListener("change", () => {
        showQuality = !showQuality;
    }
)


// Logic
function temp(){
    if(!startShowing && interval) {
        clearInterval(interval);
    }else {
        let oldNum = -1; // to prevent the same note from being displayed twice in a row
        let newNum = -1;

        interval = setInterval(
            () => {
                if (changed) {
                    clearInterval(interval);
                    temp();
                    changed = false;
                }
                while(oldNum === newNum){
                    newNum = Math.floor(Math.random() * notes.length);
                }
                display.innerHTML = showQuality ? notes[newNum] + `(${qualities[Math.floor(Math.random() * qualities.length)]})` : notes[newNum];
                oldNum = newNum;
            }, time*1000
        )
    }
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
    for (let input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(midiMessage) {
    const [command, note, velocity] = midiMessage.data;
    console.log(command, note, velocity);
}





