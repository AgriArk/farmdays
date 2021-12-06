console.log('endScene.js running')

var animationList = ['seeding', "harvester", "aquaponic", "human", "sensor", "soil"];

var endScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "endScene" });
    },
    init: function(data) {
        this.roomNumber = data.roomNumber;//0 = smol, 1 = medium, 2 = large
        this.choices = data.choices;
    },
    preload: function() {
        //background and sidebar
        this.load.image("bg", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/background.png");
        this.load.image("sb", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/sidebar.png");

        //buttons
        this.load.image("electricity", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/electricity.png");
        this.load.image("human", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/human.png");
        this.load.image("leaf", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/leaf.png");
        this.load.image("robot", "https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/gameButtons/robot.png");     
        
        //option spritesheets and json
        this.load.multiatlas('seeding-anim', 'https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/animations/seeding-anim.json',"assets/animations");
        this.load.multiatlas('harvester-anim', 'https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/animations/harvester-anim.json',"assets/animations");
        this.load.multiatlas('sensor-anim', 'https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/animations/sensor-anim.json',"assets/animations");
        this.load.multiatlas('aquaponic-anim', 'https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/animations/aquaponic-anim.json',"assets/animations");
        this.load.multiatlas('soil-anim', 'https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/animations/soil-anim.json',"assets/animations");
        this.load.multiatlas('human-anim', 'https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/animations/human-anim.json',"assets/animations");
		
		//results
		this.load.image("productivity","https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/EndScene/productivity.png");
		this.load.image("profitability","https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/EndScene/Profitability.png");
		this.load.image("quantity","https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/EndScene/quantity.png");
		this.load.image("sustainability","https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/EndScene/sustainability.png");
		this.load.image("star","https://raw.githubusercontent.com/AgriArk/farmdays/main/src/assets/EndScene/star.png");
		
		
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
    },
    create: function() {
        //adding background and sidebar onto the canvas
        //0,0 is the top left corner of the canvas
        //setorigin sets the image pointer to the top left corner of the image, else it will be in the center of the image automatically
        this.add.image(0, 0, 'bg').setOrigin(0, 0); 
        this.add.image(550, 25, 'sb').setOrigin(0, 0).setScale(1.1);
        
        //adding image of room onto the canvas
        this.room = this.add.image(50, 75, "roomImage").setOrigin(0, 0);
        this.room.setScale(2);
        
        //adding buttons at the bottom of the page
        //for each button, upon clicked, it will toggle the display for the respective choices on and off
        this.humanSprite = this.add.sprite(475,525, 'human').setScale(2);
        this.robotSprite = this.add.sprite(350,525, 'robot').setScale(2);
        this.leafSprite = this.add.sprite(225,525, 'leaf').setScale(2);
        this.electricitySprite = this.add.sprite(100,525, 'electricity').setScale(2);
		
		//adding scores
		this.add.image(575, 120, 'productivity').setOrigin(0, 0).setScale(0.13);
		this.add.image(575, 480, 'profitability').setOrigin(0, 0).setScale(0.13);
		this.add.image(575, 360, 'sustainability').setOrigin(0, 0).setScale(0.13);
		this.add.image(575, 240, 'quantity').setOrigin(0, 0).setScale(0.13);
		
		var productivity_score = 0;
		var profitability_score = 0;
		var sustainability_score = 0;
        
        for (const sprite of Object.keys(this.choices)) {
            console.log(sprite);
			switch(sprite){
				case "renewable":
					sustainability_score+=2;
					break;
				case "aquaponic":
					sustainability_score++;
					productivity_score++;
					break;
				case "harvesting":
				case "seeding":
				case "sensors":
					productivity_score+=2/this.roomData["totalRobotAllowable"];
					break;
				case "hydroponic":
					productivity_score++;
					break;
				
			}
            if (animationList.indexOf(sprite ) >=0){
                console.log('animated loop');
                var frameNames = this.anims.generateFrameNames(sprite+'-anim', { start: 1 , end: 4, zeroPad: 3,
                        prefix: '', suffix: '.png'});
                this.anims.create({
                        key: sprite +'-emote',
                        frames: frameNames,
                        frameRate: 4,
                        repeat: -1
                });
                console.log(this.roomData);
                this.add.sprite(this.roomData[sprite]['x'], this.roomData[sprite]['y'], sprite+"-anim", '001.png').setScale(this.roomData[sprite]['scale']).play(sprite+'-emote');

            } else{
                console.log('static loop');
                this.add.sprite(this.roomData[sprite]["x"], this.roomData[sprite]['y'], sprite).setScale(this.roomData[sprite]['scale'])
            }
        };
		
		//adding stars
		for (i = 0; i<productivity_score; i++){
			this.add.image(565+i*60, 75, 'star').setOrigin(0, 0).setScale(0.25);
		}
		for (i = 0; i<sustainability_score; i++){
			this.add.image(565+i*60, 315, 'star').setOrigin(0, 0).setScale(0.25);
		}
        
    },
    update: function() {

    }
});