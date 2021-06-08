import Tone from '../../libs/Tone.js';
import { SAMPLER } from './ui.js';

export const initInputs = function()
{
    const Inputs = {   
        ////buttons
            buttons: {
            //playback buttons
                recordBtn : document.getElementById('record-btn-on'),
                stopBtn : document.getElementById('stop-btn-on'),
                playBtn : document.getElementById('play-btn-on'),
            //mode buttons
                octaveBtn : document.getElementById('octave-btn-on'),
                modeBtn : document.getElementById('mode-btn-on'),
                keyBtn : document.getElementById('key-btn-on'),
            //synth buttons
                fmBtn : document.getElementById('fm-btn-on'),
                amBtn : document.getElementById('am-btn-on'),
                duoBtn : document.getElementById('duo-btn-on'),
                monoBtn : document.getElementById('mono-btn-on')
            },
        ////arrows
            arrows: {
                arrowUp : document.getElementById('arrow-up-on'),
                arrowDown : document.getElementById('arrow-down-on')
            },
        ////pads
            pads: {
                pad1 : document.getElementById('pad-1-on'),
                pad2 : document.getElementById('pad-2-on'),
                pad3 : document.getElementById('pad-3-on'),
                pad4 : document.getElementById('pad-4-on'),
                pad5 : document.getElementById('pad-5-on'),
                pad6 : document.getElementById('pad-6-on'),
                pad7 : document.getElementById('pad-7-on'),
                pad8 : document.getElementById('pad-8-on')
            },
        ////sliders
            sliders : {
                slider1 : document.getElementById('thumb-1'),
                slider2 : document.getElementById('thumb-2'), 
            },
        ////knobs
            knobs: {
                primaryKnob1: document.getElementById('primary-knob-1-on'),
                primaryKnob2: document.getElementById('primary-knob-2-on'),
                secondaryKnob1: document.getElementById('secondary-knob-1-on'),
                secondaryKnob2: document.getElementById('secondary-knob-2-on'),
                secondaryKnob3: document.getElementById('secondary-knob-3-on'),
                secondaryKnob4: document.getElementById('secondary-knob-4-on'),
                dials: {
                    dial1: document.getElementById('primary-knob-1-dial'),
                    dial2: document.getElementById('primary-knob-2-dial'),
                    dial3: document.getElementById('secondary-knob-1-dial'),
                    dial4: document.getElementById('secondary-knob-2-dial'),
                    dial5: document.getElementById('secondary-knob-3-dial'),
                    dial6: document.getElementById('secondary-knob-4-dial')
                }
            },
            props: {center: null,
                onDown : false,
                transformAttribute: '',
                rotation: 0,
                currDial: {}
            },
    ////methods
            init : function(){
        //arrays 
          const pads = [
                    Inputs.pads.pad1, Inputs.pads.pad2, Inputs.pads.pad3, Inputs.pads.pad4, 
                    Inputs.pads.pad5, Inputs.pads.pad6, Inputs.pads.pad7, Inputs.pads.pad8
                ],
                arrows = [
                    Inputs.arrows.arrowUp, Inputs.arrows.arrowDown
                ],
                buttons = [
                    Inputs.buttons.recordBtn, Inputs.buttons.stopBtn, Inputs.buttons.playBtn, 
                    Inputs.buttons.octaveBtn, Inputs.buttons.modeBtn, Inputs.buttons.keyBtn, 
                    Inputs.buttons.fmBtn, Inputs.buttons.amBtn, Inputs.buttons.duoBtn, Inputs.buttons.monoBtn
                ],
                sliders = [
                    Inputs.sliders.slider1, Inputs.sliders.slider2
                ],
                knobs = [
                    Inputs.knobs.primaryKnob1, Inputs.knobs.primaryKnob2,
                    Inputs.knobs.secondaryKnob1, Inputs.knobs.secondaryKnob2,
                    Inputs.knobs.secondaryKnob3, Inputs.knobs.secondaryKnob4,
                    Inputs.knobs.dials.dial1, Inputs.knobs.dials.dial2,
                    Inputs.knobs.dials.dial3, Inputs.knobs.dials.dial4,
                    Inputs.knobs.dials.dial5, Inputs.knobs.dials.dial6
                ],
                triggers = [
                    'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout', 
                    'keydown', 'keyup', 'touchstart', 'touchmove', 'touchend', 'drag'
                ];
                //////default button opacity
                pads.forEach(e => e.style.opacity = 0); 
                buttons.forEach(e => e.style.opacity = 0); 
                arrows.forEach(e => e.style.opacity = 0);
                
                //let clickSnd = new Tone.Player('src/daw/assets/click.ogg').toMaster();
        ///////INPUT FUNCTIONALITY
                for (let i in triggers) 
                {
                    arrows.forEach(arrow => arrow.addEventListener(triggers[i], e => this.triggerArrow(e, arrow, triggers[i])), {capture: true});
                    buttons.forEach(button => button.addEventListener(triggers[i], e => this.triggerButton(e, button, triggers[i])), {capture: true});
                    sliders.forEach(slider => slider.addEventListener(triggers[i], e => this.triggerSlider(e, slider, triggers[i])), {capture: true});
                    knobs.forEach(knob => knob.addEventListener(triggers[i], e => this.triggerKnob(e, knob, triggers[i])), {capture: true});
                    pads.forEach(pad => pad.addEventListener(triggers[i], e => this.triggerPad(e, pad, triggers[i])), {capture: true});
                }
                this.update();
            },
            startDrag: function()
            {
                return Inputs.props.onDown = true;
            },
            endDrag: function()
            {
               return [
                   Inputs.props.onDown = false,
                   Inputs.props.transformAttribute = '',
                   Inputs.props.currDial = {}
               ];
            },
            dragMove: function(e)
            { 
                if (Inputs.props.onDown === true && e.target.classList.value === "slider") //set slider length parameters
                { 
                    let y = parseFloat(e.target.getAttributeNS(null, "y")); 
                    parseFloat(e.target.setAttributeNS(null, "y", y + (e.movementY / 2)));
                    if (parseFloat(e.target.getAttributeNS(null, "y")) > 230) parseFloat(e.target.setAttributeNS(null, "y", y = 230));
                    if (parseFloat(e.target.getAttributeNS(null, "y")) < 130) parseFloat(e.target.setAttributeNS(null, "y", y = 130))
                }
                if (Inputs.props.onDown === true && e.target.classList.value === "knobs") //set knobs length parameters
                {
                    let cx = parseFloat(e.target.getAttributeNS(null, "cx")),
                        cy = parseFloat(e.target.getAttributeNS(null, "cy"));
                        //Inputs.props.center = parseFloat(document.getElementById("sq").getAttributeNS(null, "x")); /* cx + 40; */ 
                    Inputs.props.transformAttribute = parseFloat(e.target.getAttributeNS(null, "transform"));  document.getElementById("debug").innerHTML = `Debug::pointer:   ${e.x}`;
                    switch (e.target.id)
                    {
                        case 'primary-knob-1-on' : 
                                                    Inputs.props.currDial = Inputs.knobs.dials.dial1; 
                                                    Inputs.props.center = 260;
                        break;
                        case 'primary-knob-2-on' : 
                                                    Inputs.props.currDial = Inputs.knobs.dials.dial2; 
                                                    Inputs.props.center = 310;
                        break;
                        case 'secondary-knob-1-on' : 
                                                    Inputs.props.currDial = Inputs.knobs.dials.dial3; 
                                                    Inputs.props.center = 360;
                        break;
                        case 'secondary-knob-2-on' : 
                                                    Inputs.props.currDial = Inputs.knobs.dials.dial4; 
                                                    Inputs.props.center = 420;
                        break;
                        case 'secondary-knob-3-on' : 
                                                    Inputs.props.currDial = Inputs.knobs.dials.dial5; 
                                                    Inputs.props.center = 490;
                        break;
                        case 'secondary-knob-4-on' : 
                                                    Inputs.props.currDial = Inputs.knobs.dials.dial6; 
                                                    Inputs.props.center = 550;
                        break;
                    }
                    e.x > Inputs.props.center  ? Inputs.props.rotation += 3 : Inputs.props.rotation -= 3;
                    parseFloat(Inputs.props.currDial.setAttributeNS(null, "transform", Inputs.props.transformAttribute = `rotate(${Inputs.props.rotation}, ${cx}, ${cy})`));
                    if (Inputs.props.rotation >= 180) Inputs.props.rotation = 179;
                    if (Inputs.props.rotation <= -180)  Inputs.props.rotation = -179;
                    return false;
                }
            },
            triggerSlider: function(e, slider, trigger_i)
            {
                switch (trigger_i)
                {
                    case 'mousedown' : case 'touchstart' : this.startDrag(); break;
                    case 'mousemove' : case 'touchmove' : case 'drag' : this.dragMove(e); break;
                    case 'mouseup' : case 'mouseout' : case 'touchend' : this.endDrag(); break;
                }
                switch(slider)
                {
                    case Inputs.sliders.slider1 :
    
                    break;
                    case Inputs.sliders.slider2 :
    
                    break;
                }
            },
            triggerKnob: function(e, knob, trigger_i)
            {
                switch (trigger_i)
                {
                    case 'mousemove' : case 'touchmove' : this.dragMove(e); break;
                    case 'mousedown' : case 'touchstart' : this.startDrag(); break;
                    case 'mouseup' : case 'mouseout' : case 'touchend' : this.endDrag(); break;
                }
                switch(knob)
                {
                    case Inputs.knobs.primaryKnob1 : case Inputs.knobs.dial1 :
                         
                    break;
                    case Inputs.knobs.primaryKnob2 : case Inputs.knobs.dial2 : 
    
                    break;
                }
            },
            triggerArrow: function(e, arrow, trigger_i)
            {
                switch (trigger_i)
                {
                    case 'mousedown' : case 'keydown' : case 'touchstart' :
                        switch (arrow)
                        {
                            case Inputs.arrows.arrowUp :
                                 Inputs.arrows.arrowUp.style.opacity = 0.4;
                                //clickSnd.start();
                                switch(SAMPLER.Props.currentSetting)
                                {
                                    case 'KEY' : SAMPLER.Props.incrementKey++; break;
                                    case 'MODE' : SAMPLER.Props.incrementMode++; break;
                                    case 'OCTAVE' : SAMPLER.Props.currentOctave++; break;
                                }
                            break;
                            case Inputs.arrows.arrowDown :
                                 Inputs.arrows.arrowDown.style.opacity = 0.4;
                                //clickSnd.start();
                                switch(SAMPLER.Props.currentSetting)
                                {
                                    case 'KEY' : SAMPLER.Props.incrementKey--; break;
                                    case 'MODE' : SAMPLER.Props.incrementMode--; break;
                                    case 'OCTAVE' : SAMPLER.Props.currentOctave--; break;
                                }
                            break;
                        }
                    //current mode
                        switch (SAMPLER.Props.incrementMode)
                        {
                            case 1 : SAMPLER.Props.currentMode = 'CHROMATIC'; break;
                            case 2 : SAMPLER.Props.currentMode = 'IONIAN'; break;
                            case 3 : SAMPLER.Props.currentMode = 'DORIAN'; break;
                            case 4 : SAMPLER.Props.currentMode = 'PHRYGIAN'; break;
                            case 5 : SAMPLER.Props.currentMode = 'LYDIAN'; break;
                            case 6 : SAMPLER.Props.currentMode = 'MIXOLYDIAN'; break;
                            case 7 : SAMPLER.Props.currentMode = 'AEOLIAN'; break;
                            case 8 : SAMPLER.Props.currentMode = 'LOCRIAN'; break;
                        }
                    //current key
                        switch(SAMPLER.Props.incrementKey)
                        {
                            case 1: SAMPLER.Props.currentKey = 'C'; break;
                            case 2: SAMPLER.Props.currentKey = 'Db'; break;
                            case 3: SAMPLER.Props.currentKey = 'D'; break;
                            case 4: SAMPLER.Props.currentKey = 'Eb'; break;
                            case 5: SAMPLER.Props.currentKey = 'E'; break;
                            case 6: SAMPLER.Props.currentKey = 'F'; break;
                            case 7: SAMPLER.Props.currentKey = 'Gb'; break;
                            case 8: SAMPLER.Props.currentKey = 'G'; break;
                            case 9: SAMPLER.Props.currentKey = 'A'; break;
                            case 10: SAMPLER.Props.currentKey = 'Ab'; break;
                            case 11: SAMPLER.Props.currentKey = 'B'; break;
                            case 12: SAMPLER.Props.currentKey = 'Bb'; break;
                        }
                    break;
                    case 'mouseup' : case 'mouseout' : case 'keyup' : case 'touchend' :
                        e.preventDefault();
                        switch (arrow)
                        {
                            case Inputs.arrows.arrowUp : Inputs.arrows.arrowUp.style.opacity = 0; break;
                            case Inputs.arrows.arrowDown : Inputs.arrows.arrowDown.style.opacity = 0; break;
                        }
                    break;
                }
            },
            triggerButton: function(e, button, trigger_i)
            {  
                switch (trigger_i)
                {
                    case 'mousedown' : case 'keydown' : 
                        switch (button)
                        {
                            case Inputs.buttons.octaveBtn : SAMPLER.Props.currentSetting = 'OCTAVE'; break;
                            case Inputs.buttons.modeBtn : SAMPLER.Props.currentSetting = 'MODE'; break;
                            case Inputs.buttons.keyBtn : SAMPLER.Props.currentSetting = 'KEY'; break;
                            case Inputs.buttons.recordBtn :
                                            Inputs.buttons.recordBtn.style.opacity = 0.4;
                                            Inputs.buttons.stopBtn.style.opacity = 0;
                                            Inputs.buttons.playBtn.style.opacity = 0;
                            break;
                            case Inputs.buttons.stopBtn :
                                            Inputs.buttons.stopBtn.style.opacity = 0.4;
                                            Inputs.buttons.recordBtn.style.opacity = 0;
                                            Inputs.buttons.playBtn.style.opacity = 0;
                            break;
                            case Inputs.buttons.playBtn : 
                                            Inputs.buttons.playBtn.style.opacity = 0.4;
                                            Inputs.buttons.recordBtn.style.opacity = 0;
                                            Inputs.buttons.stopBtn.style.opacity = 0;
                            break;
                            case Inputs.buttons.monoBtn : SAMPLER.Props.currentSynth = 'mono'; break;
                            case Inputs.buttons.duoBtn : SAMPLER.Props.currentSynth = 'duo'; break;
                            case Inputs.buttons.amBtn : SAMPLER.Props.currentSynth = 'am'; break;
                            case Inputs.buttons.fmBtn : SAMPLER.Props.currentSynth = 'fm'; break;
                        }
                    break;
                    case 'mouseup' : case 'mouseout' : case 'keyup' : case 'keyout' : e.preventDefault(); break;
                }
            },
            triggerPad: function(e, pad, trigger_i)
            {
            //push current note
                switch (pad.id)
                {
                    case 'pad-1-on' : 
                        switch (SAMPLER.Props.currentKey)
                        {
                            case 'C' :  SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave}`; break;
                            case 'Db' : SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave}`; break;
                            case 'D' :  SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave}`; break;
                            case 'Eb' : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave}`; break;
                            case 'E' :  SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}`; break;
                            case 'F' :  SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave}`; break;
                            case 'Gb' : SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}`; break;
                            case 'G' :  SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`; break;
                            case 'Ab' : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`; break;
                            case 'A' :  SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`; break;
                            case 'Bb' : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`; break;
                            case 'B' :  SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave}`; break;
                        }
                        break;
                    case 'pad-2-on' :
                        switch(SAMPLER.Props.currentKey)
                        {
                            case 'C' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed `Db${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave}`; break;
                            case 'Db' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave}`; break;
                            case 'D' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed `Eb${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}`; break;
                            case 'Eb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave}`; break;
                            case 'E' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}`; break;
                            case 'F' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`; break;
                            case 'Gb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`; break;
                            case 'G' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G#${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`; break;
                            case 'Ab' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`; break;
                            case 'A' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A#${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave}`; break;
                            case 'Bb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed `B${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave}`; break;
                            case 'B' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B#${SAMPLER.Props.currentOctave}`; 
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave}`; break;
                        }
                    break;
                    case 'pad-3-on' :
                            switch(SAMPLER.Props.currentKey)
                            {
                            case 'C' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave}`
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave}`; break;
                            case 'Db' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D#${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave}`; break;
                            case 'D' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave}`; break;
                            case 'Eb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}`; break;
                            case 'E' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `G#${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`; break;
                            case 'F' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`; break;
                            case 'Gb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`; break;
                            case 'G' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`; break;
                            case 'Ab' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'A' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Bb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; 
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'B' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}`; 
                                        else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' || SAMPLER.Props.currentMode === 'MIXOLYDIAN' ? SAMPLER.Props.notePressed = `D#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`; break;
                        }
                    break;
                    case 'pad-4-on' :
                        switch (SAMPLER.Props.currentKey)
                        {
                            case 'C' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Db' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`; 
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}`; break;
                            case 'D' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `G#${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`; break;
                            case 'Eb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}`; 
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`; break;
                            case 'E' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `A#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`;  break;
                            case 'F' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`  : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`; break;
                            case 'Gb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`; 
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Cb${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'G' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Ab' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'A' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `D#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Bb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'B' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`; break;
                        }
                    break;
                    case 'pad-5-on' :
                        switch(SAMPLER.Props.currentKey)
                        {
                            case 'C' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`; break;
                            case 'Db' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`; break;
                            case 'D' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G#${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`; break;
                            case 'Eb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`; break;
                            case 'E' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave}`; break;
                            case 'F' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`;  break;
                            case 'Gb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'G' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Ab' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'A' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Bb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`; break; 
                            case 'B' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave * 1.25}`; break;
                        }
                    break;
                    case 'pad-6-on' :
                        switch (SAMPLER.Props.currentKey)
                        {
                            case 'C' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}`; break;
                            case 'Db' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}`; break;
                            case 'D' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave}` : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave}`; break;
                            case 'Eb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave}`; 
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'E' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'F' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Gb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'G' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`;  break;
                            case 'Ab' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`;  break;
                            case 'A' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Bb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D#${SAMPLER.Props.currentOctave * 1.25}`; 
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'B' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`;
                                        else SAMPLER.Props.currentMode === 'PHRYGIAN' || SAMPLER.Props.currentMode === 'AEOLIAN' || SAMPLER.Props.currentMode === 'LOCRIAN' ? SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave * 1.25}`; break;
                        }
                    break;
                    case 'pad-7-on' :
                        switch (SAMPLER.Props.currentKey)
                        {
                        case 'C' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed `B${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'Db' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'D'  : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `G#${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'Eb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'E' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `A#${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'F' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'Gb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; 
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'G' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `C#${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'Ab' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Gb${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'A' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `D#${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'Bb' : if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave * 1.25}`; break;
                        case 'B' :  if (SAMPLER.Props.currentMode === 'CHROMATIC') SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`;
                                    else SAMPLER.Props.currentMode === 'IONIAN' || SAMPLER.Props.currentMode === 'LYDIAN' ? SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave * 1.25}` : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave * 1.25}`; break;
                        }
                    break;
                    case 'pad-8-on' :
                        switch (SAMPLER.Props.currentKey)
                        {
                            case 'C' : SAMPLER.Props.notePressed = `G${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Db' : SAMPLER.Props.notePressed = `Ab${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'D' : SAMPLER.Props.notePressed = `A${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Eb' : SAMPLER.Props.notePressed = `Bb${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'E' : SAMPLER.Props.notePressed = `B${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'F' : SAMPLER.Props.notePressed = `C${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Gb' : SAMPLER.Props.notePressed = `Db${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'G' : SAMPLER.Props.notePressed = `D${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Ab' : SAMPLER.Props.notePressed = `Eb${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'A' : SAMPLER.Props.notePressed = `E${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'Bb' : SAMPLER.Props.notePressed = `F${SAMPLER.Props.currentOctave * 1.25}`; break;
                            case 'B' : SAMPLER.Props.notePressed = `F#${SAMPLER.Props.currentOctave * 1.25}`; break;
                        }
                    break;
                }
               ////trigger types
                  switch (trigger_i)
                { 
                    case 'touchstart' : 
                                        pad.style.opacity = 0.4;
                                        SAMPLER.Synths.triggerAttack(); 
                    break;
                    case 'touchend' : 
                                        e.preventDefault(); 
                                        pad.style.opacity = 0;
                                        SAMPLER.Synths.triggerRelease(); 
                    break;
                    case 'mousedown' : case 'keydown' :  
                                        pad.style.opacity = 0.4;
                                        SAMPLER.Synths.triggerAttack();
                    break;
                    case 'mouseup' : case 'mouseout' : case 'keyup' :
                                        pad.style.opacity = 0; 
                                        SAMPLER.Synths.triggerRelease();
                    break;  
                }
            },
            update: function()
            {
                setInterval(() => {
                    switch(SAMPLER.Props.currentSetting)
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
                    switch (SAMPLER.Props.currentSynth)
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
        };
    //initialize sampler inputs
        Inputs.init();
}



 
///////////////////////////////////////////////////////////MIDI INPUTS
export class MIDIAccess {
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
    toggleSound(value) 
    {
        let method = value === 127 ? 'triggerAttack' : 'releaseAll';
        this.synth[method](['C4', 'E4', 'G4']);
    }
    handleVolume(value) 
    { // 0-127
        let val = value / 127 * 0.8;
        this.volume.gain.value = val;
    }
    handleFilter(value) 
    { // 0-127
        let val = value / 127 * 14800 + 200;
        this.filter.frequency.value = val;
    }
}


// if there is a problem in chrome with starting audio context before a user gesture. This fixes it.
let started = false;
document.documentElement.addEventListener('mousedown', () => {
    if (started) return;
    started = true;
    const inst = new Instrument();
    const midi = new MIDIAccess({ onDeviceInput });
    midi.start().then(() => console.log('STARTED!')).catch(console.error);

    function onDeviceInput({ input, value }) 
    {
        if (input === 23) inst.toggleSound(value);
        else if (input === 2) inst.handleVolume(value);
        else if (input === 14) inst.handleFilter(value);
        //  
        if (input === 7) inst.toggleSound(value);
        //else console.log('onDeviceInput!', input, value);
    }
});




