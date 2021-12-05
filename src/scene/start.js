console.log('start.js running');

var startScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "startScene" });
    },
    init: function() {
        
    },

    preload:function() {
        this.load.image("startMenu", "https://github.com/AgriArk/farmdays/blob/main/src/assets/startMenu.png");
    },
    
    create: function(){
        this.add.image(0, 0, 'startMenu').setOrigin(0, 0).setScale(0.24); 
        this.input.on('pointerdown', function(pointer){
            this.scene.start("guideScene");
        }, this);
    },
    
    update: function(){

    }
=======
console.log('start.js running');

var startScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "startScene" });
    },
    init: function() {
        
    },

    preload:function() {
        this.load.image("startMenu", "../assets/startMenu.png");
    },
    
    create: function(){
        this.add.image(0, 0, 'startMenu').setOrigin(0, 0).setScale(0.24); 
        this.input.on('pointerdown', function(pointer){
            this.scene.start("guideScene");
        }, this);
    },
    
    update: function(){

    }
});