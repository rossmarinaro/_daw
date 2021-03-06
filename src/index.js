import Phaser from 'phaser';

//facebook instant games
  // window.onload = function(){
  //   FBInstant.initializeAsync().then(function(){
  //       FBInstant.startGameAsync().then(function(){
  //         FBInstant.setLoadingProgress(100);
  //         startGame();
  //       });
  //   })
  // }



//import PreloadScene from './preload';
import Pinball from './pinball/game';
//import Meatball_GameOver from './GameOver';
import './style.css';
import HueRotatePostFX from './assets/shaders.js';
export let scaleRatio = innerWidth / innerHeight;
export let configHeight = innerHeight; 

export default class Boot extends Phaser.Scene {
  
  constructor() {
      super("Boot");
  }
  //////initialize fonts///////
  init() {
  //text preload
      this.add.text(0, 0, '', { font: "1px digitizer", fill: ''}).setAlpha(0);
      this.add.text(0, 0, '', { font: "1px bangers", fill: ''}).setAlpha(0);
      this.time.delayedCall(250, () => this.scene.launch('Pinball')); 
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 1200 ,
  //   min: {
  //     width: 240,
  //     height: 480
  // },
  // max: {
  //     width: 3000,
  //     height: 2400
  // }
  },
  scene: [Boot, Pinball/*  PreloadScene, Meatballin, Meatball_GameOver */],
  pipeline: [HueRotatePostFX],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 300 }
    }
  }
}
const game = new Phaser.Game(config);