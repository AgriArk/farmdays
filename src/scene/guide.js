console.log('guide.js running');

var guideScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "guideScene" });
    },
    init: function(data) {
        
    },

    preload:function() {
        this.load.image("bg", "https://github.com/AgriArk/farmdays/blob/main/src/assets/background.png");
        this.load.image("guide", "../assets/guideScenes/How-To-Menu.png");
        this.load.image("arrow", "../assets/guideScenes/arrow.png");
    },
    
    create: function(){
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(0, 0, 'guide').setOrigin(0, 0).setScale(0.24);
        this.nextButton = this.add.sprite(700,520, 'arrow').setInteractive().setScale(0.3);
        this.nextButton.on('pointerdown', function(pointer){
            console.log('next button is triggered');
            this.scene.start("roomSizeScene");
        }, this);
    },
    
    update: function(){
    }
});