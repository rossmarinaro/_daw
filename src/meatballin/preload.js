//require.context('./assets/meatballin/audio')
import bumperBlue from './assets/meatballin/blue.png';
import retroTrack1 from './assets/meatballin/audio/retro1.mp3';
import pixelMeatballPng from './assets/meatballin/meatballs/atlas.png';
import pixelMeatballJson from  './assets/meatballin/meatballs/atlas.json';
import pixelPlayerRedPng from './assets/meatballin/player/atlas.png';
import pixelPlayerRedJSON from './assets/meatballin/player/atlas.json';
import pixelRollingPin from './assets/meatballin/player/9.png';
import checkers from './assets/meatballin/checkers.png';
import bumperYellow from './assets/meatballin/yellow.png';
import bumperRed from './assets/meatballin/red.png';
import ui from './assets/meatballin/ui.png';
import wamBkgnd from './assets/meatballin/bkgnd.png';
import fireFX from './assets/meatballin/audio/fire.mp3';
import errSnd from './assets/meatballin/audio/error.mp3';
import transform1 from './assets/meatballin/audio/transform1.mp3';
import macaroniRng from './assets/meatballin/audio/macaroni_ring.mp3';
import meatballHit from './assets/meatballin/audio/meatball_hit.mp3';
import swordSwipe from './assets/meatballin/audio/swipe.mp3';
//json
const json = require('./assets/meatballin/wam_arcade_map_1.json');


import Meatball_GameOver from './GameOver'


//////////////////////////////////////////////////////////////////////////
export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' })
    }
    progressBar(scene)
    {
        let camWidth = scene.cameras.main.width,
            camHeight = scene.cameras.main.height;
        scene.cameras.main.setZoom(0.9);
        let progressBar = scene.add.graphics();
        let progressBox = scene.add.graphics().fillStyle(0x222222, 0.8).fillRect((12 / 100) * camWidth, (65 / 100) * camHeight, (70 / 100) * camWidth, 50);
        let loadingText = scene.make.text({
            x: camWidth / 2,
            y: camHeight / 2 - 50,
            text: 'Loading...',
            style: {
                font: `60px digitizer`,
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        let percentText = scene.make.text({
            x: camWidth / 2,
            y: camHeight / 2 + 5,
            text: '0%',
            style: {
                font: `38px digitizer`,
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        let stageText = scene.make.text({
            x: camWidth / 2,
            y: camHeight / 2 + 50,
            text: `Meatballin!`,
            style: {
                font: `28px digitizer`,
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        scene.load.on('progress', value =>{
            percentText.setText(Math.floor(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1).fillRect((15 / 100) * camWidth, (66.4 / 100) * camHeight, (65 / 100) * camWidth * value, 30);
        }).on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            stageText.destroy();
        });	
      }
    preload() {
        this.load.atlas('pixel_meatball', pixelMeatballPng, pixelMeatballJson);
        this.load.atlas('pixel_playerRed', pixelPlayerRedPng, pixelPlayerRedJSON);
        this.load.image('pixel_rollingPin', pixelRollingPin);
        this.load.spritesheet('checkers', checkers, {frameWidth: 70, frameHeight: 70});
        this.load.tilemapTiledJSON('wam_arcade_map_1', json);
        this.load.image('bumper_yellow', bumperYellow);
        this.load.image('bumper_red', bumperRed);
        this.load.image('bumper_blue', bumperBlue);
        this.load.image('ui', ui);
        this.load.image('wam_bkgnd', wamBkgnd);
        this.load.audio('fire_fx', fireFX);
        this.load.audio('error_sound', errSnd);
        this.load.audio('transform1', transform1);
        this.load.audio('macaroni_ring', macaroniRng);
        this.load.audio('meatball_hit', meatballHit);
        this.load.audio('retro_track1', retroTrack1);
        this.load.audio('sword_swipe', swordSwipe);
        this.progressBar(this);
    }
  
    create() {
       this.scene.start('Meatballin');
    }
  }
  