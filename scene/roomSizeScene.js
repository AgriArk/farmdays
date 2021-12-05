console.log('roomSizeScene.js running');

var roomNumber;

var roomSizeScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "roomSizeScene" });
    },
    init: function() {
    },

    preload:function() {
        this.load.image("bg", "../assets/background.png");
        this.load.image("text", "../assets/roomSizeScenes/roomSize-Menu.png");
        this.load.image("smol", "../assets/roomScenes/smol.png");
        this.load.image("medium", "../assets/roomScenes/medium.png");
        this.load.image("large", "../assets/roomScenes/large.png");
    },
    
    create: function(){
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(0, 0, 'text').setOrigin(0, 0).setScale(0.24);
        this.smol = this.add.sprite(235,300, 'smol').setInteractive().setScale(0.9);
        this.medium = this.add.sprite(450,300, 'medium').setInteractive().setScale(0.9);
        this.large = this.add.sprite(675,300, 'large').setInteractive().setScale(0.9);

        this.smol.on('pointerdown', function(pointer){roomNumber = 0;}, this);
        this.medium.on('pointerdown', function(pointer){roomNumber = 1;}, this);
        this.large.on('pointerdown', function(pointer){roomNumber = 2;}, this);
    },
    
    update: function(){
        if (roomNumber != null) {
            this.scene.start("gameScene", {
                "roomNumber": roomNumber
            });
        };
    }
});