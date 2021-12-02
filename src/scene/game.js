console.log('game.js running')
var gameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "gameScene" });
    },
    init: function() {},
    preload: function() {
        this.load.image("smol", "../assets/roomScenes/smol.png");
    },
    create: function() {
        this.room = this.add.image(640, 360, "smol");
        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                this.scene.start('testScene', {
                    "message": "Game Over"
                });
            }
        })
    },
    update: function() {}
});