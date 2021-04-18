`use strict`;

import Tone from './libs/Tone.js';

import _clickSnd from './assets/audio/click_snd.ogg';
import pause_play from './assets/icons/pause_play.png';
import stop from './assets/icons/stop.png';
import record from './assets/icons/record.png';
import sampler_no_btn from './assets/sampler_ui/1.png';
import sampler_ui_pad from './assets/sampler_ui/5.png';
import sampler_ui_knob1 from './assets/sampler_ui/3.png';
import sampler_ui_knob2 from './assets/sampler_ui/4.png';
import sampler_ui_btn_primary from './assets/sampler_ui/7.png';
import sampler_ui_btn_secondary from './assets/sampler_ui/2.png';
import sampler_ui_arrow from './assets/sampler_ui/8.png';
import sampler_ui_xy from './assets/sampler_ui/6.png';
import track from './assets/sampler_ui/track.png';
import thumb from './assets/sampler_ui/thumb.png';

//// Transport time configuration
/////time
   var currentTime = Tone.Transport.time;
   var currentTimeSignature = Tone.Transport.timeSignature;
   let isLooping = Tone.Transport.loop = false/* true */,
        loopStart = Tone.Transport.loopStart = "4m",
        loopEnd = Tone.Transport.loopEnd = "8m",
        elapsedTime = Tone.Transport.seconds,
        time = Tone.Transport.time,
        timePosition = Tone.Transport.position,
        timeProgress = Tone.Transport.progress,
////sampler config
        counter = 0, 
        //elapsedTime = 0,
        keySigValueNum = 1,
        menu_mode = false, 
        menu_key = false, 
        menu_bpm = true,
    //ui booleans
        keySigBoolCW = false, keySigBoolCCW = false,
        modeTextValueBoolCW = false, modeTextValueBoolCCW = false;

//sequences
let playerLoop, player = new Tone.Player(playerLoop);
let note, triggerTime;
let inputTime;

function noteInput(time, note){
    console.log(note);
}

let timeline = new Tone.Timeline();
//////////////////////////////////////////////////////////////////////////////////////////
let pattern = new Tone.Pattern((time, note)=>{
    //kick.triggerAttackRelease('C4', '4n');
}, [note, note, note, note]).start(0);

function currentPart(time, note){
   //synths.monoSynth.triggerAttackRelease(note, '4n', time);
}

let part = new Tone.Part(currentPart, [[0, 'E2'], ['0:5', 'G3'], ['0:3:2', ' B2']]).start(0);



