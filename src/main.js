<<<<<<< HEAD
console.log("main.js loaded")
var config = {
    type: Phaser.AUTO, //renderer
    width: 800,
    height: 600,
    // scale: {
    //     parent: "main",
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH,
    //     width: 800,
    //     height: 500
    // },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { x:0, y:0 },
            gravity: { y:300 },
            debug: false
        }
    },
    //ordered, scenes are loaded from right to left, most left scene will appear
    scene: [ startScene, guideScene, roomSizeScene, gameScene, endScene ]  
};

=======
console.log("main.js loaded")
var config = {
    type: Phaser.AUTO, //renderer
    width: 800,
    height: 600,
    // scale: {
    //     parent: "main",
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH,
    //     width: 800,
    //     height: 500
    // },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { x:0, y:0 },
            gravity: { y:300 },
            debug: false
        }
    },
    //ordered, scenes are loaded from right to left, most left scene will appear
    scene: [ startScene, guideScene, roomSizeScene, gameScene, endScene ]  
};

>>>>>>> 7d54d4d9d47da0133a42262c1598622676bddf15
var game = new Phaser.Game(config);