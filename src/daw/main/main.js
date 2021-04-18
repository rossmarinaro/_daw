import Tone from '../libs/Tone.js';
import '../libs/input-knobs.js';
import '../assets/sampler.js';

/////////////////////////////////////////////////////////////////synths
export const synthesizers = {
  monoSynth : new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.MonoSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
  duoSynth : new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.DuoSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
  amSynth : new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.AMSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
  fmSynth : new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.FMSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
  synths : {
    mono: monoSynth,
    duo: duoSynth,
    am: amSynth,
    fm: fmSynth
  }
} 
      // monoSynth = new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.MonoSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
      // duoSynth = new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.DuoSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
      // amSynth = new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.AMSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
      // fmSynth = new Tone.PolySynth({polyphony : 6, detune : 0, volume : -15, voice : Tone.FMSynth, oscillator : {type: 'sawtooth'}}).toMaster(),
      // synths = {
      //   mono: monoSynth,
      //   duo: duoSynth,
      //   am: amSynth,
      //   fm: fmSynth
      // };//,
// /////////////////////////////////////////////////////////////////playback buttons
//     recordBtn = document.getElementById('record-btn-on'),
//     stopBtn = document.getElementById('stop-btn-on'),
// /////////////////////////////////////////////////////////////////mode buttons
//     playBtn = document.getElementById('play-btn-on'),
//     octaveBtn = document.getElementById('octave-btn-on'),
//     modeBtn = document.getElementById('mode-btn-on'),
//     keyBtn = document.getElementById('key-btn-on'),
// /////////////////////////////////////////////////////////////////synth buttons
//     fmBtn = document.getElementById('fm-btn-on'),
//     amBtn = document.getElementById('am-btn-on'),
//     duoBtn = document.getElementById('duo-btn-on'),
//     monoBtn = document.getElementById('mono-btn-on'),
// /////////////////////////////////////////////////////////////////pads
// //const //now = Tone.now(),
//     pad1 = document.getElementById('pad-1-on'),
//     pad2 = document.getElementById('pad-2-on'),
//     pad3 = document.getElementById('pad-3-on'),
//     pad4 = document.getElementById('pad-4-on'),
//     pad5 = document.getElementById('pad-5-on'),
//     pad6 = document.getElementById('pad-6-on'),
//     pad7 = document.getElementById('pad-7-on'),
//     pad8 = document.getElementById('pad-8-on'),

// ////entity arrays
//     pads = [pad1, pad2, pad3, pad4, pad5, pad6, pad7, pad8],
//     buttons = [recordBtn, stopBtn, playBtn, octaveBtn, modeBtn, keyBtn, fmBtn, amBtn, duoBtn, monoBtn],
//     triggers = ['mousedown', 'mouseup', 'mouseover', 'mouseout'];
//     pads.forEach(e => e.style.opacity = 0); 
//     buttons.forEach(e => e.style.opacity = 0);
// ////INPUT FUNCTIONALITY
//   for (let i in triggers) pads.forEach(j => j.addEventListener(triggers[i], ()=>{
//     switch (triggers[i])
//     {
//       case 'mousedown' : 
//                         j.style.opacity = 0.4;
//                         synths.mono.triggerAttack('C1'); 
//       break;
//       case 'mouseup' : case 'mouseout' :
//                         j.style.opacity = 0;
//                         synths.mono.triggerRelease('C1', '+0.1'); 
//       break;
//       case 'mouseover' : console.log('mouseover'); break;
//     }
//    }), false);
