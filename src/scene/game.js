console.log('game.js running')

var smolDict = {
    "natural": { "x": 275, "y": 280, "scale": 1.1},
    "renewable": { "x": 275, "y": 280, "scale": 1.1},
    "hydroponic": { "x": 300, "y": 300, "scale": 0.7},
    "soil": {"x": 300, "y": 300, "scale": 1.3},
    "aquaponic": {"x": 300, "y": 300, "scale": 1.1},
    "harvester": {"x": 375, "y": 325, "scale": 1.2},
    "seeding": {"x": 350, "y": 325, "scale": 1.2},
    "sensor": {"x": 350, "y": 325, "scale": 1.2}
};

var mediumDict = {    
    "natural": { "x": 600, "y": 200, "scale": 1.2}
};

var largeDict = {
    "natural": { "x": 100, "y": 400, "scale": 1.2}
};

var gameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "gameScene" });
    },
    init: function(data) {
        this.roomSize = 0;//data.roomSize; //0 = smol, 1 = medium, 2 = large
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
        this.load.image("hydroponic", "../assets/tiles/hydroponics-structure.png");
        this.load.image("soil", "../assets/tiles/soil-planter.png");
        this.load.image("aquaponic", "../assets/tiles/aquaponics.png");
        this.load.image("natural", "../assets/tiles/natural.png");
        this.load.image("renewable", "../assets/tiles/renewable.png");
        this.load.image("seeding", "../assets/tiles/seeding.png");
        this.load.image("sensor", "../assets/tiles/water-sensor.png");
        
        //image of the room
        switch(this.roomSize) {
            case 0:
                this.load.image("roomImage", "../assets/roomScenes/smol.png");
                this.roomData = smolDict;
                break;
            case 1: 
                this.load.image("roomImage", "../assets/roomScenes/medium.png");
                this.roomData = mediumDict;
                break;
            case 2:
                this.load.image("roomImage", "../assets/roomScenes/large.png");
                this.roomData = largeDict;
                break;
        }
    },

    create: function() {
        //variable to toggle the display of options for electricity, leaf, robot and human
        this.showElectricity = false;
        this.showLeaf = false;
        this.showRobot = false;
        this.showHuman = false;

        //adding background and sidebar onto the canvas
        //0,0 is the top left corner of the canvas
        //setorigin sets the image pointer to the top left corner of the image, else it will be in the center of the image automatically
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(550, 25, 'sb').setOrigin(0, 0).setScale(1.1);
        
        //adding image of room onto the canvas
        this.room = this.add.image(50, 100, "roomImage").setOrigin(0, 0);
        this.room.setScale(2);
        
        //adding countdown timer at the top of the page
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

        //adding buttons at the bottom of the page
        //for each button, upon clicked, it will toggle the display for the respective choices on and off
        this.electricitySprite = this.add.sprite(100,500, 'electricity').setInteractive().setScale(2);
        this.electricitySprite.on("pointerdown", function (pointer) {
              this.electricitySprite.setTint(808080);
              this.showElectricity = !this.showElectricity;
              this.showLeaf = false;
              this.showRobot = false;
              this.showHuman = false;
              this.electricityDisplay();
              this.leafDisplay();
              this.robotDisplay();
              this.humanDisplay();
            }, this)
        this.electricitySprite.on('pointerout', function(pointer){this.clearTint();});
        this.electricitySprite.on('pointerup', function(pointer){this.clearTint();});
        
        this.leafSprite = this.add.sprite(225,500, 'leaf').setInteractive().setScale(2);
        this.leafSprite.on('pointerout', function(pointer){this.clearTint();});
        this.leafSprite.on('pointerdown', function(pointer){
                this.leafSprite.setTint(808080);
                this.showLeaf = !this.showLeaf;
                this.showElectricity = false;
                this.showRobot = false;
                this.showHuman = false;
                this.electricityDisplay();
                this.leafDisplay();
                this.robotDisplay();
                this.humanDisplay();
            }, this);
        this.leafSprite.on('pointerup', function(pointer){this.clearTint();});
        
        this.robotSprite = this.add.sprite(350,500, 'robot').setInteractive().setScale(2);
        this.robotSprite.on('pointerout', function(pointer){this.clearTint();});
        this.robotSprite.on('pointerdown', function(pointer){
            this.robotSprite.setTint(808080);
            this.showRobot = !this.showRobot;
            this.showElectricity = false;
            this.showLeaf = false;
            this.showHuman = false;
            this.electricityDisplay();
            this.leafDisplay();
            this.robotDisplay();
            this.humanDisplay();
        }, this);
        this.robotSprite.on('pointerup', function(pointer){this.clearTint();});
        
        this.humanSprite = this.add.sprite(475,500, 'human').setInteractive().setScale(2);
        this.humanSprite.on('pointerout', function(pointer){this.clearTint();});
        this.humanSprite.on('pointerdown', function(pointer){
            this.humanSprite.setTint(808080);
            this.showHuman = !this.showHuman;
            this.showElectricity = false;
            this.showLeaf = false;
            this.showRobot = false;
            this.electricityDisplay();
            this.leafDisplay();
            this.robotDisplay();
            this.humanDisplay();
        }, this);
        this.humanSprite.on('pointerup', function(pointer){this.clearTint();});
                
        //adding options tiles but set to not visible
        this.naturalSprite = this.add.sprite(680, 125, 'natural').setInteractive().setVisible(0).setScale(1.2);
        this.renewableSprite = this.add.sprite(680, 300, 'renewable').setInteractive().setVisible(0).setScale(1.2);
        
        this.hydroponicSprite = this.add.sprite(660, 125, 'hydroponic').setInteractive().setVisible(0).setScale(0.7);
        this.soilSprite = this.add.sprite(660, 250, 'soil').setInteractive().setVisible(0).setScale(1.3);
        this.aquaponicSprite = this.add.sprite(660, 420, 'aquaponic').setInteractive().setVisible(0).setScale(1.2);
        
        this.harvesterSprite = this.add.sprite(695, 125, 'harvester').setInteractive().setVisible(0).setScale(1.2);
        this.seedingSprite = this.add.sprite(665, 300, 'seeding').setInteractive().setVisible(0).setScale(1.2);
        this.sensorSprite = this.add.sprite(625, 450, 'sensor').setInteractive().setVisible(0).setScale(1.5);
        
        //tiles triggers 
        this.naturalSprite.on('pointerdown', function(pointer){this.tileCallback('natural');}, this);
        this.renewableSprite.on('pointerdown', function(pointer){this.tileCallback('renewable');}, this);
        this.hydroponicSprite.on('pointerdown', function(pointer){this.tileCallback('hydroponic');}, this);
        this.soilSprite.on('pointerdown', function(pointer){this.tileCallback('soil');}, this);
        this.aquaponicSprite.on('pointerdown', function(pointer){this.tileCallback('aquaponic');}, this);
        this.harvesterSprite.on('pointerdown', function(pointer){this.tileCallback('harvester');}, this);
        this.seedingSprite.on('pointerdown', function(pointer){this.tileCallback('seeding');}, this);
        this.sensorSprite.on('pointerdown', function(pointer){this.tileCallback('sensor');}, this);
    
    },

    update: function() {
        if (this.initialTime == 0){
            this.scene.start("testScene ");
        }
    },

    electricityDisplay: function() {
        console.log("Electricity Display triggered");
        var x;
        if (this.showElectricity){
            x = 1;
        } else {
            x = 0;
        }
        this.naturalSprite.setVisible(x);
        this.renewableSprite.setVisible(x);
    },

    leafDisplay: function() {
        console.log("Leaf Display triggered");
        var x;
        if (this.showLeaf){
            x = 1;
        } else {
            x = 0;
        }
        this.hydroponicSprite.setVisible(x);
        this.soilSprite.setVisible(x);
        this.aquaponicSprite.setVisible(x);
    },

    robotDisplay: function() {
        console.log("Robot Display triggered");
        var x;
        if (this.showRobot){
            x = 1;
        } else {
            x = 0;
        }
        this.harvesterSprite.setVisible(x);
        this.seedingSprite.setVisible(x);
        this.sensorSprite.setVisible(x);
    },

    humanDisplay: function(){
        //NOT DONE: side bar display for human button
        console.log("Human Display triggered");
    },

    tileCallback: function(sprite) {
        console.log('tile callback triggered');
        console.log(this.roomSize)
        console.log(this.roomData)
        this.add.sprite(this.roomData[sprite]["x"], this.roomData[sprite]["y"], sprite).setScale(this.roomData[sprite]["scale"])
    }
});

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