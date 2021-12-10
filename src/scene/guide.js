console.log('guide.js running');

var guideScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "guideScene" });
    },
    init: function(data) {
        this.checkreset = data.reset;
        
    },

    preload:function() {
        this.load.image("bg", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/background.png");
        this.load.image("guide", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/guideScenes/How-To-Menu.png");
        this.load.image("arrow", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/guideScenes/arrow.png");
    },
    
    create: function(){
        console.log("guideScreen loaded");
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(25, 0, 'guide').setOrigin(0, 0).setScale(0.25);
        this.nextButton = this.add.sprite(980,540, 'arrow').setInteractive().setScale(0.3);
        this.nextButton.on('pointerdown', function(pointer){
            console.log('next button is triggered');
            this.scene.start("roomSizeScene");
            if (this.checkreset){
                this.scene.start('roomSizeScene');
            }
        }, this);
		this.scale.displaySize.setAspectRatio( 1100/600 );
		this.scale.refresh();
    },
    
    update: function(){
    }
});