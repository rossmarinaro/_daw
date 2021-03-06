
`use strict`;

let pinballBallNum = 0,
    doughAvailable = 20,
	pinballScore = 0,
	pinballHighScoreQuantity = 0;
 
import pinball from '../assets/pinball/pinball.json';
import pinball2 from '../assets/pinball/pinball2.json';
import ball from '../assets/pinball/ball.png';
import pinball_flipper from '../assets/pinball/flipper.png';
import pinball_center_pin from '../assets/pinball/center_pin.png';
import swanky_8bit_idle_fr1 from '../assets/pinball/pixel/idle/1.png';
import swanky_8bit_idle_fr2 from '../assets/pinball/pixel/idle/2.png';
import swanky_8bit_idle_fr3 from '../assets/pinball/pixel/idle/3.png';
import swanky_8bit_dance_fr1 from '../assets/pinball/pixel/dance/1.png';
import swanky_8bit_dance_fr2 from '../assets/pinball/pixel/dance/2.png';
import swanky_8bit_dance_fr3 from '../assets/pinball/pixel/dance/3.png';
import supreme_leader_8bit_forward_idle_fr1 from '../assets/pinball/pixel/sl/1.png';
import supreme_leader_8bit_forward_idle_fr2 from '../assets/pinball/pixel/sl/2.png';
import supreme_leader_8bit_forward_idle_fr3 from '../assets/pinball/pixel/sl/3.png';
import hitwoman_pixel_disco_fr1 from '../assets/pinball/pixel/hitwoman/1.png';
import hitwoman_pixel_disco_fr2 from '../assets/pinball/pixel/hitwoman/2.png';
import hitwoman_pixel_disco_fr3 from '../assets/pinball/pixel/hitwoman/3.png';
import assassin_pixel_disco_fr1 from '../assets/pinball/pixel/assassin/1.png';
import assassin_pixel_disco_fr2 from '../assets/pinball/pixel/assassin/2.png';
import assassin_pixel_disco_fr3 from '../assets/pinball/pixel/assassin/3.png';
import ayokayEmoji from '../assets/pinball/ayokay_emoji.png';
import fire_fr1 from '../assets/pinball/fire_fr1.png';
import pixel_basil from '../assets/pinball/pixel/basil.png';
import pixel_tomato from '../assets/pinball/pixel/tomato.png';
import pixel_garlic from '../assets/pinball/pixel/garlic.png';
import pixel_onion from '../assets/pinball/pixel/onion.png';
import pixel_mushroom from '../assets/pinball/pixel/mushroom.png';
import pixel_eggplant from '../assets/pinball/pixel/eggplant.png';
import pixel_beets from '../assets/pinball/pixel/beets.png';
import pixel_chili from '../assets/pinball/pixel/chili.png';
import bumper_red from '../assets/pinball/bumpers/red.png';
import bumper_blue from '../assets/pinball/bumpers/blue.png';
import bumper_green from '../assets/pinball/bumpers/green.png';
import bumper_yellow from '../assets/pinball/bumpers/yellow.png';
import pinball_button from '../assets/pinball/button.png';
import pinball_bkgnd1 from '../assets/pinball/pinball_bkgnd1.png';
import pinball_bkgnd2 from '../assets/pinball/pinball_bkgnd2.png';
import pinball_bkgnd4 from '../assets/pinball/pinball_bkgnd4.png';
import pixel_art_pasta from '../assets/pinball/pap.png';
import speech_bub_fr1 from '../assets/pinball/speech_bubble/1.png';
import speech_bub_fr2 from '../assets/pinball/speech_bubble/2.png';
import speech_bub_fr3 from '../assets/pinball/speech_bubble/3.png';
import speech_bub_fr4 from '../assets/pinball/speech_bubble/4.png';
import player_interface from '../assets/pinball/player_interface.png';
import interface2 from '../assets/pinball/items_interface.png';
import clickSnd from '../assets/pinball/audio/bloop1.mp3';
import ring from '../assets/pinball/audio/ring.mp3';
import macRing from '../assets/pinball/audio/macaroni_ring.mp3';
import ohhh from '../assets/pinball/audio/ohh.mp3';
import sick from '../assets/pinball/audio/sick.mp3';
import dough_sound from '../assets/pinball/audio/dough.mp3';
import huh from '../assets/pinball/audio/huh.mp3';
import gulpSnd from '../assets/pinball/audio/gulp.mp3';
import frigyeah from '../assets/pinball/audio/frigyeah.mp3';
import ring_echo from '../assets/pinball/audio/ring_echo.mp3'; 
import error_sound from '../assets/pinball/audio/error.mp3';
import warp from '../assets/pinball/audio/warp.mp3';
import extra_life_sound from '../assets/pinball/audio/record_scratch.mp3';
import perish1 from '../assets/pinball/audio/perish1.mp3';
import fire_sound from '../assets/pinball/audio/fire.mp3';
import playerHit from '../assets/pinball/audio/ouch.mp3';
import transform1 from '../assets/pinball/audio/transform1.mp3';
import phryg from '../assets/pinball/audio/phrygian1.mp3';
import HueRotatePostFX from '../assets/shaders';


export default class Pinball extends Phaser.Scene {


