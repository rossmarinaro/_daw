

export const samplerInputs = {
    /////////////////////////////////////////////////////////////////playback buttons
    recordBtn : document.getElementById('record-btn-on'),
    stopBtn : document.getElementById('stop-btn-on'),
    /////////////////////////////////////////////////////////////////mode buttons
    playBtn : document.getElementById('play-btn-on'),
    octaveBtn : document.getElementById('octave-btn-on'),
    modeBtn : document.getElementById('mode-btn-on'),
    keyBtn : document.getElementById('key-btn-on'),
    /////////////////////////////////////////////////////////////////synth buttons
    fmBtn : document.getElementById('fm-btn-on'),
    amBtn : document.getElementById('am-btn-on'),
    duoBtn : document.getElementById('duo-btn-on'),
    monoBtn : document.getElementById('mono-btn-on'),
    /////////////////////////////////////////////////////////////////pads
    //const //now = Tone.now(),
    pad1 : document.getElementById('pad-1-on'),
    pad2 : document.getElementById('pad-2-on'),
    pad3 : document.getElementById('pad-3-on'),
    pad4 : document.getElementById('pad-4-on'),
    pad5 : document.getElementById('pad-5-on'),
    pad6 : document.getElementById('pad-6-on'),
    pad7 : document.getElementById('pad-7-on'),
    pad8 : document.getElementById('pad-8-on'),

    ////entity arrays
    pads : [this.pad1, this.pad2, this.pad3, this.pad4, this.pad5, this.pad6, this.pad7, this.pad8],
    buttons : [this.recordBtn, this.stopBtn, this.playBtn, this.octaveBtn, this.modeBtn, this.keyBtn, 
                this.fmBtn, this.amBtn, this.duoBtn, this.monoBtn],
    triggers : ['mousedown', 'mouseup', 'mouseover', 'mouseout'],

    inputFunctionality : ()=>{
        pads.forEach(e => e.style.opacity = 0); 
        buttons.forEach(e => e.style.opacity = 0);
        ////INPUT FUNCTIONALITY
        for (let i in triggers) pads.forEach(j => j.addEventListener(triggers[i], ()=>{
        switch (triggers[i])
        {
        case 'mousedown' : 
                            j.style.opacity = 0.4;
                            synths.mono.triggerAttack('C1'); 
        break;
        case 'mouseup' : case 'mouseout' :
                            j.style.opacity = 0;
                            synths.mono.triggerRelease('C1', '+0.1'); 
        break;
        case 'mouseover' : console.log('mouseover'); break;
        }
        }), false);
    }
}
// /////////////////////////////////////////////////////////////////playback buttons
//     recordBtn = document.getElementById('record-btn-on'),
//     stopBtn = document.getElementById('stop-btn-on'),
//     /////////////////////////////////////////////////////////////////mode buttons
//     playBtn = document.getElementById('play-btn-on'),
//     octaveBtn = document.getElementById('octave-btn-on'),
//     modeBtn = document.getElementById('mode-btn-on'),
//     keyBtn = document.getElementById('key-btn-on'),
//     /////////////////////////////////////////////////////////////////synth buttons
//     fmBtn = document.getElementById('fm-btn-on'),
//     amBtn = document.getElementById('am-btn-on'),
//     duoBtn = document.getElementById('duo-btn-on'),
//     monoBtn = document.getElementById('mono-btn-on'),
//     /////////////////////////////////////////////////////////////////pads
//     //const //now = Tone.now(),
//     pad1 = document.getElementById('pad-1-on'),
//     pad2 = document.getElementById('pad-2-on'),
//     pad3 = document.getElementById('pad-3-on'),
//     pad4 = document.getElementById('pad-4-on'),
//     pad5 = document.getElementById('pad-5-on'),
//     pad6 = document.getElementById('pad-6-on'),
//     pad7 = document.getElementById('pad-7-on'),
//     pad8 = document.getElementById('pad-8-on'),

//     ////entity arrays
//     pads = [pad1, pad2, pad3, pad4, pad5, pad6, pad7, pad8],
//     buttons = [recordBtn, stopBtn, playBtn, octaveBtn, modeBtn, keyBtn, fmBtn, amBtn, duoBtn, monoBtn],
//     triggers = ['mousedown', 'mouseup', 'mouseover', 'mouseout'];
//     pads.forEach(e => e.style.opacity = 0); 
//     buttons.forEach(e => e.style.opacity = 0);
//     ////INPUT FUNCTIONALITY
//     for (let i in triggers) pads.forEach(j => j.addEventListener(triggers[i], ()=>{
//     switch (triggers[i])
//     {
//     case 'mousedown' : 
//                         j.style.opacity = 0.4;
//                         synths.mono.triggerAttack('C1'); 
//     break;
//     case 'mouseup' : case 'mouseout' :
//                         j.style.opacity = 0;
//                         synths.mono.triggerRelease('C1', '+0.1'); 
//     break;
//     case 'mouseover' : console.log('mouseover'); break;
//     }
//     }), false);