////////////////////////////////////////////////////////////////////////////////////////////////// sampler ui clas
export default class Sampler extends Phaser.Scene{
    constructor(){
        super({key: 'SamplerUI', physics: {default: 'matter'}});
        
    }
    init() {  
        //text preload
                this.add.text(0, 0, '', { font: "1px Digitizer", fill: ''}).setAlpha(0);
                this.add.text(0, 0, '', { font: "1px Bangers", fill: ''}).setAlpha(0);
            }
    preload(){
       //sampler ui
        this.load.scenePlugin({
                key: 'rexuiplugin',
                url: 'js/plugins/slider.js',
                sceneKey: 'rexUI'
            });
             this.load.image('track', track);
             this.load.image('thumb', thumb);
             this.load.image('pause_play', pause_play);
		     this.load.image('stop', stop);
		     this.load.image('record', record);
             this.load.image('sampler_ui_no_btn', sampler_no_btn);
             this.load.image('sampler_ui_knob_primary', sampler_ui_knob1);
             this.load.image('sampler_ui_knob_secondary', sampler_ui_knob2);
             this.load.image('sampler_ui_pad', sampler_ui_pad);
             this.load.image('sampler_ui_xy', sampler_ui_xy);
             this.load.image('sampler_ui_btn_primary', sampler_ui_btn_primary);
             this.load.image('sampler_ui_btn_secondary', sampler_ui_btn_secondary);
             this.load.image('sampler_ui_arrow', sampler_ui_arrow);
             this.load.audio('click_snd', _clickSnd);   

    }
    create(){
        
             let clickSnd = this.sound.add('click_snd');

            // //active pointers
            //     this.input.addPointer(2);
            //     this.pointer = this.input.activePointer;

            //time transport
                    // Tone.Transport.bpm.value = 130;
                    // let currentTime = Tone.Transport.getSecondsAtTime(timePosition),
                    //     keySigValueNum;
                    // //	this.input.on('pointerdown', ()=>{console.log( time, currentTime,timePosition, timeProgress);});
                    // console.log(Tone.Transport.ticks);

////////synths
            const monoSynth = new Tone.PolySynth({ polyphony : 6, detune : 0, volume : -2, voice : Tone.MonoSynth, oscillator : {type: 'sawtooth'}}).toMaster();
            const fmSynth = new Tone.PolySynth({ polyphony : 6, detune : 0, volume : -5, voice : Tone.FMSynth, oscillator : {type: 'sawtooth'}}).toMaster();
            this.synths = {
                monoSynth: monoSynth,
                fmSynth: fmSynth
            }
                //this.input.on('pointerdown', ()=> this.synths.monoSynth.triggerAttackRelease('C4', '4n'))
            // this.synths = {
            //         monoSynth : new Tone.PolySynth({ polyphony : 6, detune : 0, volume : -15, voice : Tone.MonoSynth, oscillator : {type: 'sawtooth'}}),
            //         duoSynth : new Tone.PolySynth({ polyphony : 6, detune : 0, volume : -10, voice : Tone.DuoSynth, oscillator : {type: 'sawtooth'}}),
            //         amSynth : new Tone.PolySynth({ polyphony : 6, detune : 0, volume : -5, voice : Tone.AMSynth, oscillator : {type: 'sawtooth'}}),
            //         fmSynth : new Tone.PolySynth({ polyphony : 6, detune : 0, volume : -5, voice : Tone.FMSynth, oscillator : {type: 'sawtooth'}})
            // } 
            // for (const i in this.synths) this.synths[i].toMaster();
            
            //default settings
                this.currentSynth = null//this.synths.fmSynth;
                this.currentOctave = '4';   
                this.currentKeySig = 'C';
                this.currentMode = 'CHROMATIC';
                this.currentSetting = 'KEY';


                 this.inputs = this.add.group({runChildUpdate: true});
                 this.anchorZone = this.add.zone(550, 930).setSize(50, 50).setOrigin(0);
//      ////////ui
//                 // this.baseRect = new Phaser.Geom.Rectangle(-1000, 800, 4000, 860);
//                 // this.graphics = this.add.graphics({fillStyle: {color: 0x000000}}).fillRectShape(this.baseRect).setAlpha(0.8);
                  this.samplerUi = this.add.image(this.anchorZone.x - 150, 900, 'sampler_ui_no_btn').setInteractive();
            // //zoom icon
            //     this.zoomBool = false;
            //     this.zoomIcon = this.add.sprite(this.anchorZone.x - 400, 720, 'zoom').setInteractive().on('pointerdown', ()=>{
            //         navigator.vibrate(20); clickSnd.play();
            //         this.zoomBool === false ? this.zoomBool = true : this.zoomBool = false;
            //         this.zoomBool === true ? this.cameras.main.setZoom(1.5).setOrigin(0.5, 0.75) : this.cameras.main.setZoom(1.2);
            //     });

    //default button states
                this.recordToggle = false; this.stopToggle = false; this.playToggle = false; 
                this.msToggle = true; this.dsToggle = false; this.amsToggle = false; this.fmsToggle = false; 
                this.keyToggle = true; this.modeToggle = false; this.bpmToggle = false;

            //btn1  changes modes (record, stop, pause/play)
                 this.recordBtn = this.inputs.get(this.anchorZone.x - 400, 850, 'sampler_ui_btn_primary').setInteractive()
                 .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.recordToggle === true ? this.recordToggle = false : this.recordToggle = true;
                   this.stopToggle = false; this.playToggle = false;
                   if (this.recordToggle === true)
                   {
                       Tone.Transport.start();
                       sequenceArray.start(0);
                       mainLoop.start(0);
                   }
                 });
                 this.recordIcon = this.add.image(this.anchorZone.x - 400, 850, 'record').setAngle(90).setScale(0.4);
                 this.stopBtn = this.inputs.get(this.anchorZone.x - 330, 850, 'sampler_ui_btn_primary').setInteractive()
                 .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.stopToggle === true ? this.stopToggle = false : this.stopToggle = true;
                     this.recordToggle = false; this.playToggle = false;
                     if (this.stopToggle === true)
                     {
                         Tone.Transport.stop(); mainLoop.stop(0);
                         counter = 0; this.secondaryBtn1Bool = false; this.secondaryBtn2Bool = false; this.secondaryBtn3Bool = false; this.secondaryBtn4Bool = true;
                     }
                     this.currentLoop = false;
                  });
                 this.stopIcon = this.add.image(this.anchorZone.x - 330, 850, 'stop').setAngle(90).setScale(0.4);
                 this.playPauseBtn = this.inputs.get(this.anchorZone.x - 260, 850, 'sampler_ui_btn_primary').setInteractive()
                 .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.playToggle === true ? this.playToggle = false : this.playToggle = true;
                    this.recordToggle = false;this.stopToggle = false;
                    if (this.playToggle === true)
                        {
                            Tone.Transport.start(0);
                            mainLoop.start(0); //part.start(0);
                        }
                        else{
                            Tone.Transport.stop(); //mainLoop.pause();
                            mainLoop.stop(0);
                        }
                        this.currentLoop === true ? this.currentLoop = false : this.currentLoop = true;
                 });
                 this.pausePlayIcon = this.add.image(this.anchorZone.x - 260, 850, 'pause_play').setScale(0.4);
                 
            //changes colors
                this.secondaryBtn1 = this.inputs.get(this.anchorZone.x - 170, 860, 'sampler_ui_btn_secondary').setInteractive();
				this.secondaryBtn2 = this.inputs.get(this.anchorZone.x - 90, 860, 'sampler_ui_btn_secondary').setInteractive();
				this.secondaryBtn3 = this.inputs.get(this.anchorZone.x - 10, 860, 'sampler_ui_btn_secondary').setInteractive();
				this.secondaryBtn4 =  this.inputs.get(this.anchorZone.x + 70, 860, 'sampler_ui_btn_secondary').setInteractive();
        //changes tones
                this.msBtn = this.inputs.create(this.anchorZone.x - 170, 860, 'sampler_ui_btn_secondary').setInteractive()
                .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.msToggle = true; 
                    this.dsToggle = false; 
                    this.amsToggle = false; 
                    this.fmsToggle = false;
                });
                this.msBtnTxt = this.add.text(this.anchorZone.x - 185, 855, `MONO`, {fontSize: '12px', fontFamily: 'Digitizer', fill: '#000000'});
                this.dsBtn = this.inputs.create(this.anchorZone.x - 90, 860, 'sampler_ui_btn_secondary').setInteractive()
                .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.dsToggle = true; 
                    this.msToggle = false; 
                    this.amsToggle = false; 
                    this.fmsToggle = false;
                });
                this.dsBtnTxt = this.add.text(this.anchorZone.x - 100, 855, `DUO`, {fontSize: '12px', fontFamily: 'Digitizer', fill: '#000000'});
                this.amBtn = this.inputs.create(this.anchorZone.x - 10, 860, 'sampler_ui_btn_secondary').setInteractive()
                .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.amsToggle = true; 
                    this.msToggle = false; 
                    this.dsToggle = false; 
                    this.fmsToggle = false;
                });
                this.amBtnTxt = this.add.text(this.anchorZone.x - 20, 855, `AM`, {fontSize: '12px', fontFamily: 'Digitizer', fill: '#000000'});
                this.fmBtn = this.inputs.create(this.anchorZone.x + 70, 860, 'sampler_ui_btn_secondary').setInteractive()
                .on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play();
                    this.fmsToggle = true; 
                    this.msToggle = false; 
                    this.dsToggle = false; 
                    this.amsToggle = false;
                });
                this.fmBtnTxt = this.add.text(this.anchorZone.x + 65, 855, `FM`, {fontSize: '12px',fontFamily: 'Digitizer', fill: '#000000'});

        //change options (key, mode, bpm)
                this.keyBtn = this.inputs.get(this.anchorZone.x - 260, 820, 'sampler_ui_btn_secondary').setInteractive().on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play(); this.currentSetting = 'KEY';
                    this.keyToggle = true; 
                    this.modeToggle = false; 
                    this.bpmToggle = false; 
                });
                this.keyBtnTxt = this.add.text(this.anchorZone.x - 270, 815, `KEY`, {fontSize: '10px',fontFamily: 'Digitizer', fill: '#000000'});
                this.modeBtn = this.inputs.get(this.anchorZone.x - 260, 800, 'sampler_ui_btn_secondary').setInteractive().on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play(); this.currentSetting = 'MODE';
                    this.modeToggle = true; 
                    this.keyToggle = false; 
                    this.bpmToggle = false; 
                });
                this.modeBtnTxt = this.add.text(this.anchorZone.x - 275, 795, `MODE`, {fontSize: '10px',fontFamily: 'Digitizer', fill: '#000000'});
                this.octaveBtn = this.inputs.get(this.anchorZone.x - 260, 780, 'sampler_ui_btn_secondary').setInteractive().on('pointerdown', ()=>{
                    navigator.vibrate(20); clickSnd.play(); this.currentSetting = 'OCTAVE';
                    this.bpmToggle = true; 
                    this.keyToggle = false; 
                    this.modeToggle = false; 
                });
                this.octaveBtnTxt = this.add.text(this.anchorZone.x - 280, 775, `OCTAVE`, {fontSize: '10px',fontFamily: 'Digitizer', fill: '#000000'});
            //current selection values
                this.incrementKey = 0; this.incrementMode = 0; this.incrementOctave = 4;

                this.currentLoop = false;
            //play tween (blinking)
                this.bpmBlinkTime = 60000 / Tone.Transport.bpm.value;
                    this.bpmBlinkingTween = this.tweens.add({
                        targets: this.primaryBtn3ToplayerTexture, alpha: 1, duration: this.bpmBlinkTime, repeat: -1, ease: 'Linear'
                    });

            //knob 1
                this.samplerUi_knob1_1 = this.inputs.get(this.anchorZone.x - 400, 790, 'sampler_ui_knob_primary').setInteractive();
                this.samplerUi_knob1_2 = this.inputs.get(this.anchorZone.x - 340, 790, 'sampler_ui_knob_primary').setInteractive();
            //knob2
                this.samplerUi_knob2_1 = this.inputs.get(this.anchorZone.x - 170, 810, 'sampler_ui_knob_secondary').setInteractive();
                this.samplerUi_knob2_2 = this.inputs.get(this.anchorZone.x - 90, 810, 'sampler_ui_knob_secondary').setInteractive();
                this.samplerUi_knob2_3 = this.inputs.get(this.anchorZone.x - 10, 810, 'sampler_ui_knob_secondary').setInteractive();
                this.samplerUi_knob2_4 = this.inputs.get(this.anchorZone.x + 70, 810, 'sampler_ui_knob_secondary').setInteractive();
            //detune slider
                // this.slider = this.rexUI.add.slider({
                //         x: this.anchorZone.x - 230, 
                //         y: 950,
                //         width: 20,
                //         height: 150,
                //         orientation: 'x',
                //         track: this.add.sprite(200, 250,'track').setInteractive(),
                //         thumb: this.add.sprite(200, 200, 'thumb').setInteractive(),
                //         valuechangeCallback: ()=>{
                //             navigator.vibrate(20); clickSnd.play();
                //          //   this.polySynth.detune.rampTo(-1200, 0.4);
                //         },
                //         input: 'drag'|'click'
                //     }).layout();
            //xy pad
                this.samplerUi_xy = this.inputs.get(this.anchorZone.x - 335, 970, 'sampler_ui_xy').setInteractive();
                ////high pass filter
                // this.highPassFilter = new Tone.Filter({
                //     type: 'highpass',
                //     Q: 12
                // }).toMaster();
                // this.values = [['C5'], ['E5'], ['G5'], ['B5'], ['C5']];
                // for (let i = 0; i < this.values.length; i++)
                // {
                //     let filterFreq = this.values[i];
                // //	this.highPassFilter.frequency.setValueAtTime(filterFreq, 0);
                //     console.log(filterFreq);
                // }
            //pads
                this.pad1 = this.inputs.get(this.anchorZone.x - 170, 920, 'sampler_ui_pad').setInteractive();
                this.pad2 = this.inputs.get(this.anchorZone.x - 90, 920, 'sampler_ui_pad').setInteractive();
                this.pad3 = this.inputs.get(this.anchorZone.x - 10, 920, 'sampler_ui_pad').setInteractive();
                this.pad4 = this.inputs.get(this.anchorZone.x + 70, 920, 'sampler_ui_pad').setInteractive();
                this.pad5 = this.inputs.get(this.anchorZone.x - 170, 1060, 'sampler_ui_pad').setInteractive();
                this.pad6 = this.inputs.get(this.anchorZone.x - 90, 990, 'sampler_ui_pad').setInteractive();
                this.pad7 = this.inputs.get(this.anchorZone.x - 10, 990, 'sampler_ui_pad').setInteractive();
                this.pad8 = this.inputs.get(this.anchorZone.x + 70, 990, 'sampler_ui_pad').setInteractive();
                this.pads = [this.pad1, this.pad2, this.pad3, this.pad4, this.pad5, this.pad6, this.pad7, this.pad8]; 
                this.notePressed = [];
            ////pad triggers
            this.timesPressed = 0; 
            
            this.padBools = {
                bool1 : false, bool2 : false, bool3 : false, bool4 : false, bool5 : false, bool6 : false, bool7 : false, bool8 : false
            }
            //pad string
            this.padString1 = ``; this.padString2 = ``;

    ////sampler ui text
            this.modeText = this.add.text(this.anchorZone.x - 405, 890, ``, {fontSize: '15px',fontFamily: 'Digitizer', fill: '#000000'});
            this.octaveTextValue = this.add.text(this.anchorZone.x - 380, 893, `4`, {fontSize: '10px',fontFamily: 'Digitizer', fill: '#000000'});
            this.add.text(this.anchorZone.x - 370, 890, `:`, {fontSize: '15px', fontFamily: 'Digitizer', fill: '#000000'});
            this.modeTextValue = this.add.text(this.anchorZone.x - 350, 890, `CHROMATIC`, {fontSize: '15px',fontFamily: 'Digitizer', fill: '#000000'});

        //arrows
        this.arrowUp = this.add.sprite(this.anchorZone.x - 210, 780, 'sampler_ui_arrow').setInteractive().on('pointerdown', ()=>{
            navigator.vibrate(20); clickSnd.play(); this.arrowUp.setTint(0xff0000);
            switch(this.currentSetting)
            {
                case 'KEY' : this.incrementKey++; console.log(this.incrementKey); break;
                case 'MODE' : this.incrementMode++; console.log(this.incrementMode); break;
                case 'OCTAVE' : this.incrementOctave++; console.log(this.incrementOctave);break;
            }
        }).on('pointerup', ()=> this.arrowUp.clearTint()).on('pointerout', ()=> this.arrowUp.clearTint());
        this.arrowDown = this.add.sprite(this.anchorZone.x - 210, 820, 'sampler_ui_arrow').setInteractive().on('pointerdown', ()=>{
            navigator.vibrate(20); clickSnd.play(); this.arrowDown.setTint(0xff0000);
            switch(this.currentSetting)
            {
                case 'KEY' : this.incrementKey--; break;
                case 'MODE' : this.incrementMode--; break;
                case 'OCTAVE' : this.incrementOctave--; break;
            }
        }).on('pointerup', ()=> this.arrowDown.clearTint()).on('pointerout', ()=> this.arrowDown.clearTint()).setFlipY(true);

            let sequenceArray = new Tone.Sequence((time, note)=>{
                //console.log(note);
                console.log(timeProgress, timePosition, time);
                //   if (this.msToggle === true) synths.monoSynthRes.triggerAttackRelease(note, '4n');
                //   if (this.dsToggle === true) synths.duoSynthRes.triggerAttackRelease(note, '4n');
                //   if (this.amsToggle === true) synths.monoSynthRes.triggerAttackRelease(note, '4n');
                //   if (this.fmsToggle === true) synths.duoSynthRes.triggerAttackRelease(note, '4n');
          }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], '4n');
           let mainLoop = new Tone.Loop(startCounter, '4n'); //start counter

    

