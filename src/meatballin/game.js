/* ** MEATBALLIN */
import scaleRatio, { configHeight } from './index.js'

export default class Meatballin extends Phaser.Scene{

    constructor(){
         super({key: 'Meatballin'});
    }

     create(){
       
        this.GAME_WIDTH = 800;
        this.GAME_HEIGHT = 1200;
        // this.parent = new Phaser.Structs.Size(this.scale.gameSize.width, this.scale.gameSize.height).setSize(this.scale.gameSize.width, this.scale.gameSize.height);
        // this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent).setSize(this.scale.gameSize.width, this.scale.gameSize.height);

        // this.updateCamera();
        // this.scale.on('resize', this.resize, this);
        // this.guide = this.add.image(0, 0, 'guide').setOrigin(0, 0).setDepth(1).setVisible(false);
        // this.input.keyboard.on('keydown-X', () => this.guide.visible = !this.guide.visible);

        this.anims.create({
            key: 'pixel_meatball_anims', 
            frames: this.anims.generateFrameNames('pixel_meatball', {prefix: 'p1_walk', start: 1, end: 3, zeroPad: 2}),
            frameRate: 8, repeat: -1
        });
        this.anims.create({
            key: 'pixel_playerRed_walk_anims',
            frames: this.anims.generateFrameNames('pixel_playerRed', {prefix: 'p1_walk', start: 1, end: 7, zeroPad: 2}),
            frameRate: 8, repeat: -1, yoyo: true
        });
        this.anims.create({key: 'pixel_playerRed_attack_anims', frames: this.anims.generateFrameNames('pixel_playerRed', {prefix: 'p1_walk', start: 6, end: 6, zeroPad: 2})});
        this.anims.create({key: 'pixel_playerRed_jump_anims', frames: this.anims.generateFrameNames('pixel_playerRed', {prefix: 'p1_walk', start: 8, end: 8, zeroPad: 2})});
        this.anims.create({key: 'pixel_playerRed_idle_anims', frames: this.anims.generateFrameNames('pixel_playerRed', {prefix: 'p1_walk', start: 1, end: 1, zeroPad: 2})});

        this.bkgnd = this.add.image(350, 340,'wam_bkgnd');
        this.map = this.add.tilemap('wam_arcade_map_1');
        this.mapTiles = this.map.addTilesetImage('checkers'); 
        this.ground = this.map.createStaticLayer('World', this.mapTiles, 0, 0).setCollisionByExclusion([-1]);
        

    ////audio
        this.bitCrush_snd = this.sound.add('fire_fx').setVolume(6);
        this.errorSound = this.sound.add('error_sound').setVolume(8);
        this.jumpSnd = this.sound.add('transform1').setVolume(0.5);
        this.vanquishSnd = this.sound.add('macaroni_ring').setVolume(3);
        this.meatballHit = this.sound.add('meatball_hit').setVolume(2);
        this.swipeSound = this.sound.add('sword_swipe').setVolume(0.5);
        this.retroMusic = this.sound.add('retro_track1').setLoop(true);
        this.retroMusic.play();
        ////score
            this.currentScore = 0;
            this.scoreTxt = this.add.text(100, 160, "SCORE:", {font: "40px Digitizer", fill: "000"}).setStroke('#ff0000', 4).setDepth(10);
            this.scoreValue = this.add.text(260, 160, `0`, {font: "32px Digitizer", fill: "#000"}).setStroke('#ff0000', 4).setDepth(10);
            this.add.text(100, 210, `use arrow keys to move, space to attack`, {font: "18px Digitizer", fill: "#000"}).setStroke('#ffff00', 4).setDepth(1);
        ////this.player 
            this.rollingPin = this.add.sprite(420, 600, 'pixel_rollingPin').setVisible(false);
            this.player = this.physics.add.sprite(400, 640, 'pixel_playerRed');

            //meatballs
            this.meatballs = this.physics.add.group(),
            this.spawnX = Phaser.Math.Between(200, 600),
            this.spawnY = Phaser.Math.Between(50, 200);
            this.time.addEvent({delay: 2000, callback: spawnMeatballs, callbackScope: this, repeat: -1});
            function spawnMeatballs(){
                if (this.meatballs.getChildren().length < 3) 
                {
                    this.meatballs.create(this.spawnX, this.spawnY, 'pixel_meatball').play('pixel_meatball_anims', true).setCircle(40).setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20).setInteractive();
                    this.bitCrush_snd.play();
                }
            } 
                this.physics.add.overlap(this.meatballs, this.ground, () => {
                this.meatballs.getChildren().filter(child => { 
                    this.childCollide = this.physics.world.overlap(this.ground, child);
                        if (child && this.childCollide === true) child.flipX === true ? child.setFlipX(false) : child.setFlipX(true);
                });
            });

