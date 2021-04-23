import Tone from '../libs/Tone.js';
import { SAMPLER } from'./main.js';

export const Inputs = {   
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
                            switch(SAMPLER.SamplerProps.currentSetting)
                            {
                                case 'KEY' : SAMPLER.SamplerProps.incrementKey++; break;
                                case 'MODE' : SAMPLER.SamplerProps.incrementMode++; break;
                                case 'OCTAVE' : SAMPLER.SamplerProps.currentOctave++; break;
                            }
                        break;
                        case Inputs.arrows.arrowDown :
                             Inputs.arrows.arrowDown.style.opacity = 0.4;
                            //clickSnd.start();
                            switch(SAMPLER.SamplerProps.currentSetting)
                            {
                                case 'KEY' : SAMPLER.SamplerProps.incrementKey--; break;
                                case 'MODE' : SAMPLER.SamplerProps.incrementMode--; break;
                                case 'OCTAVE' : SAMPLER.SamplerProps.currentOctave--; break;
                            }
                        break;
                    }
                //current mode
                    switch (SAMPLER.SamplerProps.incrementMode)
                    {
                        case 1 : SAMPLER.SamplerProps.currentMode = 'CHROMATIC'; break;
                        case 2 : SAMPLER.SamplerProps.currentMode = 'IONIAN'; break;
                        case 3 : SAMPLER.SamplerProps.currentMode = 'DORIAN'; break;
                        case 4 : SAMPLER.SamplerProps.currentMode = 'PHRYGIAN'; break;
                        case 5 : SAMPLER.SamplerProps.currentMode = 'LYDIAN'; break;
                        case 6 : SAMPLER.SamplerProps.currentMode = 'MIXOLYDIAN'; break;
                        case 7 : SAMPLER.SamplerProps.currentMode = 'AEOLIAN'; break;
                        case 8 : SAMPLER.SamplerProps.currentMode = 'LOCRIAN'; break;
                    }
                //current key
                    switch(SAMPLER.SamplerProps.incrementKey)
                    {
                        case 1: SAMPLER.SamplerProps.currentKey = 'C'; break;
                        case 2: SAMPLER.SamplerProps.currentKey = 'Db'; break;
                        case 3: SAMPLER.SamplerProps.currentKey = 'D'; break;
                        case 4: SAMPLER.SamplerProps.currentKey = 'Eb'; break;
                        case 5: SAMPLER.SamplerProps.currentKey = 'E'; break;
                        case 6: SAMPLER.SamplerProps.currentKey = 'F'; break;
                        case 7: SAMPLER.SamplerProps.currentKey = 'Gb'; break;
                        case 8: SAMPLER.SamplerProps.currentKey = 'G'; break;
                        case 9: SAMPLER.SamplerProps.currentKey = 'A'; break;
                        case 10: SAMPLER.SamplerProps.currentKey = 'Ab'; break;
                        case 11: SAMPLER.SamplerProps.currentKey = 'B'; break;
                        case 12: SAMPLER.SamplerProps.currentKey = 'Bb'; break;
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
                        case Inputs.buttons.octaveBtn : SAMPLER.SamplerProps.currentSetting = 'OCTAVE'; break;
                        case Inputs.buttons.modeBtn : SAMPLER.SamplerProps.currentSetting = 'MODE'; break;
                        case Inputs.buttons.keyBtn : SAMPLER.SamplerProps.currentSetting = 'KEY'; break;
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
                        case Inputs.buttons.monoBtn : SAMPLER.SamplerProps.currentSynth = 'mono'; break;
                        case Inputs.buttons.duoBtn : SAMPLER.SamplerProps.currentSynth = 'duo'; break;
                        case Inputs.buttons.amBtn : SAMPLER.SamplerProps.currentSynth = 'am'; break;
                        case Inputs.buttons.fmBtn : SAMPLER.SamplerProps.currentSynth = 'fm'; break;
                    }
                break;
                case 'mouseup' : case 'mouseout' : case 'keyup' : case 'keyout' : e.preventDefault(); break;
            }
        },
        triggerPad: function(e, pad, trigger_i)
        {
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
        //push current note
            switch (pad.id)
            {
                case 'pad-1-on' : 
                    switch (SAMPLER.SamplerProps.currentKey)
                    {
                        case 'C' :  SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Db' : SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'D' :  SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Eb' : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'E' :  SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'F' :  SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Gb' : SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'G' :  SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Ab' : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'A' :  SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Bb' : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'B' :  SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave}`; break;
                    }
                    break;
                case 'pad-2-on' :
                    switch(SAMPLER.SamplerProps.currentKey)
                    {
                        case 'C' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed `Db${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Db' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'D' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed `Eb${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Eb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'E' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'F' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Gb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'G' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G#${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Ab' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'A' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A#${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Bb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed `B${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'B' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B#${SAMPLER.SamplerProps.currentOctave}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave}`; break;
                    }
                break;
                case 'pad-3-on' :
                        switch(SAMPLER.SamplerProps.currentKey)
                        {
                        case 'C' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave}`
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Db' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D#${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'D' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Eb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'E' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `G#${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'F' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Gb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'G' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Ab' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'A' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Bb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'B' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' || SAMPLER.SamplerProps.currentMode === 'MIXOLYDIAN' ? SAMPLER.SamplerProps.notePressed = `D#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    }
                break;
                case 'pad-4-on' :
                    switch (SAMPLER.SamplerProps.currentKey)
                    {
                        case 'C' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Db' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'D' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `G#${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Eb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'E' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `A#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`;  break;
                        case 'F' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`  : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Gb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Cb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'G' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Ab' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'A' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `D#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Bb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'B' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    }
                break;
                case 'pad-5-on' :
                    switch(SAMPLER.SamplerProps.currentKey)
                    {
                        case 'C' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Db' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'D' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G#${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Eb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'E' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'F' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`;  break;
                        case 'Gb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'G' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Ab' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'A' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Bb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`; break; 
                        case 'B' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    }
                break;
                case 'pad-6-on' :
                    switch (SAMPLER.SamplerProps.currentKey)
                    {
                        case 'C' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Db' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'D' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave}` : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave}`; break;
                        case 'Eb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'E' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'F' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Gb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'G' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`;  break;
                        case 'Ab' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`;  break;
                        case 'A' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Bb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D#${SAMPLER.SamplerProps.currentOctave * 1.25}`; 
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'B' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                    else SAMPLER.SamplerProps.currentMode === 'PHRYGIAN' || SAMPLER.SamplerProps.currentMode === 'AEOLIAN' || SAMPLER.SamplerProps.currentMode === 'LOCRIAN' ? SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    }
                break;
                case 'pad-7-on' :
                    switch (SAMPLER.SamplerProps.currentKey)
                    {
                    case 'C' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed `B${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'Db' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'D'  : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `G#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'Eb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'E' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `A#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'F' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'Gb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; 
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'G' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `C#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'Ab' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Gb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'A' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `D#${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'Bb' : if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    case 'B' :  if (SAMPLER.SamplerProps.currentMode === 'CHROMATIC') SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`;
                                else SAMPLER.SamplerProps.currentMode === 'IONIAN' || SAMPLER.SamplerProps.currentMode === 'LYDIAN' ? SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave * 1.25}` : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    }
                break;
                case 'pad-8-on' :
                    switch (SAMPLER.SamplerProps.currentKey)
                    {
                        case 'C' : SAMPLER.SamplerProps.notePressed = `G${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Db' : SAMPLER.SamplerProps.notePressed = `Ab${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'D' : SAMPLER.SamplerProps.notePressed = `A${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Eb' : SAMPLER.SamplerProps.notePressed = `Bb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'E' : SAMPLER.SamplerProps.notePressed = `B${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'F' : SAMPLER.SamplerProps.notePressed = `C${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Gb' : SAMPLER.SamplerProps.notePressed = `Db${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'G' : SAMPLER.SamplerProps.notePressed = `D${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Ab' : SAMPLER.SamplerProps.notePressed = `Eb${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'A' : SAMPLER.SamplerProps.notePressed = `E${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'Bb' : SAMPLER.SamplerProps.notePressed = `F${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                        case 'B' : SAMPLER.SamplerProps.notePressed = `F#${SAMPLER.SamplerProps.currentOctave * 1.25}`; break;
                    }
                break;
            }
        }
    }
    Inputs.init();


    
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