/// time button is pressed
    this.buttonPressedTime = this.time.addEvent({ delay: 8000, repeat: -1});
    this.buttonPressedTime.paused = false;

//this.cameras.main.setZoom(2.5);


// ////////////////////////////////pad inputs
// //1
    this.pad1.on('pointerdown', ()=>{   
///add to sequence array
// if (this.recordToggle === true)
// {
    // if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'C' + this.currentOctave);
    // if (this.currentKeySig === 'Db') note = sequenceArray.add(counter, 'Db4' + this.currentOctave);
    // if (this.currentKeySig === 'D') note = sequenceArray.add(counter, 'D4' + this.currentOctave);
    // if (this.currentKeySig === 'E') note = sequenceArray.add(counter,'Eb4' + this.currentOctave);
    // if (this.currentKeySig === 'Eb') note = sequenceArray.add(counter, 'E4' + this.currentOctave);
    // if (this.currentKeySig === 'E') note = sequenceArray.add(counter, 'E4' + this.currentOctave);
    // if (this.currentKeySig === 'F') note = sequenceArray.add(counter, 'F4' + this.currentOctave);
    // if (this.currentKeySig === 'Gb') note = sequenceArray.add(counter, 'Gb4' + this.currentOctave);
    // if (this.currentKeySig === 'G') note = sequenceArray.add(counter, 'G4' + this.currentOctave);
    // if (this.currentKeySig === 'Ab') note = sequenceArray.add(counter, 'Ab4' + this.currentOctave);
    // if (this.currentKeySig === 'A') note = sequenceArray.add(counter, 'A4' + this.currentOctave);
    // if (this.currentKeySig === 'Bb') note = sequenceArray.add(counter, 'Bb4' + this.currentOctave);
    // if (this.currentKeySig === 'B') note = sequenceArray.add(counter, 'B4' + this.currentOctave);
//}
                switch (this.currentKeySig)
                {
                    case 'C' :  this.notePressed.push('C' + this.currentOctave); break;
                    case 'Db' : this.notePressed.push('Db' + this.currentOctave); break;
                    case 'D' :  this.notePressed.push('D' + this.currentOctave); break;
                    case 'Eb' : this.notePressed.push('Eb' + this.currentOctave); break;
                    case 'E' :  this.notePressed.push('E' + this.currentOctave); break;
                    case 'F' :  this.notePressed.push('F' + this.currentOctave); break;
                    case 'Gb' : this.notePressed.push('Gb' + this.currentOctave); break;
                    case 'G' :  this.notePressed.push('G' + this.currentOctave); break;
                    case 'Ab' : this.notePressed.push('Ab' + this.currentOctave); break;
                    case 'A' :  this.notePressed.push('A' + this.currentOctave); break;
                    case 'Bb' : this.notePressed.push('Bb' + this.currentOctave); break;
                    case 'B' :  this.notePressed.push('B' + this.currentOctave); break;
                }
});
//2
this.pad2.on('pointerdown', ()=>{ 
    // if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'D' + this.currentOctave);
    // if (this.currentKeySig === 'Db') note = sequenceArray.add(counter, 'Eb4' + this.currentOctave);
    // if (this.currentKeySig === 'D') note = sequenceArray.add(counter, 'E4' + this.currentOctave);
    // if (this.currentKeySig === 'E') note = sequenceArray.add(counter,'G#4' + this.currentOctave);
    // if (this.currentKeySig === 'Eb') note = sequenceArray.add(counter, 'Gb4' + this.currentOctave);
    // if (this.currentKeySig === 'E') note = sequenceArray.add(counter, 'E4' + this.currentOctave);
    // if (this.currentKeySig === 'F') note = sequenceArray.add(counter, 'F4' + this.currentOctave);
    // if (this.currentKeySig === 'Gb') note = sequenceArray.add(counter, 'Gb4' + this.currentOctave);
    // if (this.currentKeySig === 'G') note = sequenceArray.add(counter, 'G4' + this.currentOctave);
    // if (this.currentKeySig === 'Ab') note = sequenceArray.add(counter, 'Ab4' + this.currentOctave);
    // if (this.currentKeySig === 'A') note = sequenceArray.add(counter, 'A4' + this.currentOctave);
    // if (this.currentKeySig === 'Bb') note = sequenceArray.add(counter, 'Bb4' + this.currentOctave);
    // if (this.currentKeySig === 'B') note = sequenceArray.add(counter, 'B4' + this.currentOctave);
            switch(this.currentKeySig)
            {
                case 'C' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('Db' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Db' + this.currentOctave) : this.notePressed.push('D' + this.currentOctave); break;
                case 'Db' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Db' + this.currentOctave) : this.notePressed.push('D' + this.currentOctave); break;
                case 'D' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('Eb' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Eb' + this.currentOctave) : this.notePressed.push('E' + this.currentOctave); break;
                case 'Eb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('E' + this.currentOctave) : this.notePressed.push('F' + this.currentOctave); break;
                case 'E' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('F' + this.currentOctave) : this.notePressed.push('Gb' + this.currentOctave); break;
                case 'F' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F#' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Gb' + this.currentOctave) : this.notePressed.push('G' + this.currentOctave); break;
                case 'Gb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('G' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('G' + this.currentOctave) : this.notePressed.push('Ab' + this.currentOctave); break;
                case 'G' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('G#' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Ab' + this.currentOctave) : this.notePressed.push('A' + this.currentOctave); break;
                case 'Ab' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('A' + this.currentOctave); 
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('A' + this.currentOctave) : this.notePressed.push('Bb' + this.currentOctave); break;
                case 'A' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('A#' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Bb' + this.currentOctave) : this.notePressed.push('B' + this.currentOctave); break;
                case 'Bb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('B' + this.currentOctave);
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('B' + this.currentOctave) : this.notePressed.push('C' + this.currentOctave); break;
                case 'B' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('B#' + this.currentOctave); 
                            else this.currentMode === 'PHRYGIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('C' + this.currentOctave) : this.notePressed.push('C#' + this.currentOctave); break;
            }
});
//3
this.pad3.on('pointerdown', ()=>{ 
    //if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'E' + this.currentOctave);
            switch(this.currentKeySig)
                {
                case 'C' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('D' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('E' + this.currentOctave) : this.notePressed.push('Eb' + this.currentOctave); break;
                case 'Db' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('D#' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('F' + this.currentOctave) : this.notePressed.push('E' + this.currentOctave); break;
                case 'D' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('E#' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('F#' + this.currentOctave) : this.notePressed.push('F' + this.currentOctave); break;
                case 'Eb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('F' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('G' + this.currentOctave) : this.notePressed.push('Gb' + this.currentOctave); break;
                case 'E' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F#' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('G#' + this.currentOctave) : this.notePressed.push('G' + this.currentOctave); break;
                case 'F' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('G' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('A' + this.currentOctave) : this.notePressed.push('Ab' + this.currentOctave); break;
                case 'Gb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('Ab' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('Bb' + this.currentOctave) : this.notePressed.push('A' + this.currentOctave); break;
                case 'G' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('A' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('B' + this.currentOctave) : this.notePressed.push('Bb' + this.currentOctave); break;
                case 'Ab' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('Bb' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('C' + this.currentOctave * 1.25) : this.notePressed.push('B' + this.currentOctave * 1.25); break;
                case 'A' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('B' + this.currentOctave);
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('C#' + this.currentOctave * 1.25) : this.notePressed.push('C' + this.currentOctave * 1.25); break;
                case 'Bb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('C' + this.currentOctave); 
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('D' + this.currentOctave * 1.25) : this.notePressed.push('Db' + this.currentOctave * 1.25); break;
                case 'B' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('C#' + this.currentOctave); 
                            else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' || this.currentMode === 'MIXOLYDIAN' ? this.notePressed.push('D#' + this.currentOctave * 1.25) : this.notePressed.push('D' + this.currentOctave * 1.25); break;
            }
 });
//4
this.pad4.on('pointerdown', ()=>{ 
   // if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'F' + this.currentOctave);
            switch (this.currentKeySig)
            {
                case 'C' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('Eb' + this.currentOctave);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('F#' + this.currentOctave) : this.notePressed.push('F' + this.currentOctave); break;
                case 'Db' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave); 
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('G' + this.currentOctave) : this.notePressed.push('Gb' + this.currentOctave); break;
                case 'D' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F' + this.currentOctave);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('G#' + this.currentOctave) : this.notePressed.push('G' + this.currentOctave); break;
                case 'Eb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('Gb' + this.currentOctave); 
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('A' + this.currentOctave) : this.notePressed.push('Ab' + this.currentOctave); break;
                case 'E' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('G' + this.currentOctave);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('A#' + this.currentOctave) : this.notePressed.push('A' + this.currentOctave);  break;
                case 'F' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('Ab' + this.currentOctave);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('B' + this.currentOctave)  : this.notePressed.push('Bb' + this.currentOctave); break;
                case 'Gb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('A' + this.currentOctave); 
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('C' + this.currentOctave * 1.25) : this.notePressed.push('Cb' + this.currentOctave * 1.25); break;
                case 'G' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('Bb' + this.currentOctave * 1.25);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('C#' + this.currentOctave * 1.25) : this.notePressed.push('C' + this.currentOctave * 1.25); break;
                case 'Ab' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('B' + this.currentOctave * 1.25);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('D' + this.currentOctave * 1.25) : this.notePressed.push('Db' + this.currentOctave * 1.25); break;
                case 'A' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('C' + this.currentOctave * 1.25);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('D#' + this.currentOctave * 1.25) : this.notePressed.push('D' + this.currentOctave * 1.25); break;
                case 'Bb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('C#' + this.currentOctave * 1.25);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('E' + this.currentOctave * 1.25) : this.notePressed.push('Eb' + this.currentOctave * 1.25); break;
                case 'B' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('D' + this.currentOctave * 1.25);
                            else this.currentMode === 'LYDIAN' ? this.notePressed.push('F' + this.currentOctave * 1.25) : this.notePressed.push('E' + this.currentOctave * 1.25); break;
            }
}); 
//5
 this.pad5.on('pointerdown', ()=>{ 
 //if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'G' + this.currentOctave);
            switch(this.currentKeySig)
            {
                case 'C' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('Gb' + this.currentOctave) : this.notePressed.push('G' + this.currentOctave); break;
                case 'Db' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('G' + this.currentOctave);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('G' + this.currentOctave) : this.notePressed.push('Ab' + this.currentOctave); break;
                case 'D' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('G#' + this.currentOctave);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('Ab' + this.currentOctave) : this.notePressed.push('A' + this.currentOctave); break;
                case 'Eb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('A' + this.currentOctave);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('A' + this.currentOctave) : this.notePressed.push('Bb' + this.currentOctave); break;
                case 'E' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('A#' + this.currentOctave);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('Bb' + this.currentOctave) : this.notePressed.push('B' + this.currentOctave); break;
                case 'F' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('B' + this.currentOctave);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('B' + this.currentOctave * 1.25) : this.notePressed.push('C' + this.currentOctave * 1.25);  break;
                case 'Gb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('C' + this.currentOctave * 1.25);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('C' + this.currentOctave * 1.25) : this.notePressed.push('Db' + this.currentOctave * 1.25); break;
                case 'G' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('C#' + this.currentOctave * 1.25);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('Db' + this.currentOctave * 1.25) : this.notePressed.push('D' + this.currentOctave * 1.25); break;
                case 'Ab' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('D' + this.currentOctave * 1.25);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('D' + this.currentOctave * 1.25) : this.notePressed.push('Eb' + this.currentOctave * 1.25); break;
                case 'A' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('D#' + this.currentOctave * 1.25);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('Eb' + this.currentOctave * 1.25) : this.notePressed.push('E' + this.currentOctave * 1.25); break;
                case 'Bb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave * 1.25);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('E' + this.currentOctave * 1.25) : this.notePressed.push('F' + this.currentOctave * 1.25); break; 
                case 'B' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F' + this.currentOctave * 1.25);
                            else this.currentMode === 'LOCRIAN' ? this.notePressed.push('F' + this.currentOctave * 1.25) : this.notePressed.push('F#' + this.currentOctave * 1.25); break;
            }                                                                                              
});
//6
this.pad6.on('pointerdown', ()=>{
//if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'A' + this.currentOctave);
        switch (this.currentKeySig)
        {
            case 'C' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F' + this.currentOctave);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Ab' + this.currentOctave) : this.notePressed.push('A' + this.currentOctave); break;
            case 'Db' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('Gb' + this.currentOctave);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('A' + this.currentOctave) : this.notePressed.push('Bb' + this.currentOctave); break;
            case 'D' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('G' + this.currentOctave);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Bb' + this.currentOctave) : this.notePressed.push('B' + this.currentOctave); break;
            case 'Eb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('Ab' + this.currentOctave); 
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('B' + this.currentOctave * 1.25) : this.notePressed.push('C' + this.currentOctave * 1.25); break;
            case 'E' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('A' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('C#' + this.currentOctave * 1.25) : this.notePressed.push('C' + this.currentOctave * 1.25); break;
            case 'F' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('Bb' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Db' + this.currentOctave * 1.25) : this.notePressed.push('D' + this.currentOctave * 1.25); break;
            case 'Gb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('B' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('D' + this.currentOctave * 1.25) : this.notePressed.push('Eb' + this.currentOctave * 1.25); break;
            case 'G' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('C' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Eb' + this.currentOctave * 1.25) : this.notePressed.push('E' + this.currentOctave * 1.25);  break;
            case 'Ab' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('C#' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('E' + this.currentOctave * 1.25) : this.notePressed.push('F' + this.currentOctave * 1.25);  break;
            case 'A' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('D' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('F' + this.currentOctave * 1.25) : this.notePressed.push('F#' + this.currentOctave * 1.25); break;
            case 'Bb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('D#' + this.currentOctave * 1.25); 
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('Gb' + this.currentOctave * 1.25) : this.notePressed.push('G' + this.currentOctave * 1.25); break;
            case 'B' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave * 1.25);
                        else this.currentMode === 'PHRYGIAN' || this.currentMode === 'AEOLIAN' || this.currentMode === 'LOCRIAN' ? this.notePressed.push('G' + this.currentOctave * 1.25) : this.notePressed.push('Ab' + this.currentOctave * 1.25); break;
        }
});                                                 
//7
this.pad7.on('pointerdown', ()=>{
  //  if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'B' + this.currentOctave);
        switch (this.currentKeySig)
        {
        case 'C' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F#' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('B' + this.currentOctave * 1.25) : this.notePressed.push('Bb' + this.currentOctave * 1.25); break;
        case 'Db' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('G' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('C' + this.currentOctave * 1.25) : this.notePressed.push('B' + this.currentOctave * 1.25); break;
        case 'D'  : if (this.currentMode === 'CHROMATIC') this.notePressed.push('G#' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('C#' + this.currentOctave * 1.25) : this.notePressed.push('B' + this.currentOctave * 1.25); break;
        case 'Eb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('A' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('D' + this.currentOctave * 1.25) : this.notePressed.push('Db' + this.currentOctave * 1.25); break;
        case 'E' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('A#' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('Eb' + this.currentOctave * 1.25) : this.notePressed.push('D' + this.currentOctave * 1.25); break;
        case 'F' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('B' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('E' + this.currentOctave * 1.25) : this.notePressed.push('Eb' + this.currentOctave * 1.25); break;
        case 'Gb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('C' + this.currentOctave * 1.25); 
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('F' + this.currentOctave * 1.25) : this.notePressed.push('E' + this.currentOctave * 1.25); break;
        case 'G' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('C#' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('Gb' + this.currentOctave * 1.25) : this.notePressed.push('F' + this.currentOctave * 1.25); break;
        case 'Ab' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('D' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('G' + this.currentOctave * 1.25) : this.notePressed.push('Gb' + this.currentOctave * 1.25); break;
        case 'A' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('D#' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('Ab' + this.currentOctave * 1.25) : this.notePressed.push('G' + this.currentOctave * 1.25); break;
        case 'Bb' : if (this.currentMode === 'CHROMATIC') this.notePressed.push('E' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('A' + this.currentOctave * 1.25) : this.notePressed.push('Ab' + this.currentOctave * 1.25); break;
        case 'B' :  if (this.currentMode === 'CHROMATIC') this.notePressed.push('F' + this.currentOctave * 1.25);
                    else this.currentMode === 'IONIAN' || this.currentMode === 'LYDIAN' ? this.notePressed.push('Bb' + this.currentOctave * 1.25) : this.notePressed.push('A' + this.currentOctave * 1.25); break;
        }
});
//8(octave)
this.pad8.on('pointerdown', ()=>{
   // if (this.currentKeySig === 'C') note = sequenceArray.add(counter, 'C' + this.currentOctave * 1.25);
            switch (this.currentKeySig)
            {
                case 'C' : this.notePressed.push('G' + this.currentOctave * 1.25); break;
                case 'Db' : this.notePressed.push('Ab' + this.currentOctave * 1.25); break;
                case 'D' : this.notePressed.push('A' + this.currentOctave * 1.25); break;
                case 'Eb' : this.notePressed.push('Bb' + this.currentOctave * 1.25); break;
                case 'E' : this.notePressed.push('B' + this.currentOctave * 1.25); break;
                case 'F' : this.notePressed.push('C' + this.currentOctave * 1.25); break;
                case 'Gb' : this.notePressed.push('Db' + this.currentOctave * 1.25); break;
                case 'G' : this.notePressed.push('D' + this.currentOctave * 1.25); break;
                case 'Ab' : this.notePressed.push('Eb' + this.currentOctave * 1.25); break;
                case 'A' : this.notePressed.push('E' + this.currentOctave * 1.25); break;
                case 'Bb' : this.notePressed.push('F' + this.currentOctave * 1.25); break;
                case 'B' : this.notePressed.push('F#' + this.currentOctave * 1.25); break;
            }
    });
///pads
    this.pads.filter(pad => pad.on('pointerdown', ()=>{
        navigator.vibrate(20); pad.setTint(0xff0000);
       this.currentSynth.triggerAttackRelease(this.notePressed, '4n');
       // note = sequenceArray.add(counter, this.notePressed + this.currentOctave);
    }).on('pointerup', ()=>{
        pad.clearTint();
        this.notePressed.pop();
    }).on('pointerout', ()=>{
        pad.clearTint();
        this.notePressed.pop();
    }));
    //synths.polySynth.triggerAttack(['C5', 'E5', 'A5']).detune.rampTo(-1200, 0.4);

}///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    update(){
            //this.scale.orientation !== 'landscape-primary' && this.scale.orientation !== 'landscape-secondary' ? this.cameras.main.setZoom(scaleRatio).centerOn(400, 700) : this.cameras.main.setZoom(scaleRatio * 1.2).centerOn(this.samplerUi.x, this.samplerUi.y /* - 40 */);
            this.cameras.main.centerOn(this.samplerUi.x, this.samplerUi.y /* - 40 */);
       
    //change button colors
            this.recordToggle === true ? this.recordBtn.setTint(0xff0000) : this.recordBtn.clearTint();
            this.stopToggle === true ? this.stopBtn.setTint(0xff0000) : this.stopBtn.clearTint();
            this.playToggle === true ? this.playPauseBtn.setTint(0xff0000) : this.playPauseBtn.clearTint();
            //
            this.keyToggle === true ? this.keyBtn.setTint(0xff0000) : this.keyBtn.clearTint();
            this.modeToggle === true ? this.modeBtn.setTint(0xff0000) : this.modeBtn.clearTint();
            this.bpmToggle === true ? this.octaveBtn.setTint(0xff0000) : this.octaveBtn.clearTint();
             
    //change synth setting
          if (this.msToggle === true)
          {
                this.currentSynth = this.synths.monoSynth;
                this.msBtn.setAlpha(0.3); this.secondaryBtn1.setTint(0xff0000);
                this.secondaryBtn2.clearTint(); this.secondaryBtn3.clearTint(); this.secondaryBtn4.clearTint();
                this.dsBtn.setAlpha(1); this.amBtn.setAlpha(1); this.fmBtn.setAlpha(1);
           }
            if (this.dsToggle === true)
            {
                //this.currentSynth = this.synths.duoSynth;   
                this.dsBtn.setAlpha(0.3); this.secondaryBtn2.setTint(0xff0000);
                this.secondaryBtn1.clearTint(); this.secondaryBtn3.clearTint(); this.secondaryBtn4.clearTint();
                this.msBtn.setAlpha(1); this.amBtn.setAlpha(1); this.fmBtn.setAlpha(1);
            }
            if (this.amsToggle === true)
            {
                //this.currentSynth = this.synths.amSynth;
                this.amBtn.setAlpha(0.3); this.secondaryBtn3.setTint(0xff0000);
                this.secondaryBtn2.clearTint(); this.secondaryBtn1.clearTint(); this.secondaryBtn4.clearTint();
                this.dsBtn.setAlpha(1); this.msBtn.setAlpha(1); this.fmBtn.setAlpha(1);
            }
            if (this.fmsToggle === true)
            {
                this.currentSynth = this.synths.fmSynth;
                this.fmBtn.setAlpha(0.3); this.secondaryBtn4.setTint(0xff0000);
                this.secondaryBtn2.clearTint(); this.secondaryBtn3.clearTint(); this.secondaryBtn1.clearTint();
                this.dsBtn.setAlpha(1); this.amBtn.setAlpha(1); this.msBtn.setAlpha(1);
            }
        //reset value of current setting
            if (this.incrementKey === 13) this.incrementKey--;
            if (this.incrementMode === 8) this.incrementMode--;
            if (this.incrementKey <= 0) this.incrementKey++;
            if (this.incrementMode <= 0) this.incrementMode++;
            if (this.incrementOctave >= 9) this.incrementOctave--;
            if (this.incrementOctave <= 0) this.incrementOctave++;

    //set sampler text on screen for current mode
        //key
                if (this.currentSetting === 'KEY')
                {
                    switch(this.incrementKey)
                    {
                        case 1 : this.currentKeySig = 'C'; this.modeText.setText('C'); break;
                        case 2 : this.currentKeySig = 'Db'; this.modeText.setText('Db'); break;
                        case 3 : this.currentKeySig = 'D'; this.modeText.setText('D'); break;
                        case 4 : this.currentKeySig = 'Eb'; this.modeText.setText('Eb'); break;
                        case 5 : this.currentKeySig = 'E'; this.modeText.setText('E'); break;
                        case 6 : this.currentKeySig = 'F'; this.modeText.setText('F'); break;
                        case 7 : this.currentKeySig = 'Gb'; this.modeText.setText('Gb'); break;
                        case 8 : this.currentKeySig = 'G'; this.modeText.setText('G'); break;
                        case 9 : this.currentKeySig = 'Ab'; this.modeText.setText('Ab'); break;
                        case 10 : this.currentKeySig = 'A'; this.modeText.setText('A'); break;
                        case 11 : this.currentKeySig = 'Bb';this.modeText.setText('Bb'); break;
                        case 12 : this.currentKeySig = 'B'; this.modeText.setText('B'); break;
                    }
                }
        //mode
            if (this.currentSetting === 'MODE')   
            {
                switch(this.incrementMode)
                {
                    case 1 : this.currentMode = 'CHROMATIC'; this.modeTextValue.setText('CHROMATIC'); break;
                    case 2 : this.currentMode = 'IONIAN'; this.modeTextValue.setText('IONIAN'); break;
                    case 3 : this.currentMode = 'DORIAN'; this.modeTextValue.setText('DORIAN'); break;
                    case 4 : this.currentMode = 'PHRYGIAN'; this.modeTextValue.setText('PHRYGIAN'); break;
                    case 5 : this.currentMode = 'LYDIAN'; this.modeTextValue.setText('LYDIAN'); break;
                    case 6 : this.currentMode = 'MIXOLYDIAN'; this.modeTextValue.setText('MIXOLYDIAN'); break;
                    case 7 : this.currentMode = 'AEOLIAN'; this.modeTextValue.setText('AEOLIAN'); break;
                    case 8 : this.currentMode = 'LOCRIAN'; this.modeTextValue.setText('LOCRIAN'); break;
                }
            }
        //bpm
            if (this.currentSetting === 'OCTAVE') 
            {
                switch(this.incrementOctave)
                {
                    case 1 :  this.currentOctave = '1'; this.octaveTextValue.setText('1'); break;
                    case 2 :  this.currentOctave = '2'; this.octaveTextValue.setText('2'); break;
                    case 3 :  this.currentOctave = '3'; this.octaveTextValue.setText('3'); break;
                    case 4 :  this.currentOctave = '4'; this.octaveTextValue.setText('4'); break;
                    case 5 :  this.currentOctave = '5'; this.octaveTextValue.setText('5'); break;
                    case 6 :  this.currentOctave = '6'; this.octaveTextValue.setText('6'); break;
                    case 7 :  this.currentOctave = '7'; this.octaveTextValue.setText('7'); break;
                    case 8 :  this.currentOctave = '8'; this.octaveTextValue.setText('8'); break;
                }
           }



        //    this.timeTxt.setText(timePosition).setDepth(4);

        //     // menu screen led emulator
        //         if (menu_bpm === true)
        //         {
        //             this.bpmText.setVisible(true);
        //             this.bpmTextValue.setVisible(true);
        //             this.modeTextValue.setVisible(false);
        //             this.modeTextValueValue.setVisible(false);
        //             this.keyText.setVisible(false);
        //             this.keyTextValue.setVisible(false);
        //         }
        //         if (menu_mode === true)
        //         {
        //             this.bpmText.setVisible(false);
        //             this.bpmTextValue.setVisible(false);
        //              this.modeTextValue.setVisible(true);
        //              this.modeTextValueValue.setVisible(true);
        //              this.keyText.setVisible(false);
        //              this.keyTextValue.setVisible(false);
        //         }
        //         if (menu_key === true)
        //         {
        //             this.bpmText.setVisible(false);
        //             this.bpmTextValue.setVisible(false);
        //             this.modeTextValue.setVisible(false);
        //             this.modeTextValueValue.setVisible(false);
        //             this.keyText.setVisible(true);
        //             this.keyTextValue.setVisible(true);
        //         }


               //this.modeTextValueValue.setText(this.currentMode);

        ////bpm update
                //this.bpmTextValue.setText(Math.floor(Tone.Transport.bpm.value));
        ////update bpm blinker
                // this.bpmBlinkTime;
                // this.bpmBlinkingTween;
                // if (this.recordToggle === true || this.stopToggle === true) this.primaryBtn3TopLayer.setVisible(false);
                // else this.primaryBtn3TopLayer.setVisible(true);

        //change sounds

        //primary button toggle record, stop, pause/play
                    // this.recordToggle === true ? this.primaryBtn1.setTint(0xff0000) : this.primaryBtn1.clearTint();
                    // this.stopToggle === true ? this.primaryBtn2.setTint(0xff0000) : this.primaryBtn2.clearTint();
                    // this.playToggle === true ? this.primaryBtn3.setTint(0xff0000) : this.primaryBtn3.clearTint();

    
        //color sequence
                if (counter === 16) {counter = 0; this.secondaryBtn1Bool = true; }
                else if (counter === 12) {this.secondaryBtn4Bool = true; this.secondaryBtn3Bool = false;}
                else if (counter === 8) {this.secondaryBtn3Bool = true; this.secondaryBtn2Bool = false;}
                else if (counter === 4) {this.secondaryBtn2Bool = true; this.secondaryBtn1Bool = false;}
                else if (counter === 1) this.secondaryBtn1Bool = true;
                if (counter === 0) this.secondaryBtn1Bool = true;
    }//update
}
///////////

//volume potentiometer
// var createPotentiometer = function (scene, x, y, radius) {
//     var config = { x: x, y: y, maxRadius: radius, minRadius: radius - 100 };
//     var lineWidth = 3;
//     var x = config.maxRadius + lineWidth, y = x, width = x * 2, height = width;
//     var buttonGraphics = scene.add.graphics().lineStyle(lineWidth, 0xffffff, 1).strokeCircle(x, y, config.minRadius + lineWidth).strokeCircle(x, y, config.maxRadius).lineBetween(x + config.minRadius, y, x + config.maxRadius, y);
//      var button = scene.add.renderTexture(config.x, config.y, width, height).draw(buttonGraphics).setOrigin(0.5) .setTint(0xff0000);
//       buttonGraphics.destroy();
//       scene.plugins.get('rexdragrotateplugin').add(scene, config).on('drag', function (dragRotate) {
// 		//   button.rotation += dragRotate.deltaRotation;
// 		    primaryKnob2.rotation += dragRotate.deltaRotation;
//            var color = (dragRotate.cw) ? 0xff0000 : 0xffff00; primaryKnob2.setTint(color);
//          }).on('dragend', ()=>{
// 			primaryKnob2.clearTint();
//          });
//               return button;
//     }

//menu parameter potentiometer
// var menuParameterPotentiometer = function (scene, x, y, radius) {
// this.config = {
//   x: x, y: y, maxRadius: radius, minRadius: radius - 100
// };
// var lineWidth = 3;
// var x = config.maxRadius + lineWidth, y = x, width = x * 2, height = width;
// var buttonGraphics = scene.add.graphics().lineStyle(lineWidth, 0xffffff, 1).strokeCircle(x, y, config.minRadius + lineWidth).strokeCircle(x, y, config.maxRadius);
// var potentiometerLine = buttonGraphics.lineBetween(x + config.minRadius, y, x + config.maxRadius, y);
// var button = scene.add.renderTexture(config.x, config.y, width, height).draw(buttonGraphics).setOrigin(0.5) .setTint(0xff0000);
// buttonGraphics.destroy();
// scene.plugins.get('rexdragrotateplugin').add(scene, this.config).on('drag', function (dragRotate) {
//   this.value = Tone.Transport.bpm.value;
//     this.tint = (dragRotate.cw) ? 0xff0000 : 0xffff00; primaryKnob2.setTint(this.tint);
//    if (dragRotate.cw === true )
//    {
//        primaryKnob2.rotation += dragRotate.deltaRotation / 2;
//        if (primaryKnob2.angle <= 90)
//        {
//           primaryKnob2.rotation += 0;
//        }
//       //bpm
//            if (menu_bpm === true)
//            {
//               Tone.Transport.bpm.rampTo(this.value + 1, 0.1);
//               if (Tone.Transport.bpm.value >= 200) Tone.Transport.bpm.value = 0;
//            }
//        //key sig
//           if (menu_key === true)
//           {
//               keySigBoolCW = true;
//               keySigBoolCCW = false;
//           }
//        //mode
//           if (menu_mode === true)
//           {
//               modeTextValueBoolCW = true;
//               modeTextValueBoolCCW = false;
//           }
//     }
//    else{
//           primaryKnob2.rotation += dragRotate.deltaRotation / 2;
//       //bpm
//           if (menu_bpm === true)
//           {
//           Tone.Transport.bpm.rampTo(this.value - 1, 0.1);
//           if (Tone.Transport.bpm.value <= 0) Tone.Transport.bpm.value = 200;
//           }
//       //key sig
//           if (menu_key === true)
//           {
//               keySigBoolCCW = true;
//               keySigBoolCW = false;
//           }
//       //mode
//           if (menu_mode === true)
//           {
//               modeTextValueBoolCW = false;
//               modeTextValueBoolCCW = true;
//           }
//     }
//    }).on('dragend', ()=>{
//       primaryKnob2.clearTint();
//       if (menu_key === true)
//       {
//           keySigBoolCW = false;
//           keySigBoolCCW = false;
//       }
//       if (menu_key === true)
//       {
//           keySigBoolCCW = false;
//           keySigBoolCW = false;
//       }
//       if (menu_mode === true)
//       {
//           modeTextValueBoolCW = false;
//           modeTextValueBoolCCW = false;
//       }
//    });
// }
////////////////////////////////////////////////////////


////main transport loop
var startCounter = function(time){
  time = Tone.Transport.time;
      counter % 16;  counter++;
      console.log(counter);
}