       //weapons and groups.items groups     
            this.playerWeapon = this.physics.add.group({runChildUpdate: true});
            this.weaponHitbox = this.playerWeapon.create(this.player.x, this.player.y, ``).setVisible(false).setCircle(7); this.weaponHitbox.body.setAllowGravity(false).setImmovable(true);

////collisions
            this.physics.add.collider(this.player, this.ground);
            this.physics.add.collider(this.meatballs, this.ground);
            this.physics.add.collider(this.meatballs, this.player, ()=>{
               // this.scoreValue = this.scoreValue;
                this.errorSound.play();
                this.scene.pause('Meatballin');
                this.scene.launch('Meatball_GameOver');
            });
            //iterate and destroy groups.this.meatballs
            this.meatballOverlap = this.physics.add.overlap(this.weaponHitbox, this.meatballs, () => {
                this.meatballs.getChildren().filter(child => { 
                     this.childCollide = this.physics.world.overlap(this.weaponHitbox, child);
                        if (child && this.childCollide === true)
                        {
                        child.setTint(0x000000, child, true);
                        this.childCollide = false; this.meatballOverlap.active = false;
                        this.currentScore++;
                        this.time.delayedCall(150, ()=>{
                            this.meatballHit.play(); this.vanquishSnd.play();
                            this.childCollide = true; this.meatballOverlap.active = true;
                            child.destroy(child, true);
                        });
                    } 
                });
            });

////////ui
            this.ui = this.add.image(400, 600,'ui').setDepth(10000000)//.setScale(scaleRatio);
            this.input.addPointer(2);
            this.pointer = this.input.activePointer,
            this.moveRight = false, this.moveLeft = false, this.playerJumps = false, this.playerAttacks = false,
            this.leftBtn = this.add.image(150, 1000, 'bumper_yellow').setScale(1.3).setDepth(10000001).setInteractive().on('pointerdown', ()=>{
                navigator.vibrate(20); this.moveRight = false; this.moveLeft = true;
            }).on('pointerup', ()=>{
                this.moveRight = false; this.moveLeft = false;
            }).on('pointerout', ()=>{
                this.moveRight = false; this.moveLeft = false;
            });
            this.rightBtn = this.add.image(300, 1000, 'bumper_yellow').setScale(1.3).setDepth(10000001).setInteractive().on('pointerdown', ()=>{
                navigator.vibrate(20); this.moveRight = true; this.moveLeft = false;
            }).on('pointerup', ()=>{
                this.moveRight = false; this.moveLeft = false;
            }).on('pointerout', ()=>{
                this.moveRight = false; this.moveLeft = false;
            });
        ////buttons
            //attack
            this.add.image(600, 1100, 'bumper_red').setInteractive().setScale(1.3).setDepth(10000001).on('pointerdown', ()=>{
                navigator.vibrate(30); 
                this.playerAttacks = true;
            }).on('pointerup', ()=> this.playerAttacks = false).on('pointerout', ()=> this.playerAttacks = false);
            //jump
            this.add.image(700, 1000, 'bumper_blue').setInteractive().setScale(1.3).setDepth(10000001).on('pointerdown', ()=>{
                navigator.vibrate(30); 
                this.playerJumps = true;
                this.time.delayedCall(500, ()=>{
                    this.playerJumps = false;
                    this.player.anims.stop().play('pixel_playerRed_jump_anims', true);
                });
            }).on('pointerup', ()=> this.playerJumps = false).on('pointerout', ()=> this.playerJumps = false);
    ////////////////////////////////////////keyboard
            this.input.keyboard.on('keydown-LEFT', ()=>{
                this.moveRight = false; this.moveLeft = true; 
            }).on('keyup-LEFT', ()=>{
                this.moveRight = false; this.moveLeft = false;
            });
            this.input.keyboard.on('keydown-RIGHT', ()=>{
               this.moveRight = true; this.moveLeft = false;
            }).on('keyup-RIGHT', ()=>{
                this.moveRight = false; this.moveLeft = false;
            });
            this.input.keyboard.on('keydown-UP', ()=>{
                this.playerJumps = true;
                this.time.delayedCall(500, ()=>{
                    this.playerJumps = false;
                    this.player.anims.stop().play('pixel_playerRed_jump_anims', true);
                });
            }).on('keyup-UP', ()=> this.playerJumps = false);
            this.input.keyboard.on('keydown-SPACE', ()=> this.playerAttacks = true)
            .on('keyup-SPACE', ()=> this.playerAttacks = false);

