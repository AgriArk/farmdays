console.log("mainjs loaded")
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }    
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bg', './assets/test.jpg');
    this.load.image('ground', './assets/tiles/hydroponics-structure.png')
}

function create ()
{
    //this.add is ordered from bottom to top, according to the order you arrange them below
    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}

function update ()
{
}
