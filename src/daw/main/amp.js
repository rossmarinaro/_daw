/******* AMP *******/ 

const AMP = {
  context: null,
  nodes: {
    analyserNode: null,
    gainNode: null,
    bassEQ: null,
    midEQ: null,
    trebleEQ: null
  },
  features: {
    volume: document.getElementById('volume'),
    bass: document.getElementById('bass'),
    mid: document.getElementById('mid'),
    treble: document.getElementById('treble'),
    visualizer: document.getElementById('visualizer')
  },
  init: function()
  {
    AMP.context = new AudioContext();
    AMP.nodes.analyserNode = new AnalyserNode(AMP.context, {fftSize: 256});
    AMP.nodes.gainNode = new GainNode(AMP.context, { gain: AMP.features.volume.value});
    AMP.nodes.bassEQ = new BiquadFilterNode(AMP.context, {type: 'lowshelf', frequency: 500, gain: bass.value});
    AMP.nodes.midEQ = new BiquadFilterNode(AMP.context, {type: 'peaking', Q: Math.SQRT1_2, frequency: 1500, gain: mid.value});
    AMP.nodes.trebleEQ = new BiquadFilterNode(AMP.context, {type: 'highshelf', frequency: 3000, gain: treble.value});
    
    AMP.setupEventListeners();
    AMP.setupContext();
    AMP.resize();
    AMP.drawVisualizer();
  },
  setupContext: async function() 
  {
    const guitar = await getGuitar();
    if (context.state === 'suspended') await context.resume();
    /* const source =  */context.createMediaStreamSource(guitar)
    //source
      .connect(AMP.nodes.bassEQ)
      .connect(AMP.nodes.midEQ)
      .connect(AMP.nodes.trebleEQ)
      .connect(AMP.nodes.gainNode)
      .connect(AMP.nodes.analyserNode)
      .connect(AMP.context.destination);
  },
  getGuitar: function() 
  {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0
      }
    })
  },
  drawVisualizer: function() 
  {
    AMP.requestAnimationFrame(drawVisualizer);
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteFrequencyData(dataArray)
    const width = AMP.features.visualizer.width
    const height = AMP.features.visualizer.height
    const barWidth = width / bufferLength

    const canvasContext = visualizer.getContext('2d')
    canvasContext.clearRect(0, 0, width, height)

    dataArray.forEach((item, index) => {
      const y = item / 255 * height / 2
      const x = barWidth * index

      canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`
      canvasContext.fillRect(x, height - y, barWidth, y)
    })
  },
  setupEventListeners: function() 
  {
    window.addEventListener('resize', resize)

    AMP.features.volume.addEventListener('input', e => {
      const value = parseFloat(e.target.value)
      gainNode.gain.setTargetAtTime(value, context.currentTime, .01)
    });
    AMP.features.bass.addEventListener('input', e => {
      const value = parseInt(e.target.value)
      bassEQ.gain.setTargetAtTime(value, context.currentTime, .01)
    });
    AMP.features.mid.addEventListener('input', e => {
      const value = parseInt(e.target.value)
      midEQ.gain.setTargetAtTime(value, context.currentTime, .01)
    });
    AMP.features.treble.addEventListener('input', e => {
      const value = parseInt(e.target.value)
      trebleEQ.gain.setTargetAtTime(value, context.currentTime, .01)
    });
  },
  resize: function() 
  {
    AMP.features.visualizer.width = AMP.features.visualizer.clientWidth * window.devicePixelRatio
    AMP.features.visualizer.height = AMP.features.visualizer.clientHeight * window.devicePixelRatio
  }
}