  constructor() {
	super({
		key:"Pinball", 
		physics: {
	        default: 'matter',
			matter: { 
				debug: false,
				 gravity: {y: 0.5}
			}
		}
	});
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
		  text: `Pasta Pinball!`,
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
preload(){
	this.load.tilemapTiledJSON('pinball', pinball);
	this.load.tilemapTiledJSON('pinball2', pinball2);
	this.load.image('ball', ball);
	this.load.image('pinball_flipper', pinball_flipper);
	this.load.image('pinball_center_pin', pinball_center_pin);
	this.load.image('swanky_8bit_idle_fr1', swanky_8bit_idle_fr1);
	this.load.image('swanky_8bit_idle_fr2', swanky_8bit_idle_fr2);
	this.load.image('swanky_8bit_idle_fr3', swanky_8bit_idle_fr3);
	this.load.image('swanky_8bit_dance_fr1', swanky_8bit_dance_fr1);
	this.load.image('swanky_8bit_dance_fr2', swanky_8bit_dance_fr2);
	this.load.image('swanky_8bit_dance_fr3', swanky_8bit_dance_fr3);
	this.load.image('supreme_leader_8bit_forward_idle_fr1', supreme_leader_8bit_forward_idle_fr1);
	this.load.image('supreme_leader_8bit_forward_idle_fr2', supreme_leader_8bit_forward_idle_fr2);
	this.load.image('supreme_leader_8bit_forward_idle_fr3', supreme_leader_8bit_forward_idle_fr3);
	this.load.image('hitwoman_pixel_disco_fr1', hitwoman_pixel_disco_fr1);
	this.load.image('hitwoman_pixel_disco_fr2', hitwoman_pixel_disco_fr2);
	this.load.image('hitwoman_pixel_disco_fr3', hitwoman_pixel_disco_fr3);
	this.load.image('assassin_pixel_disco_fr1', assassin_pixel_disco_fr1);
	this.load.image('assassin_pixel_disco_fr2', assassin_pixel_disco_fr2);
	this.load.image('assassin_pixel_disco_fr3', assassin_pixel_disco_fr3);
	this.load.image('pixel_basil', pixel_basil);
	this.load.image('pixel_tomato', pixel_tomato);
	this.load.image('pixel_garlic', pixel_garlic);
	this.load.image('pixel_onion', pixel_onion);
	this.load.image('pixel_mushroom', pixel_mushroom);
	this.load.image('pixel_chili', pixel_chili);
	this.load.image('pixel_eggplant', pixel_eggplant);
	this.load.image('pixel_beets', pixel_beets);
	this.load.image('bumper_red', bumper_red);
	this.load.image('bumper_blue', bumper_blue);
	this.load.image('bumper_green', bumper_green);
	this.load.image('bumper_yellow', bumper_yellow);
	this.load.image('pinball_button', pinball_button);
	this.load.image('ayokay_emoji', ayokayEmoji);
	this.load.image('fire_fr1', fire_fr1);
	this.load.spritesheet('pinball_bkgnd1', pinball_bkgnd1, {frameWidth: 800, frameHeight: 1200});
	this.load.spritesheet('pinball_bkgnd2', pinball_bkgnd2, {frameWidth: 800, frameHeight: 1200});
	this.load.spritesheet('pinball_bkgnd4', pinball_bkgnd4, {frameWidth: 800, frameHeight: 1200});
	this.load.image('pixel_art_pasta', pixel_art_pasta);
	this.load.image('speech_bub_fr1', speech_bub_fr1);
	this.load.image('speech_bub_fr2', speech_bub_fr2);
	this.load.image('speech_bub_fr3', speech_bub_fr3);
	this.load.image('speech_bub_fr4', speech_bub_fr4);
	this.load.image('player_interface', player_interface);
	this.load.image('interface2', interface2);
	this.load.audio('bloop1', clickSnd);
	this.load.audio('ring', ring);
	this.load.audio('ring_echo', ring_echo);
	this.load.audio('macaroni_ring', macRing);
	this.load.audio('ohhh', ohhh);
	this.load.audio('sick', sick);
	this.load.audio('dough_sound', dough_sound);
	this.load.audio('huh', huh);
	this.load.audio('gulp', gulpSnd);
	this.load.audio('frigyeah', frigyeah);
	this.load.audio('ring_echo', ring_echo); 
	this.load.audio('error_sound', error_sound);
	this.load.audio('warp', warp);
	this.load.audio('extra_life_sound', extra_life_sound);
	this.load.audio('perish1', perish1);
	this.load.audio('fire_fx', fire_sound);
	this.load.audio('player_hit', playerHit);
	this.load.audio('transform1', transform1);
	this.load.audio('phryg', phryg);

	this.progressBar(this)
}
create() {    

this.pinballCollideBool = false;
this.anims.create({
	key: 'speech_bub_anims',
	frames: [
			{key: 'speech_bub_fr1'},
				{key: 'speech_bub_fr2'},
					{key: 'speech_bub_fr3'},
						{key: 'speech_bub_fr4', duration: 300}
	],
	frameRate: 8, repeat: 0
});
//assassin pixelart
this.anims.create({
    key: 'assassin_pixel_disco_anims',
	frames: [
			{key: 'assassin_pixel_disco_fr2'},
				{key: 'assassin_pixel_disco_fr3'},
			{key: 'assassin_pixel_disco_fr2'},
		{key: 'assassin_pixel_disco_fr1', duration: 100}
	],
    frameRate: 8,
	repeat: -1,
});
//hit woman pixelart
this.anims.create({
    key: 'hitwoman_pixel_disco_anims',
	frames: [
			{key: 'hitwoman_pixel_disco_fr2'},
				{key: 'hitwoman_pixel_disco_fr3'},
			{key: 'hitwoman_pixel_disco_fr2'},
		{key: 'hitwoman_pixel_disco_fr1', duration: 100}
	],
    frameRate: 8,
	repeat: -1,
});
// swanky pixelart dance		
this.anims.create({
    key: 'sv_8bit_dance_anims',
	frames: [
			{key: 'swanky_8bit_dance_fr2'},
				{key: 'swanky_8bit_dance_fr3'},
			{key: 'swanky_8bit_dance_fr2'},
		{key: 'swanky_8bit_dance_fr1', duration: 100}
	],
    frameRate: 8,
	repeat: -1,
});
// swanky 8bit idle		
this.anims.create({
    key: 'sv_8bit_idle_anims',
	frames: [
			{key: 'swanky_8bit_idle_fr2'},
				{key: 'swanky_8bit_idle_fr3'},
			{key: 'swanky_8bit_idle_fr2'},
		{key: 'swanky_8bit_idle_fr1', duration: 100}
	],
    frameRate: 8,
	repeat: -1,
});
// supreme leader 8 bit 
this.anims.create({
    key: 'supreme_leader_8bit_forward_idle_anims',
	frames: [
			{key: 'supreme_leader_8bit_forward_idle_fr2'},
				{key: 'supreme_leader_8bit_forward_idle_fr3'},
			{key: 'supreme_leader_8bit_forward_idle_fr2'},
		{key: 'supreme_leader_8bit_forward_idle_fr1', duration: 100}
	],
    frameRate: 8, repeat: -1,
});


	this.itemRing = this.sound.add('ring');
	this.itemRing2 = this.sound.add('macaroni_ring');
	this.shunkSound = this.sound.add('perish1').setVolume(3);
	this.recordScratch = this.sound.add('extra_life_sound');
	this.sick = this.sound.add('sick');
	this.errorSound = this.sound.add('error_sound').setVolume(4);
	this.playerHitSound = this.sound.add('player_hit');
	this.fireFx = this.sound.add('fire_fx').setVolume(5); 
	this.clickSnd = this.sound.add('bloop1');
	this.huh = this.sound.add('huh');
	this.gulp = this.sound.add('gulp');
	this.frigYeah = this.sound.add('frigyeah');
	this.ring = this.sound.add('ring');
	this.ohhh = this.sound.add('ohhh');
	this.ringEcho = this.sound.add('ring_echo');
	this.transformSound1 = this.sound.add('transform1').setVolume(0.5);
	this.warpSound = this.sound.add('warp').setDetune(-200).setVolume(0.5);
	this.mainTheme = this.sound.add('phryg').setLoop(true);
	this.mainTheme.play();


    this.map = this.make.tilemap({key: 'pinball'});
	this.bkgnd3Tiles = this.map.addTilesetImage('pinball_bkgnd4');
	this.bkgnd3Bkgnd = this.map.createStaticLayer('bkgnd', this.bkgnd3Tiles, 0, 0);
	this.bkgnd1_2 = this.add.image(400, 550, 'pixel_art_pasta').setAlpha(0);
	this.bkgnd1_2Tween = this.tweens.add({targets: this.bkgnd1_2, alpha: 1, duration: 500, ease: 'Linear', hold: 2000, yoyo: true}).pause();
////pixel art
	this.swankyDance = this.add.sprite(400, 460, 'swanky_velvet_8bit_dance').play('sv_8bit_dance_anims', true).setScale(0.7);
	this.supremeLeader = this.add.sprite(370, 890, 'supreme_leader_8bit_forward_idle_fr1').play('supreme_leader_8bit_forward_idle_anims', true);
	this.hitwoman = this.add.sprite(250, 650, 'hitwoman_pixel_disco_fr1').play('hitwoman_pixel_disco_anims', true);
	this.assassin = this.add.sprite(500, 650,'assassin_pixel_disco_fr1').play('assassin_pixel_disco_anims', true);
	this.tiles1 = this.map.addTilesetImage('pinball_bkgnd1');
	this.bkgnd1 = this.map.createDynamicLayer('World', this.tiles1, 0, 0).setCollisionByExclusion([-1]);
	this.matter.world.convertTilemapLayer(this.bkgnd1);
//map layer 2
	this.map2 = this.make.tilemap({key: 'pinball2'});
	this.tiles2 = this.map2.addTilesetImage('pinball_bkgnd2');
	this.bkgnd2 = this.map2.createStaticLayer('World', this.tiles2, 0, 0).setCollisionByExclusion([-1]);
	this.matter.world.convertTilemapLayer(this.bkgnd2);
	

//ui
 this.add.image(220, 70, 'player_interface');
 this.add.image(595, 70, 'interface2').setInteractive().setScale(1.1);
 this.add.text(475, 35, '1 PLAY', {fontSize: '25px', fontFamily: 'Bangers', fill: '#ffff00'}).setShadow(2, 2, '#000000', true, false);
 this.add.text(480, 80, `$5`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setShadow(2, 2, '#000000', true, false); 
 this.add.text(550, 35, '3 PLAYS', {fontSize: '25px', fontFamily: 'Bangers', fill: '#ffff00'}).setShadow(2, 2, '#000000', true, false);
 this.add.text(560, 80, `$10`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setShadow(2, 2, '#000000', true, false);
 this.add.text(640, 35, 'Dough', {fontSize: '25px', fontFamily: 'Digitizer', fill: '#ffffff'}).setShadow(2, 2, '#000000', true, false);
 this.doughQuantity = this.add.text(640, 80, `$ ${doughAvailable}`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setShadow(2, 2, '#000000', true, false); 
this.pinballScoreText = this.add.text(50, 40, 'SCORE', {fontSize: '30px', fontFamily: 'Digitizer', fill: '#ffffff'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
this.pinballScoreText2 = this.add.text(80, 80, pinballScore, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
this.pinballBallText = this.add.text(190, 40, 'BALL', {fontSize: '30px', fontFamily: 'Digitizer', fill: '#ffffff'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
this.pinballBall = this.add.text(210, 80, pinballBallNum, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
this.pinballHighScoreText = this.add.text(290, 35, 'High Score:', {fontSize: '30px', fontFamily: 'Bangers', fill: '#ffffff'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
this.pinballHighScoreTextTop = this.add.text(290, 35, 'High Score:', {fontSize: '30px', fontFamily: 'Bangers', fill: '#ff0000'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false).setAlpha(0).setVisible(false);
this.pinballHighScoreText2 = this.add.text(340, 80, pinballHighScoreQuantity, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
this.pickedUpText = this.add.text(350, 320, ``, {fontSize: '25px', fontFamily: 'Bangers', fill: '#ffff00' }).setShadow(2, 2, '#000000', true, false);
//high score tween
this.pinballHighScoreTween = this.tweens.add({
	targets: this.pinballHighScoreTextTop, alpha: 1, duration: 500, ease: 'Power1', repeat: -1, yoyo: true, onUpdate: ()=>{
		this.pinballHighScoreTextTop.setVisible(true);
		this.time.delayedCall(2000, ()=>{
			this.pinballCollideBool = false;
			this.pinballHighScoreTween.pause(); this.pinballHighScoreTextTop.setVisible(false); 
		});
	}
}).pause();
	

	this.gameState = true;
	//init boolean
	this.initPinball = true;    

//bumpers
	this.bumperRed = this.matter.add.sprite(292, 380, 'bumper_red').setCircle(45, {isStatic: true});
	this.bumperGreen = this.matter.add.sprite(370, 712, 'bumper_green').setCircle(45, {isStatic: true});
	this.bumperBlue = this.matter.add.sprite(393, 260, 'bumper_blue').setCircle(45, {isStatic: true});
	this.bumperYellow = this.matter.add.sprite(480, 380, 'bumper_yellow').setCircle(45, {isStatic: true});
	this.bumperGroup = this.add.group();
	this.bumperGroup.add(this.bumperRed); this.bumperGroup.add(this.bumperGreen); this.bumperGroup.add(this.bumperBlue); this.bumperGroup.add(this.bumperYellow);
//bumper images
	this.bumperMushroom = this.matter.add.sprite(292, 380, 'pixel_mushroom').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitMushroom = 0;
	this.bumperBasil = this.matter.add.sprite(480, 380, 'pixel_basil').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitBasil = 0;
	this.bumperGarlic = this.matter.add.sprite(393, 270, 'pixel_garlic').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitGarlic = 0;
	this.bumperOnion = this.matter.add.sprite(370, 712, 'pixel_onion').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitOnion = 0;
	this.bumperTomato = this.matter.add.sprite(292, 380, 'pixel_tomato').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitTomato = 0;
	this.bumperChili = this.matter.add.sprite(393, 260, 'pixel_chili').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitHitChili = 0;
	this.bumperEggplant = this.matter.add.sprite(480, 380, 'pixel_eggplant').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitEggplant = 0;
	this.bumperBeets = this.matter.add.sprite(370, 712, 'pixel_beets').setScale(0.6).setCircle(45, {isStatic: true}); this.timesHitBeets = 0;
	//group
	this.itemsGroup = this.add.group();
	//score number pop ups
	this.popUp1 = this.add.text(this.bumperRed.x, this.bumperRed.y, `1`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setStroke('#000', 4).setVisible(false).setDepth(200);
	this.popUp2 = this.add.text(this.bumperBlue.x, this.bumperBlue.y, `1`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setStroke('#000', 4).setVisible(false).setDepth(200);
	this.popUp3 = this.add.text(this.bumperGreen.x, this.bumperGreen.y, `10`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setStroke('#000', 4).setVisible(false).setDepth(200);
	this.popUp4 = this.add.text(this.bumperYellow.x, this.bumperYellow.y, `5`, {fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'}).setStroke('#000', 4).setVisible(false).setDepth(200);
//bumper logic
	this.bumperSet1 = false; this.bumperSet2 = false;
	this.randomNum = Math.floor(Math.random() * 12);
	if (this.randomNum >= 6)
	{
		this.bumperSet1 = true; this.bumperSet2 = false;
		this.bumperBeets.setVisible(false).setActive(false);
		this.bumperEggplant.setVisible(false).setActive(false);
		this.bumperTomato.setVisible(false).setActive(false);
		this.bumperChili.setVisible(false).setActive(false);
	} 
	else
	{
		this.bumperSet1 = false; this.bumperSet2 = true;
		this.bumperMushroom.setVisible(false).setActive(false);
		this.bumperBasil.setVisible(false).setActive(false);
		this.bumperGarlic.setVisible(false).setActive(false);
		this.bumperOnion.setVisible(false).setActive(false);
	}

///swanky idle (botton right)
	this.swankyIdle = this.add.sprite(648, 1080, 'swanky_8bit_idle_fr1').setScale(0.5).setFlipX(true).play('sv_8bit_idle_anims', true);

/////////widget			
	this.rect = new Phaser.Geom.Rectangle(180, 550, 450, 160);
	this.graphics = this.add.graphics({fillStyle: {color: 0x000000}}).fillRectShape(this.rect).setAlpha(0).setDepth(100);
	this.onePlay = this.add.text(280, 580, "1 play: $5", {font: "40px Digitizer", fill: '#ff0000'}).setStroke("#ffff00", 4).setShadow(2, 2, '#000000', true, false).setAlpha(0).setInteractive().on('pointerover', ()=>{
		this.onePlay.setTint(0x5B0707);
	}).on('pointerout', ()=>this.onePlay.clearTint()).on('pointerdown', ()=>{
			if (doughAvailable >= 1)
			{
				pinballScore = 0;
				this.ringEcho.play(); navigator.vibrate(20);
				doughAvailable -= 5;
				pinballBallNum = 1;
				this.hideWidgetTween.play();
				this.time.delayedCall(1000, ()=>{
				this.ball.setVelocityY(-35);  //launch ball
				this.time.delayedCall(1000, ()=>this.initPinball = false); 
			  });
			}
			else this.notEnoughDoughTween.play();
	}).setDepth(100);
	this.fivePlays = this.add.text(280, 650, "3 plays: $10", {font: "40px Digitizer", fill: '#FF0000'}).setStroke("#ffff00", 4).setShadow(2, 2, '#000000', true, false).setAlpha(0).setInteractive().on('pointerover', ()=>{
		this.fivePlays.setTint(0x5B0707);
	}).on('pointerout', ()=>this.fivePlays.clearTint()).on('pointerdown', ()=>{
			if (doughAvailable >= 5)
			{
				pinballScore = 0;
				this.ringEcho.play(); navigator.vibrate(20);
				doughAvailable -= 10;
				pinballBallNum = 3;
				this.hideWidgetTween.play();
				this.time.delayedCall(1000, ()=>{
				this.ball.setVelocityY(-35);  //launch ball
				this.time.delayedCall(1000, ()=>this.initPinball = false); 
			  });
			}
			else this.notEnoughDoughTween.play();
	}).setDepth(100);
	this.quit = this.add.text(550, 570, "quit", {font: "25px Digitizer", fill: '#FFFF00'}).setAlpha(0).setInteractive().on('pointerover', ()=>{
		this.quit.setTint(0xff0000);
	}).on('pointerout', ()=>this.quit.clearTint()).on('pointerdown', ()=>{
		this.clickSnd.play();
		this.time.delayedCall(500, ()=>{
			this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
				if(progress > .9) window.location.assign('https://rossmarinaro.github.io/portfolio/games');
			});	
		});
	}).setDepth(100);
////display widget
this.displayWidgetTween = this.tweens.add({
	targets: [this.graphics, this.onePlay, this.fivePlays, this.quit], alpha: 1, duration: 200, ease: 'Linear', onComplete: ()=>{
	    this.gameState = true;
		this.onePlay.setInteractive(true);
		this.fivePlays.setInteractive(true);
		this.quit.setInteractive(true);
	}
}).pause();
////hide widget
this.hideWidgetTween = this.tweens.add({
	targets: [this.graphics, this.onePlay, this.fivePlays, this.quit], alpha: 0, duration: 200, ease: 'Linear', onComplete: ()=>{
		this.onePlay.setInteractive(true);
		this.fivePlays.setInteractive(true);
		this.quit.setInteractive(true);
	}
}).pause();
		
////swanky velvet dialog
	this.time.delayedCall(1500, ()=>{
		this.speechBub = this.add.sprite(488, 980, 'speech_bub_fr1').play('speech_bub_anims');
		this.svTxt1 = this.add.text(410, 950, `step right up!`, { font: "35px Bangers", fill: '#000', align: "center" }).setAlpha(0).setDepth(50);
		this.svTxt2 = this.add.text(410, 930, `	  1 play: $5,
 3 plays: $10`, { font: "35px Bangers", fill: '#000', align: "center" }).setAlpha(0).setDepth(50);
		this.svTxt3 = this.add.text(390, 950, `Not enough dough...`, { font: "30px Bangers", fill: '#000', align: "center" }).setAlpha(0).setDepth(50);
		this.svTxt4 = this.add.text(410, 950, `Play again?`, { font: "35px Bangers", fill: '#000', align: "center" }).setAlpha(0).setDepth(50);
	//not enough dough
 		this.notEnoughDoughTween = this.tweens.add({
			 targets: [this.speechBub, this.svTxt3], alpha: 1, duration: 1200, ease: 'Power1', repeat: 0, onStart: ()=> this.errorSound.play(),
			 onUpdate: ()=>{
				 this.svTxt4.setVisible(false); this.svTxt3.setVisible(true);
			 }, onComplete: ()=>{
				this.time.delayedCall(2000, ()=>{
					this.tweens.add({targets: [this.speechBub, this.svTxt3], alpha: 0, duration: 1200, ease: 'Power1', repeat: 0});
				});
			 }
		 }).pause();
	//play again
		 this.playAgainTween = this.tweens.add({
			targets: [this.speechBub, this.svTxt4], alpha: 1, duration: 1200, ease: 'Power1', repeat: 0, onComplete: ()=>{
			   this.time.delayedCall(2000, ()=>{
				   this.tweens.add({ targets: [this.speechBub, this.svTxt4], alpha: 0, duration: 1200, ease: 'Power1', 
				   onUpdate: ()=>{
						this.svTxt4.setVisible(true); this.svTxt3.setVisible(false);
					}, repeat: 0
				   });
			   });
			}
		}).pause();
		this.tweens.add({
			targets: this.svTxt1, alpha: { value: 1, ease: 'Power1', duration: 1200 }, repeat: 0, onComplete: ()=>{
				this.time.delayedCall(2000, ()=>{
					this.tweens.add({
						targets: this.svTxt1, alpha: { value: 0, ease: 'Power1', duration: 1200 }, repeat: 0, onComplete: ()=>{
							this.tweens.add({
								targets: this.svTxt2, alpha: { value: 1, ease: 'Power1', duration: 1200 }, repeat: 0, onComplete: ()=>{
									this.time.delayedCall(2000, ()=>{
										this.tweens.add({
											targets: [this.speechBub, this.svTxt2], alpha: { value: 0, ease: 'Power1', duration: 1200 }, repeat: 0, onComplete: ()=>{
												this.time.delayedCall(500, ()=>{	
													this.displayWidgetTween.play();
												});
											}
										});
									});
								}
							});
						}
					});
				});
			}
		});
	}); 
/////ball
	this.playerOnFire = false;
	this.ball = this.matter.add.sprite(720, 1000, 'ball', {restitution: 1}).setCircle(85).setScale(0.2).setBounce(1.01).setOnCollideWith(this.bumperRed, ()=>{
		if (this.bumperSet1 === true) 
		{
			if (this.bumperMushroom.x === this.bumperRed.x)
			{
				this.bumperMushroom.setTint(0xff0000);
				this.timesHitMushroom++;
				this.timesHitBasil = 0; this.timesHitGarlic = 0; this.timesHitOnion = 0;
			}
			else if (this.bumperBasil.x === this.bumperRed.x) 
			{
				this.bumperBasil.setTint(0xff0000);
				this.timesHitBasil++;
				this.timesHitMushroom = 0; this.timesHitOnion = 0; this.timesHitGarlic = 0;
			}
			else if (this.bumperGarlic.x === this.bumperRed.x)
			{
				this.bumperGarlic.setTint(0xff0000);
                this.timesHitGarlic++;
				this.timesHitOnion; this.timesHitMushroom = 0; this.timesHitBasil = 0;
			}
			else if (this.bumperOnion.x === this.bumperRed.x)
			{
				this.bumperOnion.setTint(0xff0000);
				this.timesHitOnion++;
				this.timesHitMushroom = 0; this.timesHitBasil = 0; this.timesHitGarlic = 0; 
			}
		}
		else if (this.bumperSet2 === true) 
		{
			if (this.bumperTomato.x === this.bumperRed.x)
			{
				this.bumperTomato.setTint(0xff0000);
				this.timesHitTomato++;
				this.timesHitBeets = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperEggplant.x === this.bumperRed.x)
			{
				this.bumperEggplant.setTint(0xff0000);
				this.timesHitEggplant++;
				this.timesHitTomato = 0; this.timesHitBeets = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperChili.x === this.bumperRed.x)
			{
				this.bumperChili.setTint(0xff0000);
				this.timesHitHitChili++;
				this.timesHitBeets = 0; this.timesHitTomato = 0; this.timesHitEggplant = 0;
			}
			else if (this.bumperBeets.x === this.bumperRed.x)
			{
				this.bumperBeets.setTint(0xff0000);
				this.timesHitBeets++;
				this.timesHitTomato = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}	
		}
		this.bumperRed.setTint(0xff0000); this.popUp1.setVisible(true);
		this.itemRing2.play();
		pinballScore++; 
		this.time.delayedCall(250, ()=>{
			this.bumperRed.clearTint(); this.popUp1.setVisible(false);
			this.bumperMushroom.clearTint(); this.bumperBasil.clearTint(); this.bumperGarlic.clearTint(); this.bumperOnion.clearTint(); 
			this.bumperChili.clearTint(); this.bumperBeets.clearTint(); this.bumperEggplant.clearTint(); this.bumperTomato.clearTint();
		});
	}).setOnCollideWith(this.bumperGreen, ()=>{
		if (this.bumperSet1 === true) 
		{
			if (this.bumperMushroom.x === this.bumperGreen.x)
			{
				this.bumperMushroom.setTint(0xff0000);
				this.timesHitMushroom++;
				this.timesHitBasil = 0; this.timesHitGarlic = 0; this.timesHitOnion = 0;
			}
			else if (this.bumperBasil.x === this.bumperGreen.x) 
			{
				this.bumperBasil.setTint(0xff0000);
				this.timesHitBasil++;
				this.timesHitMushroom = 0; this.timesHitOnion = 0; this.timesHitGarlic = 0;
			}
			else if (this.bumperGarlic.x === this.bumperGreen.x)
			{
				this.bumperGarlic.setTint(0xff0000);
				this.timesHitGarlic++;
				this.timesHitOnion; this.timesHitMushroom = 0; this.timesHitBasil = 0;
			}
			else if (this.bumperOnion.x === this.bumperGreen.x)
			{
				this.bumperOnion.setTint(0xff0000);
				this.timesHitOnion++;
				this.timesHitMushroom = 0; this.timesHitBasil = 0; this.timesHitGarlic = 0; 
			}
		}
		else if (this.bumperSet2 === true) 
		{
			if (this.bumperTomato.x === this.bumperGreen.x)
			{
				this.bumperTomato.setTint(0xff0000);
				this.timesHitTomato++;
				this.timesHitBeets = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperEggplant.x === this.bumperGreen.x)
			{
				this.bumperEggplant.setTint(0xff0000);
				this.timesHitEggplant++;
				this.timesHitTomato = 0; this.timesHitBeets = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperChili.x === this.bumperGreen.x)
			{
				this.bumperChili.setTint(0xff0000);
				this.timesHitHitChili++;
				this.timesHitBeets = 0; this.timesHitTomato = 0; this.timesHitEggplant = 0;
			}
			else if (this.bumperBeets.x === this.bumperGreen.x)
			{
				this.bumperBeets.setTint(0xff0000);
				this.timesHitBeets++;
				this.timesHitTomato = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}
		}
		this.bumperGreen.setTint(0xff0000); this.popUp3.setVisible(true);
		this.itemRing2.play();
		pinballScore += 5; 
		this.time.delayedCall(250, ()=>{
			this.bumperGreen.clearTint(); this.popUp3.setVisible(false);
			this.bumperMushroom.clearTint(); this.bumperBasil.clearTint(); this.bumperGarlic.clearTint(); this.bumperOnion.clearTint(); 
			this.bumperChili.clearTint(); this.bumperBeets.clearTint(); this.bumperEggplant.clearTint(); this.bumperTomato.clearTint();
		});
	}).setOnCollideWith(this.bumperBlue, ()=>{
		if (this.bumperSet1 === true) 
		{
			if (this.bumperMushroom.x === this.bumperBlue.x)
			{
				this.bumperMushroom.setTint(0xff0000);
				this.timesHitMushroom++;
				this.timesHitBasil = 0; this.timesHitGarlic = 0; this.timesHitOnion = 0;
			}
			else if (this.bumperBasil.x === this.bumperBlue.x) 
			{
				this.bumperBasil.setTint(0xff0000);
				this.timesHitBasil++;
				this.timesHitMushroom = 0; this.timesHitOnion = 0; this.timesHitGarlic = 0;
			}
			else if (this.bumperGarlic.x === this.bumperBlue.x)
			{
				this.bumperGarlic.setTint(0xff0000);
				this.timesHitGarlic++;
				this.timesHitOnion; this.timesHitMushroom = 0; this.timesHitBasil = 0;
			}
			else if (this.bumperOnion.x === this.bumperBlue.x)
			{
				this.bumperOnion.setTint(0xff0000);
				this.timesHitOnion++;
				this.timesHitMushroom = 0; this.timesHitBasil = 0; this.timesHitGarlic = 0; 
			}
		}
		else if (this.bumperSet2 === true) 
		{
			if (this.bumperTomato.x === this.bumperBlue.x)
			{
				this.bumperTomato.setTint(0xff0000);
				this.timesHitTomato++;
				this.timesHitBeets = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperEggplant.x === this.bumperBlue.x)
			{
				this.bumperEggplant.setTint(0xff0000);
				this.timesHitEggplant++;
				this.timesHitTomato = 0; this.timesHitBeets = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperChili.x === this.bumperBlue.x)
			{
				this.bumperChili.setTint(0xff0000);
				this.timesHitHitChili++;
				this.timesHitBeets = 0; this.timesHitTomato = 0; this.timesHitEggplant = 0;
			}
			else if (this.bumperBeets.x === this.bumperBlue.x)
			{
				this.bumperBeets.setTint(0xff0000);
				this.timesHitBeets++;
				this.timesHitTomato = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}
		}
		this.bumperBlue.setTint(0xff0000); this.popUp2.setVisible(true);
		this.itemRing2.play();
		pinballScore += 10; 
		this.time.delayedCall(250, ()=>{
			this.bumperBlue.clearTint(); this.popUp2.setVisible(false);
			this.bumperMushroom.clearTint(); this.bumperBasil.clearTint(); this.bumperGarlic.clearTint(); this.bumperOnion.clearTint(); 
			this.bumperChili.clearTint(); this.bumperBeets.clearTint(); this.bumperEggplant.clearTint(); this.bumperTomato.clearTint();
		});
	}).setOnCollideWith(this.bumperYellow, ()=>{
		if (this.bumperSet1 === true) 
		{
			if (this.bumperMushroom.x === this.bumperYellow.x)
			{
				this.bumperMushroom.setTint(0xff0000);
				this.timesHitMushroom++;
				this.timesHitBasil = 0; this.timesHitGarlic = 0; this.timesHitOnion = 0;
			}
			else if (this.bumperBasil.x === this.bumperYellow.x) 
			{
				this.bumperBasil.setTint(0xff0000);
				this.timesHitBasil++;
				this.timesHitMushroom = 0; this.timesHitOnion = 0; this.timesHitGarlic = 0;
			}
			else if (this.bumperGarlic.x === this.bumperYellow.x)
			{
				this.bumperGarlic.setTint(0xff0000);
                this.timesHitGarlic++;
				this.timesHitOnion; this.timesHitMushroom = 0; this.timesHitBasil = 0;
			}
			else if (this.bumperOnion.x === this.bumperYellow.x)
			{
				this.bumperOnion.setTint(0xff0000);
				this.timesHitOnion++;
				this.timesHitMushroom = 0; this.timesHitBasil = 0; this.timesHitGarlic = 0; 
			}
		}
		else if (this.bumperSet2 === true) 
		{
			if (this.bumperTomato.x === this.bumperYellow.x)
			{
				this.bumperTomato.setTint(0xff0000);
				this.timesHitTomato++;
				this.timesHitBeets = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperEggplant.x === this.bumperYellow.x)
			{
				this.bumperEggplant.setTint(0xff0000);
				this.timesHitEggplant++;
				this.timesHitTomato = 0; this.timesHitBeets = 0; this.timesHitHitChili = 0;
			}
			else if(this.bumperChili.x === this.bumperYellow.x)
			{
				this.bumperChili.setTint(0xff0000);
				this.timesHitHitChili++;
				this.timesHitBeets = 0; this.timesHitTomato = 0; this.timesHitEggplant = 0;
			}
			else if (this.bumperBeets.x === this.bumperYellow.x)
			{
				this.bumperBeets.setTint(0xff0000);
				this.timesHitBeets++;
				this.timesHitTomato = 0; this.timesHitEggplant = 0; this.timesHitHitChili = 0;
			}	
		}
		this.bumperYellow.setTint(0xff0000); this.popUp4.setVisible(true);
		this.itemRing2.play();
		pinballScore ++; 
		this.time.delayedCall(250, ()=>{
			this.bumperYellow.clearTint(); this.popUp4.setVisible(false);
			this.bumperMushroom.clearTint(); this.bumperBasil.clearTint(); this.bumperGarlic.clearTint(); this.bumperOnion.clearTint(); 
			this.bumperChili.clearTint(); this.bumperBeets.clearTint(); this.bumperEggplant.clearTint(); this.bumperTomato.clearTint();
		});
	});


///////////////////////////////////////////////////////////////
/////center pin
	this.centerPin = this.matter.add.sprite(370, 950, 'pinball_center_pin', {restitution: 1}).setCircle(15, {isStatic: true});
////flippers
this.flipperLeft = this.matter.add.image(270, 915, 'pinball_flipper').setScale(0.7).setRectangle(100, 40, {isStatic: true}).setAngle(47).setOnCollideWith(this.ball, ()=>{ 
	if (this.powerShot === true && this.ball.active) this.ball.setVelocityX(20).setVelocityY(-10);
});
this.flipperRight = this.matter.add.image(470, 915, 'pinball_flipper').setScale(0.7).setRectangle(100, 40, {isStatic: true}).setAngle(310).setOnCollideWith(this.ball, ()=>{ 
	if (this.powerShot === true && this.ball.active) this.ball.setVelocityX(-20).setVelocityY(-10);
});
this.flipperRight.flipY = true; this.flipperRight.flipX = true;
	this.flipperLeftTween = this.tweens.add({targets: this.flipperLeft, angle: -60, duration: 100, ease: 'Linear', yoyo: true}).pause();
	this.flipperRightTween = this.tweens.add({targets: this.flipperRight, angle: 40, duration: 100, ease: 'Linear', yoyo: true}).pause();

  this.powerShot = false;
  this.input.on('pointerdown', ()=>this.powerShot = true).on('pointerup', ()=>this.powerShot = false);
  this.input.keyboard.on('keydown', ()=> this.powerShot = true).on('keyup', ()=> this.powerShot = false);

  //buttons
  this.buttonLeft = this.matter.add.sprite(80, 955, 'pinball_button').setCircle(50, {isStatic: true}).setInteractive().on('pointerdown', ()=>{
	this.flipperLeftTween.play(); navigator.vibrate(30);
  }).setFlipX(true);
  this.buttonRight = this.matter.add.sprite(648, 955, 'pinball_button').setCircle(50, {isStatic: true}).setInteractive().on('pointerdown', ()=>{
	this.flipperRightTween.play(); navigator.vibrate(30);
  });
  this.keyLeft = this.input.keyboard.on('keydown-LEFT', ()=> {
	  this.flipperLeftTween.play();
	  this.keyLeft.active = false;
  }).on('keyup-LEFT', ()=> this.keyLeft.active = true);
  this.keyRight = this.input.keyboard.on('keydown-RIGHT', ()=> {
	this.flipperRightTween.play(); this.keyRight.active = false;
  }).on('keyup-RIGHT', ()=> this.keyRight.active = true);
//   this.matter.world.on('collisionstart', ()=>{
// 	if (this.powerShot === true)
// 	{
// 		this.ball.setBounce(1).setVelocityY(-70);
// 	} 
// });

/////fire particles
	this.fireParticles = this.add.particles('fire_fr1');
	this.emitter = this.fireParticles.createEmitter({speed: 100, scale: {start: 1, end: 0},blendMode: 'ADD'}).setAlpha(0.7).startFollow(this.ball);

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 update(time, delta) {
 
	
	
///////bumper power ups
	if (this.timesHitMushroom === 3)
	{
		//trippy render
		this.mushroom = this.matter.add.sprite(400, 400, 'pixel_mushroom').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.sick.play(); this.gulp.play();
			this.itemRing.play(); this.warpSound.play();
			this.itemsGroup.getChildren().map(child => child.destroy());
			this.cameras.main.setPostPipeline(HueRotatePostFX);
			this.time.delayedCall(10000, ()=>this.cameras.main.resetPostPipeline());
			this.pickedUpText.setText('You picked up a mushroom!').setAlpha(1);
			pinballScore += 20;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(-150);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.mushroom);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(e => e.destroy()));
	} 
	if (this.timesHitBasil === 3)
	{
		this.basil = this.matter.add.sprite(400, 400, 'pixel_basil').setCircle(50).setVelocityY(-10).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.sick.play(); this.gulp.play();
			this.itemsGroup.getChildren().map(e => e.destroy());
		    this.pickedUpText.setText('You picked up some basil!').setAlpha(1);
			pinballScore += 10;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(-150);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.basil);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(e => e.destroy()));
	} 
	if (this.timesHitOnion === 3)
	{
		this.onion = this.matter.add.sprite(400, 400, 'pixel_onion').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.sick.play(); this.gulp.play();
			this.itemsGroup.getChildren().map(e => e.destroy());
		    this.pickedUpText.setText('You picked up an onion!').setAlpha(1);
			pinballScore += 10;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(-150);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.onion);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(e => e.destroy()));
	} 
	if (this.timesHitGarlic === 3)
	{
		this.garlic = this.matter.add.sprite(400, 400, 'pixel_garlic').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.sick.play(); this.gulp.play();
			this.itemsGroup.getChildren().map(e => e.destroy());
		    this.pickedUpText.setText('You picked up some garlic!').setAlpha(1);
			pinballScore += 10;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(-150);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.garlic);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(e => e.destroy()));
	} 
	if (this.timesHitHitChili === 3)
	{
		this.chili = this.matter.add.sprite(400, 400, 'pixel_chili').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.fireFx.play(); this.playerHitSound.play();
			this.itemsGroup.getChildren().map(child => child.destroy());
			this.ball.setVelocityY(-45); pinballScore -= 10;
			this.playerOnFire = true;
		});
		this.itemsGroup.add(this.chili);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(child => child.destroy()));
	} 
	if (this.playerOnFire === true) this.time.delayedCall(10000, ()=> this.playerOnFire = false);
	this.playerOnFire === true ? this.fireParticles.setVisible(true) : this.fireParticles.setVisible(false);
	if (this.timesHitBeets === 3)
	{
		this.beets = this.matter.add.sprite(400, 400, 'pixel_beets').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.sick.play(); this.gulp.play(); 
			this.itemsGroup.getChildren().map(child => child.destroy());
			// this.ball.setTexture('pastaform_fr1').play('pastaform_anims', true).setScale(0.5).setCircle(45);
			// this.time.delayedCall(10000, ()=>this.ball.anims.stop().setTexture('ball').setScale(0.2).setCircle(85));
			this.pickedUpText.setText('You picked up some beets!').setAlpha(1);
			pinballScore += 30;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(-150);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.beets);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(child => child.destroy()));
	} 
	if (this.timesHitTomato === 3)
	{
		this.tomato = this.matter.add.sprite(400, 400, 'pixel_tomato').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.sick.play(); this.gulp.play();
			this.itemsGroup.getChildren().map(child => child.destroy());
			this.ball.setVelocityY(-45);
			this.pickedUpText.setText('You picked up a tomato!').setAlpha(1);
			pinballScore += 20;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(-150);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.tomato);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(child => child.destroy()));
	} 
	if (this.timesHitEggplant === 3)
	{
		this.eggplant = this.matter.add.sprite(400, 400, 'pixel_eggplant').setCircle(50).setVelocityY(-5).setOnCollideWith(this.ball, ()=>{
			this.itemRing.play(); this.sick.play(); this.gulp.play();
			this.itemsGroup.getChildren().map(child => child.destroy());
			this.ball.setVelocityY(-10);
			this.pickedUpText.setText('You picked up an eggplant!').setAlpha(1);
            pinballScore += 10;
			this.emoji = this.physics.add.sprite(400, 600, 'ayokay_emoji').setVelocityY(100);
			this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
			this.time.delayedCall(1000, () => {
				this.emoji.destroy();
				this.pickedUpText.setAlpha(0);
			});
		});
		this.itemsGroup.add(this.eggplant);
		this.time.delayedCall(10000, ()=>this.itemsGroup.getChildren().map(child => child.destroy()));
	} 
	////bumper sets
	//1
	if (this.timesHitMushroom >= 3 || this.timesHitBasil >= 3 || this.timesHitOnion >= 3 || this.timesHitGarlic >= 3) 
	{
		this.transformSound1.play(); this.bkgnd1_2Tween.play();
		this.randomShuffle = Math.floor(Math.random() * 9); console.log(this.randomShuffle)
		this.bumperSet1 = false; this.bumperSet2 = true;
		this.timesHitMushroom = 0; this.timesHitBasil = 0; this.timesHitOnion = 0; this.timesHitGarlic = 0;
		if (this.randomShuffle <= 3)
		{
			this.bumperBeets.setPosition(this.bumperBlue.x, this.bumperBlue.y).setVisible(true).setActive(true);
			this.bumperEggplant.setPosition(this.bumperRed.x, this.bumperRed.y).setVisible(true).setActive(true);
			this.bumperTomato.setPosition(this.bumperGreen.x, this.bumperGreen.y).setVisible(true).setActive(true);
			this.bumperChili.setPosition(this.bumperYellow.x, this.bumperYellow.y).setVisible(true).setActive(true);
			this.bumperMushroom.setVisible(false).setActive(false);
			this.bumperBasil.setVisible(false).setActive(false);
			this.bumperGarlic.setVisible(false).setActive(false);
			this.bumperOnion.setVisible(false).setActive(false);
		}
		else if (this.randomShuffle < 6 && this.randomShuffle > 3){
			this.bumperBeets.setPosition(this.bumperGreen.x, this.bumperGreen.y).setVisible(true).setActive(true);
			this.bumperEggplant.setPosition(this.bumperYellow.x, this.bumperYellow.y).setVisible(true).setActive(true);
			this.bumperTomato.setPosition(this.bumperBlue.x, this.bumperBlue.y).setVisible(true).setActive(true);
			this.bumperChili.setPosition(this.bumperRed.x, this.bumperRed.y).setVisible(true).setActive(true);
			this.bumperMushroom.setVisible(false).setActive(false);
			this.bumperBasil.setVisible(false).setActive(false);
			this.bumperGarlic.setVisible(false).setActive(false);
			this.bumperOnion.setVisible(false).setActive(false);
		}
		else if (this.randomShuffle < 9 && this.randomShuffle > 6){
			this.bumperBeets.setPosition(this.bumperRed.x, this.bumperRed.y).setVisible(true).setActive(true);
			this.bumperEggplant.setPosition(this.bumperBlue.x, this.bumperBlue.y).setVisible(true).setActive(true);
			this.bumperTomato.setPosition(this.bumperYellow.x, this.bumperYellow.y).setVisible(true).setActive(true);
			this.bumperChili.setPosition(this.bumperGreen.x, this.bumperGreen.y).setVisible(true).setActive(true);
			this.bumperMushroom.setVisible(false).setActive(false);
			this.bumperBasil.setVisible(false).setActive(false);
			this.bumperGarlic.setVisible(false).setActive(false);
			this.bumperOnion.setVisible(false).setActive(false);
		}
	}
	//2
	if (this.timesHitTomato >= 3 || this.timesHitEggplant >= 3 || this.timesHitBeets >= 3 || this.timesHitHitChili >= 3) 
	{
		this.transformSound1.play(); this.bkgnd1_2Tween.play();
		this.randomShuffle = Math.floor(Math.random() * 9); console.log(this.randomShuffle)
		this.bumperSet1 = true; this.bumperSet2 = false;
		this.timesHitTomato = 0; this.timesHitEggplant = 0; this.timesHitBeets = 0; this.timesHitHitChili = 0;
		if (this.randomShuffle <= 3)
		{
			this.bumperMushroom.setPosition(this.bumperGreen.x, this.bumperGreen.y).setVisible(true).setActive(true);
			this.bumperBasil.setPosition(this.bumperYellow.x, this.bumperYellow.y).setVisible(true).setActive(true);
			this.bumperGarlic.setPosition(this.bumperBlue.x, this.bumperBlue.y).setVisible(true).setActive();
			this.bumperOnion.setPosition(this.bumperRed.x, this.bumperRed.y).setVisible(true).setActive(true);
			this.bumperBeets.setVisible(false).setActive(false);
			this.bumperEggplant.setVisible(false).setActive(false);
			this.bumperTomato.setVisible(false).setActive(false);
			this.bumperChili.setVisible(false).setActive(false);
		}
		else if (this.randomShuffle < 6 && this.randomShuffle > 3){
			this.bumperMushroom.setPosition(this.bumperBlue.x, this.bumperBlue.y).setVisible(true).setActive(true);
			this.bumperBasil.setPosition(this.bumperRed.x, this.bumperRed.y).setVisible(true).setActive(true);
			this.bumperGarlic.setPosition(this.bumperGreen.x, this.bumperGreen.y).setVisible(true).setActive();
			this.bumperOnion.setPosition(this.bumperYellow.x, this.bumperYellow.y).setVisible(true).setActive(true);
			this.bumperBeets.setVisible(false).setActive(false);
			this.bumperEggplant.setVisible(false).setActive(false);
			this.bumperTomato.setVisible(false).setActive(false);
			this.bumperChili.setVisible(false).setActive(false);
		}
		else if (this.randomShuffle < 6 && this.randomShuffle > 3){
			this.bumperMushroom.setPosition(this.bumperYellow.x, this.bumperYellow.y).setVisible(true).setActive(true);
			this.bumperBasil.setPosition(this.bumperGreen.x, this.bumperGreen.y).setVisible(true).setActive(true);
			this.bumperGarlic.setPosition(this.bumperRed.x, this.bumperRed.y).setVisible(true).setActive();
			this.bumperOnion.setPosition(this.bumperBlue.x, this.bumperBlue.y).setVisible(true).setActive(true);
			this.bumperBeets.setVisible(false).setActive(false);
			this.bumperEggplant.setVisible(false).setActive(false);
			this.bumperTomato.setVisible(false).setActive(false);
			this.bumperChili.setVisible(false).setActive(false);
		}
	}
	///////if pinball falls down launch shaft
		if (this.initPinball === false && this.ball.x >= 720 && this.ball.y >= 950) this.ball.setPosition(720, 980).setVelocityY(-35).setVelocityX(0);
	//////if the ball goes into the ditch
		if (this.ball.y >= 1000 || this.ball.y <= 50 && this.gameState === true) 
		{
			this.gameState = false;
			reduceTries(); 
			if (pinballBallNum >= 1) this.ball.setPosition(720, 980).setVelocityY(-35).setVelocityX(0); 
			else //game over
			{
				this.errorSound.play();
				//high score
				if (pinballScore > pinballHighScoreQuantity) 
				{
					setHighScore();
					this.frigYeah.play(); this.ohhh.play(); this.recordScratch.play();
					this.pinballHighScoreTween.play();
					this.pinballCollideBool = true;
					this.timesHitBasil = 0; this.timesHitBeets = 0; this.timesHitEggplant = 0; this.timesHitGarlic = 0;
					this.timesHitHitChili = 0; this.timesHitMushroom = 0; this.timesHitOnion = 0; this.timesHitTomato = 0;
					this.emoji = this.physics.add.sprite(300, 450, 'ayokay_emoji').setVelocityY(-150).setScale(2);
					this.emojiTween = this.tweens.add({targets: this.emoji, alpha: 0, duration: 2000, ease: 'Linear'});
					this.time.delayedCall(3000, () => {
						this.emoji.destroy();
						this.pinballCollideBool = false;
					});
				}
				this.displayWidgetTween.play();
				this.playAgainTween.play();
				this.ball.setPosition(720, 980).setVelocity(0, 0); this.initPinball = true;
			}
		} 
		this.pinballScoreText2.setText(pinballScore);
		this.pinballHighScoreText2.setText(pinballHighScoreQuantity);
		this.pinballBall.setText(pinballBallNum);
		this.doughQuantity.setText(doughAvailable);
 }//end update 

//end class 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//reduce tries
function reduceTries(){
	 return pinballBallNum--;
}
//set high score
function setHighScore(scene){
		pinballHighScoreQuantity = pinballScore;
		doughAvailable += Math.floor(pinballHighScoreQuantity / 2); //set dough quantity to half of the high score
}
