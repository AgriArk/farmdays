// const e = require("express");

console.log('game.js running')

var textStyle = {
    fontSize: 30, 
    color: "#000000", 
    fontStyle: "bold"
};

var smolDict = {
    'currentElectricity': 0,
    'totalElectricityAllowable': 1,
    'currentLeaf': 0 , 
    'totalLeafAllowable': 1, 
    'currentRobot': 0, 
    'totalRobotAllowable': 1,
    'choices': {},
    "natural":      { "x": 550, "y": 290, "scale": 1.25},
    "renewable":    { "x": 550, "y": 290, "scale": 1.25},
    "hydroponic":   { "x": 370, "y": 280, "scale": 0.9},
    "soil":         { "x": 370, "y": 280, "scale": 1.5},
    "aquaponic":    { "x": 380, "y": 280, "scale": 1.25},
    "harvester":    { "x": 500, "y": 310, "scale": 1.4},
    "seeding":      { "x": 475, "y": 330, "scale": 1.2},
    "sensor":       { "x": 415, "y": 320, "scale": 1.5},
    "human":        { "x": 280, "y": 310, "scale": 2.0}
};

var mediumDict = {
    'currentElectricity': 0,
    'totalElectricityAllowable': 1,
    'currentLeaf': 0 , 
    'totalLeafAllowable': 1, 
    'currentRobot': 0, 
    'totalRobotAllowable': 2,
    'choices': {},
    "natural":      { "x": 490, "y": 280, "scale": 1.25},
    "renewable":    { "x": 490, "y": 280, "scale": 1.25},
    "hydroponic":   { "x": 300, "y": 300, "scale": 1},
    "soil":         { "x": 300, "y": 300, "scale": 1.8},
    "aquaponic":    { "x": 300, "y": 300, "scale": 1.4},
    "harvester":    { "x": 555, "y": 280, "scale": 1.5},
    "seeding":      { "x": 440, "y": 330, "scale": 1.25},
    "sensor":       { "x": 310, "y": 370, "scale": 1.5},
    "human":        { "x": 180, "y": 340, "scale": 2.0}
};

var largeDict = {
    'currentElectricity': 0,
    'totalElectricityAllowable': 1,
    'currentLeaf': 0 , 
    'totalLeafAllowable': 1, 
    'currentRobot': 0, 
    'totalRobotAllowable': 3,
    'choices': {},
    "natural":      { "x": 500, "y": 200, "scale": 1.25},
    "renewable":    { "x": 500, "y": 200, "scale": 1.25},
    "hydroponic":   { "x": 300, "y": 290, "scale": 1.1},
    "soil":         { "x": 300, "y": 290, "scale": 1.9},
    "aquaponic":    { "x": 310, "y": 290, "scale": 1.5},
    "harvester":    { "x": 610, "y": 240, "scale": 1.5},
    "seeding":      { "x": 470, "y": 300, "scale": 1.25},
    "sensor":       { "x": 300, "y": 340, "scale": 1.5},
    "human":        { "x": 195, "y": 328, "scale": 2.0}
};

var gameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "gameScene" });
    },
    init: function(data) {
        this.roomNumber =  data.roomNumber;//0 = smol, 1 = medium, 2 = large
        this.initialTime = 300; //5 minutes timer
        this.initialHuman = 0; //initial manpower 
    },
    preload: function() {
        //background and sidebar
        this.load.image("bg", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/background.png");
        this.load.image("sb", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/sidebar.png");
        this.load.image("reset", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/resetButton.png");
        this.load.image("questionMark", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/questionMark.png");
        this.load.image("cheats", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/cheatSheet.png");

        //buttons
        this.load.image("electricity", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/electricity.png");
        this.load.image("human", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/human.png");
        this.load.image("leaf", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/leaf.png");
        this.load.image("robot", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/robot.png");
        this.load.image("done-button", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/done-button.png");        
        
        //option tiles
        this.load.image("harvester", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/harvester.png");
        this.load.image("hydroponic", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/hydroponics-structure.png");
        this.load.image("soil", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/soil-planter.png");
        this.load.image("aquaponic", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/aquaponics.png");
        this.load.image("natural", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/natural.png");
        this.load.image("renewable", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/renewable.png");
        this.load.image("seeding", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/seeding.png");
        this.load.image("sensor", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/water-sensor.png");
        this.load.image("quantity", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/quantity.png");
        this.load.image("plus", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/plus.png");
        this.load.image("minus", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/tiles/minus.png");
        
        //image of the room
        switch(this.roomNumber) {
            case 0:
                this.load.image("roomImage", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomScenes/smol.png");
                this.roomData = smolDict;
                break;
            case 1: 
                this.load.image("roomImage", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomScenes/medium.png");
                this.roomData = mediumDict;
                break;
            case 2:
                this.load.image("roomImage", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/roomScenes/large.png");
                this.roomData = largeDict;
                break;
        }
		this.doneButton = null;                 //hard coded reset of variables
		this.roomData['currentElectricity'] = 0;
		this.roomData['currentLeaf'] = 0;
		this.roomData['currentRobot'] = 0;
		this.roomData['choices'] = {};
		//alert(this.roomData['currentLeaf']);
    },

    create: function() {
        //variable to toggle the display of options for electricity, leaf, robot and human
        this.showElectricity = false;
        this.showLeaf = false;
        this.showRobot = false;
        this.showHuman = false;
        this.showCheats = false;

        //adding background and sidebar onto the canvas
        //0,0 is the top left corner of the canvas
        //setorigin sets the image pointer to the top left corner of the image, else it will be in the center of the image automatically
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(750, 25, 'sb').setOrigin(0, 0).setScale(1.1);
        this.reset = this.add.image(60, 70, 'reset').setOrigin(0, 0).setScale(0.1).setInteractive();
        this.reset.on('pointerdown', function(pointer){
            console.log('reset');
			//this.roomNumber = 10;
            this.scene.start("guideScene", {"reset": true});
            this.scene.moveAbove("gameScene", "roomSizeScene");
            this.scene.stop();
        }, this);
        this.questionMark = this.add.sprite(120, 70, 'questionMark').setOrigin(0, 0).setInteractive().setScale(0.11);
        this.questionMark.on('pointerdown', function(pointer){
            this.showCheats = !this.showCheats;
            this.cheatsDisplay();
        }, this);
        
        //adding image of room onto the canvas
        this.room = this.add.image(100, 30, "roomImage").setOrigin(0, 0);
        this.room.setScale(2.6);
        
        //adding in-game error message
        this.errorText = this.add.text(420, 445, '', textStyle);
        
        //adding countdown timer at the top of the page
        this.timeText = this.add.text(60,32, 'Countdown: ' + formatTime(this.initialTime), textStyle);
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
        this.electricitySprite = this.add.sprite(175,525, 'electricity').setInteractive().setScale(2);
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
        
        this.leafSprite = this.add.sprite(325,525, 'leaf').setInteractive().setScale(2);
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
        
        this.robotSprite = this.add.sprite(475,525, 'robot').setInteractive().setScale(2);
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
        
        this.humanSprite = this.add.sprite(625,525, 'human').setInteractive().setScale(2);
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
        this.naturalSprite = this.add.sprite(880, 125, 'natural').setInteractive().setVisible(0).setScale(1.2);
        this.renewableSprite = this.add.sprite(880, 300, 'renewable').setInteractive().setVisible(0).setScale(1.2);
        
        this.hydroponicSprite = this.add.sprite(860, 125, 'hydroponic').setInteractive().setVisible(0).setScale(0.7);
        this.soilSprite = this.add.sprite(860, 250, 'soil').setInteractive().setVisible(0).setScale(1.3);
        this.aquaponicSprite = this.add.sprite(860, 420, 'aquaponic').setInteractive().setVisible(0).setScale(1.2);
        
        this.harvesterSprite = this.add.sprite(895, 125, 'harvester').setInteractive().setVisible(0).setScale(1.2);
        this.seedingSprite = this.add.sprite(865, 300, 'seeding').setInteractive().setVisible(0).setScale(1.2);
        this.sensorSprite = this.add.sprite(825, 450, 'sensor').setInteractive().setVisible(0).setScale(1.5);
        
        this.quantitySprite = this.add.sprite(870, 100, 'quantity').setVisible(0).setScale(0.2);
        this.plusSprite = this.add.sprite(800, 150, 'plus').setInteractive().setVisible(0).setScale(0.2);
        this.minusSprite = this.add.sprite(900, 150, 'minus').setInteractive().setVisible(0).setScale(0.2);
        this.quantityText = this.add.text(845, 135, '', textStyle);
        
        //tiles triggers 
        this.naturalSprite.on('pointerdown', function(pointer){this.tileCallback('natural');}, this);
        this.renewableSprite.on('pointerdown', function(pointer){this.tileCallback('renewable');}, this);
        this.hydroponicSprite.on('pointerdown', function(pointer){this.tileCallback('hydroponic');}, this);
        this.soilSprite.on('pointerdown', function(pointer){this.tileCallback('soil');}, this);
        this.aquaponicSprite.on('pointerdown', function(pointer){this.tileCallback('aquaponic');}, this);
        this.harvesterSprite.on('pointerdown', function(pointer){this.tileCallback('harvester');}, this);
        this.seedingSprite.on('pointerdown', function(pointer){this.tileCallback('seeding');}, this);
        this.sensorSprite.on('pointerdown', function(pointer){this.tileCallback('sensor');}, this);
        this.plusSprite.on('pointerdown', function(pointer){this.quantityCallback(1);}, this);
        this.minusSprite.on('pointerdown', function(pointer){this.quantityCallback(-1);}, this);

        //cheatsheet
        this.cheats = this.add.sprite(25, 0, 'cheats').setOrigin(0, 0).setScale(0.22).setVisible(0).setInteractive();
        this.cheats.on('pointerdown', function(pointer){
            this.showCheats = false;
            this.cheatsDisplay();
        }, this);
		
    
    },

    update: function() {
        if (this.initialTime == 0){
            console.log('Times Up!')
            this.errorText.setText("Times Up!")
            if (this.initialHuman > 0){
                this.roomData['choices']['human'] = this.initialHuman;
            };
            this.scene.start("endScene", {
                "roomNumber": this.roomNumber,
                "choices": this.roomData['choices']
            });
        }
    },

    //callback to toggle cheats
    cheatsDisplay: function() {
        //console.log("cheats toggled");
        var x;
        if (this.showCheats){
            x = 1;
        } else {
            x = 0;
        }
        this.cheats.setVisible(x);
    },

    //callbacks to trigger side bar display, trigger event is respective button clicks
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
        var x;
        if (this.showHuman){
            x = 1;
            this.quantityText.setText(this.initialHuman);
        } else {
            x = 0;
            this.quantityText.setText("");
        }
        this.quantitySprite.setVisible(x);
        this.plusSprite.setVisible(x);
        this.minusSprite.setVisible(x);
    },

    quantityCallback: function(num){
        if (this.initialHuman == 0 && num < 0){
            this.errorText.setText("Manpower cannot be negative");
        } else{
            this.errorText.setText("");
            this.initialHuman += num;
            this.quantityText.setText(this.initialHuman);
        }
    },

    //callback to trigger placement of tiles on the room, trigger event is clicking on tiles on side bar
    tileCallback: function(sprite) {
        this.errorText.setText('');
        console.log('tile callback triggered');
        var category;
        if ( sprite == "natural" || sprite == "renewable") {
            category = "Electricity";
        } else if ( sprite == 'hydroponic' || sprite == 'soil' || sprite == "aquaponic" ) {
            category = "Leaf";
        } else if ( sprite == "harvester" || sprite == "seeding" || sprite == "sensor" ) {
            category = "Robot";
        };
        if (this.roomData['choices'][sprite] != null){
            console.log('already present');
            this.roomData['choices'][sprite].destroy()
            this.roomData ['current' + category] -= 1;
            delete this.roomData['choices'][sprite];
        } else if ( this.roomData['current'+ category] + 1 <= this.roomData['total' + category+ 'Allowable']) {
                spriteObj = this.add.sprite(this.roomData[sprite]["x"], this.roomData[sprite]["y"], sprite).setScale(this.roomData[sprite]["scale"]);
                console.log(sprite)
                this.roomData ['current' + category] += 1;
                this.roomData['choices'][sprite] = spriteObj;
                console.log(this.roomData['choices']);
        } else {
            this.errorText.setText('Insufficient space');
        };
        if ( this.roomData['currentElectricity'] == this.roomData['totalElectricityAllowable'] && 
            this.roomData['currentLeaf'] == this.roomData['totalLeafAllowable'] && 
            this.doneButton == null ){
                //adding in done button
                this.doneButton = this.add.sprite(580, 430, 'done-button').setInteractive().setOrigin(0,0).setScale(0.3);
                //done button trigger
                this.doneButton.on('pointerdown', function(pointer){
                    console.log('done button is triggered');
                    if (this.initialHuman > 0){
                        this.roomData['choices']['human'] = this.initialHuman;
                    };
                    this.scene.start("endScene", {
                        "roomNumber": this.roomNumber,
                        "choices": this.roomData['choices']
                    });
                }, this);
        };
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