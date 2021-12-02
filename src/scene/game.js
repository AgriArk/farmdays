console.log('game.js running')

var smolDict = {
  roomPlaceX : 350,
  roomPlaceY : 300
};

var mediumDict = {
    roomPlaceX : 350,
    roomPlaceY : 300
};

var hardDict = {
    roomPlaceX : 350,
    roomPlaceY : 300
};

var gameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "gameScene" });
    },
    init: function(data) {
        this.roomSize = 2;//data.roomSize; //0 = smol, 1 = medium, 2 = large
        this.initialTime = 300; //5 minutes timer
    },
    preload: function() {
        //background and sidebar
        this.load.image("bg", "../assets/background.png");
        this.load.image("sb", "../assets/sidebar.png");

        //buttons
        this.load.image("electricity", "../assets/gameButtons/electricity.png");
        this.load.image("human", "../assets/gameButtons/human.png");
        this.load.image("leaf", "../assets/gameButtons/leaf.png");
        this.load.image("robot", "../assets/gameButtons/robot.png");
        
        //option tiles
        this.load.image("harvester", "../assets/tiles/harvester.png");
        this.load.image("hydroponics", "../assets/tiles/hydroponics-structure.png");
        this.load.image("soil", "../assets/tiles/soil-planter.png");
        
        //image of the room
        switch(this.roomSize) {
            case 0:
                this.load.image("roomImage", "../assets/roomScenes/smol.png");
                this.roomData = smolDict;
            case 1: 
                this.load.image("roomImage", "../assets/roomScenes/medium.png");
                this.roomData = mediumDict;
            case 2:
                this.load.image("roomImage", "../assets/roomScenes/large.png");
                this.roomData = hardDict;
        }
    },

    create: function() {
        console.log('THIS outside', this);
        this.showElectricity = false;
        //0,0 is the top left corner of the canvas
        //setorigin sets the image pointer to the top left corner of the image, else it will be in the center of the image automatically
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(550, 25, 'sb').setOrigin(0, 0).setScale(1.1);
        
        //buttons at the bottom of the page
        this.electricitySprite = this.add.sprite(100,500, 'electricity').setInteractive().setScale(2);
        this.electricitySprite.on("pointerdown", function (pointer) {
              this.electricitySprite.setTint(808080);
              this.showElectricity = !this.showElectricity;
              this.electricityDisplay(0);
            }, this)
        this.electricitySprite.on('pointerout', function(pointer){this.clearTint();});
        this.electricitySprite.on('pointerup', function(pointer){this.clearTint();});
        
        this.leafSprite = this.add.sprite(225,500, 'leaf').setInteractive().setScale(2);
        this.leafSprite.on('pointerout', function(pointer){this.clearTint();});
        this.leafSprite.on('pointerdown', function(pointer){this.setTint(808080); this.leafDisplay(pointer);});
        this.leafSprite.on('pointerup', function(pointer){this.clearTint();});
        
        this.robotSprite = this.add.sprite(350,500, 'robot').setInteractive().setScale(2);
        this.robotSprite.on('pointerout', function(pointer){this.clearTint();});
        this.robotSprite.on('pointerdown', function(pointer){this.setTint(808080); this.robotDisplay(pointer);});
        this.robotSprite.on('pointerup', function(pointer){this.clearTint();});
        
        this.humanSprite = this.add.sprite(475,500, 'human').setInteractive().setScale(2);
        this.humanSprite.on('pointerout', function(pointer){this.clearTint();});
        this.humanSprite.on('pointerdown', function(pointer){this.setTint(808080); this.humanDisplay(pointer);});
        this.humanSprite.on('pointerup', function(pointer){this.clearTint();});
        
        //adding image of room
        this.room = this.add.image(50, 100, "roomImage").setOrigin(0, 0);
        this.room.setScale(2);
        
        this.timeText = this.add.text(32,32, 'Countdown: ' + formatTime(this.initialTime),
            {
                fontSize: 30, color: "#FFFFFF", fontStyle: "bold"
            });
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.initialTime -= 1; // One second
                this.timeText.setText('Countdown: ' + formatTime(this.initialTime),
                    {
                        fontSize: 30, color: "#FFFFFF", fontStyle: "bold"
                    });
            }
        });

        //adding options tiles but set to not visible
        this.harvesterSprite = this.add.sprite(600, 300, 'harvester').setInteractive().setVisible(0);
           
    },

    update: function() {
    },
    electricityDisplay: function(buttonID) {
        console.log("Electricity Display triggered");
        var x;
        if (this.showElectricity){
            x = 1;
        } else {
            x = 0;
        }
        this.harvesterSprite.setVisible(x);
    }
});

function leafDisplay(pointer){
    console.log("Leaf Display triggered");
};

function robotDisplay(pointer){
    console.log("Robot Display triggered");
};

function humanDisplay(pointer){
    console.log("Human Display triggered");
};

function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}