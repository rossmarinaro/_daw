import '../assets/sampler.js';
import Tone from '../libs/Tone.js';
import { Inputs } from './inputs.js';


///////////////////////////////////////SAMPLER OBJ
 export const SAMPLER = {
    //properties
        SamplerProps : {
          currentSynth: 'mono',
          currentSetting: 'OCTAVE',
          currentKey: 'C',
          currentMode: 'CHROMATIC',
          currentOctave: 1,
          incrementKey: 1,  
          incrementMode: 1,
          notePressed: '',
          types: []
        },
    //modes
        Text : {
          key : document.getElementById('text-1-content'),
          octave : document.getElementById('text-2-content'),
          mode : document.getElementById('text-3-content')
        },
    //synths
        Synths : {
          types : {
            mono : new Tone.PolySynth({polyphony : 6, detune : 0, volume : -5, voice : Tone.MonoSynth, oscillator : {type: 'sawtooth'}}),
            duo : new Tone.PolySynth({polyphony : 6, detune : 0, volume : 5, voice : Tone.DuoSynth, oscillator : {type: 'sawtooth'}}),
            am : new Tone.PolySynth({polyphony : 6, detune : 0, volume : 5, voice : Tone.AMSynth, oscillator : {type: 'sawtooth'}}),
            fm : new Tone.PolySynth({polyphony : 6, detune : 0, volume : -5, voice : Tone.FMSynth, oscillator : {type: 'sawtooth'}}),
          },
          triggerAttack: function()
          {
            switch (SAMPLER.SamplerProps.currentSynth)
            {
                case 'mono' : SAMPLER.Synths.types.mono.triggerAttack(SAMPLER.SamplerProps.notePressed); break;
                case 'duo' : SAMPLER.Synths.types.duo.triggerAttack(SAMPLER.SamplerProps.notePressed); break;
                case 'am' : SAMPLER.Synths.types.am.triggerAttack(SAMPLER.SamplerProps.notePressed); break;
                case 'fm' : SAMPLER.Synths.types.fm.triggerAttack(SAMPLER.SamplerProps.notePressed); break;
            }
          },
          triggerRelease: function()
          { 
            switch (SAMPLER.SamplerProps.currentSynth)
            {
                case 'mono' : SAMPLER.Synths.types.mono.releaseAll(); break;
                case 'duo' : SAMPLER.Synths.types.duo.releaseAll(); break;
                case 'am' : SAMPLER.Synths.types.am.releaseAll(); break;
                case 'fm' : SAMPLER.Synths.types.fm.releaseAll(); break;
            }
          }
        },
      //methods
        Init: ()=> SAMPLER.Update(),
        Update : ()=>{
          setInterval(() => { 
          ////set text
            //debug
              //document.getElementById("debug").innerHTML = `Debug::center:   ${Inputs.props.center}`;
              SAMPLER.Text.octave.innerHTML = SAMPLER.SamplerProps.currentOctave + ' :';
              SAMPLER.Text.mode.innerHTML = SAMPLER.SamplerProps.currentMode;
              SAMPLER.Text.key.innerHTML = SAMPLER.SamplerProps.currentKey;
            //reset value of current setting
               if (SAMPLER.SamplerProps.incrementKey > 12) SAMPLER.SamplerProps.incrementKey = 12;
               if (SAMPLER.SamplerProps.incrementKey < 1) SAMPLER.SamplerProps.incrementKey = 1;
               if (SAMPLER.SamplerProps.incrementMode > 9) SAMPLER.SamplerProps.incrementMode = 9;
               if (SAMPLER.SamplerProps.incrementMode <= 0) SAMPLER.SamplerProps.incrementMode = 1;
               if (SAMPLER.SamplerProps.currentOctave > 7) SAMPLER.SamplerProps.currentOctave = 8;
               if (SAMPLER.SamplerProps.currentOctave < 1) SAMPLER.SamplerProps.currentOctave = 1;
               switch(SAMPLER.SamplerProps.currentSetting)
                {
                    case 'OCTAVE' :
                              Inputs.buttons.octaveBtn.style.opacity = 0.4;
                              Inputs.buttons.modeBtn.style.opacity = 0;
                              Inputs.buttons.keyBtn.style.opacity = 0;
                    break;
                    case 'MODE' :
                              Inputs.buttons.modeBtn.style.opacity = 0.4;
                              Inputs.buttons.octaveBtn.style.opacity = 0;
                              Inputs.buttons.keyBtn.style.opacity = 0;
                    break;
                    case 'KEY' :
                              Inputs.buttons.keyBtn.style.opacity = 0.4;
                              Inputs.buttons.octaveBtn.style.opacity = 0;
                              Inputs.buttons.modeBtn.style.opacity = 0;
                    break;
                }
                switch (SAMPLER.SamplerProps.currentSynth)
                {
                    case 'mono' : 
                              Inputs.buttons.monoBtn.style.opacity = 0.4;
                              Inputs.buttons.duoBtn.style.opacity = 0;
                              Inputs.buttons.amBtn.style.opacity = 0;
                              Inputs.buttons.fmBtn.style.opacity = 0;
                    break;
                    case 'duo' :
                              Inputs.buttons.duoBtn.style.opacity = 0.4;
                              Inputs.buttons.monoBtn.style.opacity = 0;
                              Inputs.buttons.amBtn.style.opacity = 0;
                              Inputs.buttons.fmBtn.style.opacity = 0;
                    break;
                    case 'am' :
                              Inputs.buttons.amBtn.style.opacity = 0.4;
                              Inputs.buttons.monoBtn.style.opacity = 0;
                              Inputs.buttons.duoBtn.style.opacity = 0;
                              Inputs.buttons.fmBtn.style.opacity = 0;
                    break;
                    case 'fm' :
                              Inputs.buttons.fmBtn.style.opacity = 0.4;
                              Inputs.buttons.duoBtn.style.opacity = 0;
                              Inputs.buttons.monoBtn.style.opacity = 0;
                              Inputs.buttons.amBtn.style.opacity = 0;
                    break;
                }
           }, 0.001);
        }
  }


////initialize current synth and connect to master
     for (const [p, q] of Object.entries(SAMPLER.Synths.types)) q.toMaster();

     SAMPLER.Init();
    

  // document.addEventListener('mousedown', ()=> SAMPLER.Text.mode.innerHTML = 'down');
  // document.addEventListener('mouseup', ()=> SAMPLER.Text.mode.innerHTML = 'up');
  //const //now = Tone.now(),