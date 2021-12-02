console.log('test.js running')
var testScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "testScene" });
    },
    init: function(data) {
        this.message = data.message;
        this.totalScore = data.totalScore
    },
    preload: function() {
        this.load.image("bg", "../assets/background.png");
        this.load.image('ground', '../assets/tiles/hydroponics-structure.png');
    },
    create: function() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        var messageText = this.add.text(
            300, 200, this.message, {
                fontSize: 50, color: "#FFFFFF", fontStyle: "bold"
            }
        );
        var totalScoreText = this.add.text(
            360, 240, this.totalScore, {
                fontSize: 50, color: "#FFFFFF", fontStyle: "bold"
            }
        )
    },
    update: function() {

    }
});