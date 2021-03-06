export default class Meatball_GameOver extends Phaser.Scene{

    constructor(){
        super({key:'Meatball_GameOver'});
    }
    create(){
            this.rect = new Phaser.Geom.Rectangle(180, 550, 440, 260);
            this.graphics = this.add.graphics({fillStyle: {color: 0x000000}}).fillRectShape(this.rect);
            this.gameOverTxt = this.add.text(280, 630, "GAME OVER", {font: "40px Digitizer", fill: "#ffff00"}).setStroke("#ff0000", 4)//.setShadow(2, 2, '#000000', true, false);
            this.tryAgainTxt = this.add.text(320, 690, "TRY AGAIN?", {font: "30px Digitizer", fill: "#ffffff"});
            this.yesTxt = this.add.text(320, 750, "YES", {font: "25px Digitizer", fill: "#ffff00"}).setInteractive().on('pointerdown', ()=>{
                navigator.vibrate(20); this.sound.stopAll();
                this.scene.start('Meatballin');
                this.scene.stop('Meatball_GameOver');
            });
            this.noTxt = this.add.text(460, 750, "NO", {font: "25px Digitizer", fill: "#ffff00"}).setInteractive().on('pointerdown', ()=>{
                navigator.vibrate(20);
                this.sound.stopAll(); this.sound.removeAll();
                this.scene.stop('Meatballin');
                this.scene.stop('Meatball_GameOver');
            });
  
        }
 }