//MIDI INPUTS
// //console.clear();

// class MIDIAccess {
//   constructor(args = {}) {
//     this.onDeviceInput = args.onDeviceInput || console.log;
//   }

//   start() {
//     return new Promise((resolve, reject) => {
//       this._requestAccess().then(access => {
//         this.initialize(access);
//         resolve();
//       }).catch(() => reject('Something went wrong.'));
//     });
//   }

//   initialize(access) {
//     const devices = access.inputs.values();
//     for (let device of devices) this.initializeDevice(device);
//   }

//   initializeDevice(device) {
//     device.onmidimessage = this.onMessage.bind(this);
//   }
  
//   onMessage(message) {
//     let [_, input, value] = message.data;
//     this.onDeviceInput({ input, value });
//   }

//   _requestAccess() {
//     return new Promise((resolve, reject) => {
//       if (navigator.requestMIDIAccess)
//         navigator.requestMIDIAccess()
//           .then(resolve)
//           .catch(reject);
//       else reject();
//     });
//   }
// }

// class Instrument {
//   constructor() {
//     this.synth = new Tone.PolySynth(3, Tone.FMSynth);

//     this.filter = new Tone.Filter();
//     this.volume = new Tone.Gain();

//     this.synth.connect(this.filter);
//     this.filter.connect(this.volume);
//     this.volume.toMaster();
    
//     this.filter.frequency.value = 200; // 200 - 15000
//     this.volume.gain.value = 0.8; // 0-0.8
//   }

//   toggleSound(value) {
//     let method = value === 127 ? 'triggerAttack' : 'releaseAll';
//     this.synth[method](['C4', 'E4', 'G4']);
//   }

//   handleVolume(value) { // 0-127
//     let val = value / 127 * 0.8;
//     this.volume.gain.value = val;
//   }

//   handleFilter(value) { // 0-127
//     let val = value / 127 * 14800 + 200;
//     this.filter.frequency.value = val;
//   }
// }

// // UPDATE: there is a problem in chrome with starting audio context
// //  before a user gesture. This fixes it.
// var started = false;
// document.documentElement.addEventListener('mousedown', () => {
//   if (started) return;
//   started = true;
//   const inst = new Instrument();
//   const midi = new MIDIAccess({ onDeviceInput });
//   midi.start().then(() => console.log('STARTED!')).catch(console.error);

//   function onDeviceInput({ input, value }) {
//     if (input === 23) inst.toggleSound(value);
//     else if (input === 2) inst.handleVolume(value);
//     else if (input === 14) inst.handleFilter(value);
//     else console.log('onDeviceInput!', input, value);
//   }
// });


class MIDIAccess {
    constructor(args = {}) {
    this.onDeviceInput = args.onDeviceInput //|| console.log;
    }

    start() {
    return new Promise((resolve, reject) => {
        this._requestAccess().then(access => {
        this.initialize(access);
        resolve();
        }).catch(() => reject('Something went wrong.'));
    });
    }

    initialize(access) {
    const devices = access.inputs.values();
    for (let device of devices) this.initializeDevice(device);
    }

    initializeDevice(device) {
    device.onmidimessage = this.onMessage.bind(this);
    }
    
    onMessage(message) {
    let [_, input, value] = message.data;
    this.onDeviceInput({ input, value });
    }

    _requestAccess() {
    return new Promise((resolve, reject) => {
        if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess()
            .then(resolve)
            .catch(reject);
        else reject();
    });
  }
}

class Instrument {
    constructor() {
    this.synth = new Tone.PolySynth(3, Tone.FMSynth);

    this.filter = new Tone.Filter();
    this.volume = new Tone.Gain();

    this.synth.connect(this.filter);
    this.filter.connect(this.volume);
    this.volume.toMaster();
    
    this.filter.frequency.value = 200; // 200 - 15000
    this.volume.gain.value = 0.8; // 0-0.8
    }

    toggleSound(value) {
    let method = value === 127 ? 'triggerAttack' : 'releaseAll';
    this.synth[method](['C4', 'E4', 'G4']);
    }

    handleVolume(value) { // 0-127
    let val = value / 127 * 0.8;
    this.volume.gain.value = val;
    }

    handleFilter(value) { // 0-127
    let val = value / 127 * 14800 + 200;
    this.filter.frequency.value = val;
    }
}

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
var started = false;
document.documentElement.addEventListener('mousedown', () => {
if (started) return;
started = true;
const inst = new Instrument();
const midi = new MIDIAccess({ onDeviceInput });
midi.start().then(() => {
  console.log('STARTED!');
}).catch(console.error);

function onDeviceInput({ input, value }) {
  if (input === 23) inst.toggleSound(value);
  else if (input === 2) inst.handleVolume(value);
  else if (input === 14) inst.handleFilter(value);
//  
  if (input === 7) inst.toggleSound(value);
  //else console.log('onDeviceInput!', input, value);
}
});