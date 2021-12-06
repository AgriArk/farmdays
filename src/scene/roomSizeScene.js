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
        this.load.image("bg", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/background.png");
        this.load.image("text", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomSizeScenes/roomSize-Menu.png");
        this.load.image("smol", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomScenes/smol.png");
        this.load.image("medium", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomScenes/medium.png");
        this.load.image("large", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomScenes/large.png");
    },
    
    create: function(){
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(0, 0, 'text').setOrigin(0, 0).setScale(0.3);
        this.smol = this.add.sprite(240,300, 'smol').setInteractive().setScale(1.5);
        this.medium = this.add.sprite(580,300, 'medium').setInteractive().setScale(1.5);
        this.large = this.add.sprite(920,300, 'large').setInteractive().setScale(1.5);

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