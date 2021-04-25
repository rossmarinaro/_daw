import { SAMPLER } from '../instruments/sampler/ui.js';
import { KEYBOARD } from '../instruments/keyboard/ui.js';



export const INSTRUMENT_RACK = {
  Instruments : {
    sampler: SAMPLER,
    keyboard: KEYBOARD
  },
  Defaults : {
    instrument: SAMPLER,
    init: function()
    {
    //create instrument rack div
      const div = document.createElement("div");
            div.setAttribute('id', "instrument-rack");
            document.body.appendChild(div);
            INSTRUMENT_RACK.Defaults.instrument.Init();
    },
    
  }
}

 
  //document.addEventListener('mousedown', ()=> document.getElementById("instrument-rack").innerHTML = keyboard);

  INSTRUMENT_RACK.Defaults.init();