        //  this.container = this.add.container();
        //  this.container.add(this.ui)//for (let i of this.children.getChildren()) this.container.add([i]);
        //  this.container.setPosition(0, 300);
        //this.cameras.main.centerOn(400, 800)
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)//.setZoom(1.2)//.setViewport(0, 0, innerWidth, innerHeight);
    }

    update(){

        //score update
           this.scoreValue.setText(this.currentScore);
        //rolling pin
            this.player.flipX === true ? this.rollingPin.setPosition(this.player.x - 65, this.player.y).setFlipX(true).setAngle(10) : this.rollingPin.setPosition(this.player.x + 65, this.player.y).setFlipX(false).setAngle(-10);

        ////this.player movements
            //attack
            if (this.playerAttacks === true && this.moveRight === false && this.moveLeft === false && this.playerJumps === false)
            {
                this.swipeSound.play();
                this.rollingPin.setVisible(true);
                this.player.anims.play('pixel_playerRed_attack_anims', true).setVelocity(0, 0);
                this.player.flipX === true ? this.weaponHitbox.x = this.player.x - 80 : this.weaponHitbox.x = this.player.x + 90;
                this.weaponHitbox.y = this.player.y;
                this.player.body.onFloor() === true ? this.time.delayedCall(100, ()=> this.playerAttacks = false) : this.player.setVelocityY(300);
            } 
            else {
                this.rollingPin.setVisible(false);
                this.weaponHitbox.setPosition(-10000, -10000);
            }
        //jump
            if (this.player.body.onFloor() && this.playerJumps === true && this.playerAttacks === false){
                this.player.anims.play('pixel_playerRed_jump_anims', true).setVelocityY(-450);
                this.jumpSnd.play();
            }
        //left
            if (this.moveLeft === true && this.moveRight === false)
            {
                this.cameras.main.setLerp(0.1).setFollowOffset(-150, 0);
                this.player.body.onFloor() ? this.player.anims.play('pixel_playerRed_walk_anims', true) : this.player.anims.play('pixel_playerRed_jump_anims', true);
                this.player.setVelocityX(-200).setFlipX(true);
            } 
        //right
            if (this.moveRight === true && this.moveLeft === false)
            {
                this.cameras.main.setLerp(0.1).setFollowOffset(150, 0);
                this.player.body.onFloor() ? this.player.anims.play('pixel_playerRed_walk_anims', true) : this.player.anims.play('pixel_playerRed_jump_anims', true);
                this.player.setVelocityX(200).setFlipX(false);
            } 
        //idle
            if (this.moveRight === false && this.moveLeft === false && this.playerJumps === false && this.playerAttacks === false && this.player.body.onFloor()){
                this.player.anims.play('pixel_playerRed_idle_anims', true).setVelocity(0, 360);
            }
            
    }
//     resize (gameSize)
//     {
//         const width = gameSize.width;
//         const height = gameSize.height;
//         this.parent.setSize(width, height);
//         this.sizer.setSize(width, height);
//         this.updateCamera();
//     }
//     updateCamera ()
//     {
//       //  const offset = 
//         const camera = this.cameras.main;
//         const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
//         const y = 0//this.cameras.main.width < 500 ? this.cameras.main.height / 2 : screenTop;//0 + offset;
//         const scaleX = this.sizer.width / this.GAME_WIDTH;
//         const scaleY = this.sizer.height / this.GAME_HEIGHT;
//         camera.setViewport(x, y, this.cameras.main.width, this.cameras.main.height).setZoom(Math.max(scaleX, scaleY)).centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
//     }
//     getZoom ()
//     {
//         return this.cameras.main.zoom;
//     }

    }
/////////////////////////////////////////////////////////////////////

 
