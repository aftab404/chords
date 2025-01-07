// Variables
const notes = ["A", "B", "C", "D", "E", "F", "G"];
const qualities = ["M","m","dim","aug"]
let time = 1;
let changed = false;
let interval = null;
let startShowing = false;
let showQuality = false;

// Event Listeners
const startBtn_click = () => {
    startShowing = !startShowing;
    const startBtn = document.getElementById("startBtn");
    startBtn.innerHTML = startShowing ? "Stop" : "Start";
    temp()
}

const incBtn_click = () => {
    const timeElem = document.getElementById("time");
    time += 0.5;
    timeElem.innerHTML = time;
    changed = true;
}

const decBtn_click = () => {
    const timeElem = document.getElementById("time");
    time -= 0.5;
    timeElem.innerHTML = time;
    changed = true;
}

const qualityBtn_click = () => {
    showQuality = !showQuality;
}

const body_keydown = (event) => {
    console.log("fired")
    if(event.key === " "){
        startBtn_click();
    }else if (event.key === "i"){
        incBtn_click();
    }else if(event.key === "d") {
        decBtn_click();
    }
}

addEventEmitter(body_keydown);
addEventEmitter(startBtn_click);
addEventEmitter(incBtn_click);
addEventEmitter(decBtn_click);
addEventEmitter(qualityBtn_click);

// Logic
function temp(){
    const display = document.getElementById("display");
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





