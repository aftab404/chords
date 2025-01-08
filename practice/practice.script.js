// Variables
const notes = ["A", "B", "C", "D", "E", "F", "G"];
const qualities = ["M","m","dim","aug"]
let time = 1;
let changed = false;
let interval = null;
let startShowing = false;
let showQuality = false;

// Event Listeners
const click_start_btn = () => {
    startShowing = !startShowing;
    const startBtn = document.getElementById("start_btn");
    startBtn.innerHTML = startShowing ? "Stop" : "Start";
    temp()
}

const click_inc_btn = () => {
    const timeElem = document.getElementById("time");
    time += 0.5;
    timeElem.innerHTML = time;
    changed = true;
}

const click_dec_btn = () => {
    const timeElem = document.getElementById("time");
    time -= 0.5;
    timeElem.innerHTML = time;
    changed = true;
}

const click_quality_btn = () => {
    showQuality = !showQuality;
}

const keydown_body = (event) => {
    console.log("fired")
    if(event.key === " "){
        click_start_btn();
    }else if (event.key === "i"){
        click_inc_btn();
    }else if(event.key === "d") {
        click_dec_btn();
    }
}

addEventEmitter(keydown_body);
addEventEmitter(click_start_btn);
addEventEmitter(click_inc_btn);
addEventEmitter(click_dec_btn);
addEventEmitter(click_quality_btn);

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





