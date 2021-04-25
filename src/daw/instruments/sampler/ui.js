import Tone from '../../libs/Tone.js';
import samplerSVG from '../../assets/sampler.js';
import { initInputs } from './inputs.js';


/////////////////////////////SAMPLER OBJ

export const SAMPLER = {
    //properties
        Props : {
          source: samplerSVG,
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
          key : null,
          octave : null,
          mode : null
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
            switch (SAMPLER.Props.currentSynth)
            {
                case 'mono' : SAMPLER.Synths.types.mono.triggerAttack(SAMPLER.Props.notePressed); break;
                case 'duo' : SAMPLER.Synths.types.duo.triggerAttack(SAMPLER.Props.notePressed); break;
                case 'am' : SAMPLER.Synths.types.am.triggerAttack(SAMPLER.Props.notePressed); break;
                case 'fm' : SAMPLER.Synths.types.fm.triggerAttack(SAMPLER.Props.notePressed); break;
            }
          },
          triggerRelease: function()
          { 
            switch (SAMPLER.Props.currentSynth)
            {
                case 'mono' : SAMPLER.Synths.types.mono.releaseAll(); break;
                case 'duo' : SAMPLER.Synths.types.duo.releaseAll(); break;
                case 'am' : SAMPLER.Synths.types.am.releaseAll(); break;
                case 'fm' : SAMPLER.Synths.types.fm.releaseAll(); break;
            }
          }
        },
      //methods
        Init: function()
        {
            document.getElementById('instrument-rack').innerHTML = SAMPLER.Props.source;
            SAMPLER.Text.key = document.getElementById('text-1-content');
            SAMPLER.Text.octave = document.getElementById('text-2-content');
            SAMPLER.Text.mode = document.getElementById('text-3-content');
            return [this.Update(), initInputs()];
        },
        Update : function()
        {
          setInterval(() => { 
          ////set text
            //debug
              //document.getElementById("debug").innerHTML = `Debug::center:   ${Inputs.props.center}`;
              SAMPLER.Text.octave.innerHTML = SAMPLER.Props.currentOctave + ' :';
              SAMPLER.Text.mode.innerHTML = SAMPLER.Props.currentMode;
              SAMPLER.Text.key.innerHTML = SAMPLER.Props.currentKey;
            //reset value of current setting
               if (this.Props.incrementKey > 12) SAMPLER.Props.incrementKey = 12;
               if (this.Props.incrementKey < 1) SAMPLER.Props.incrementKey = 1;
               if (this.Props.incrementMode > 9) SAMPLER.Props.incrementMode = 9;
               if (this.Props.incrementMode <= 0) SAMPLER.Props.incrementMode = 1;
               if (this.Props.currentOctave > 7) SAMPLER.Props.currentOctave = 8;
               if (this.Props.currentOctave < 1) SAMPLER.Props.currentOctave = 1;
           }, 0.001);
        }
  }

////initialize current synth and connect to master
     for (const [p, q] of Object.entries(SAMPLER.Synths.types)) q.toMaster();