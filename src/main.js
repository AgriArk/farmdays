console.log("main.js loaded")
var config = {
    type: Phaser.AUTO, //renderer
    //width: 800,
    //height: 500,
    scale: {
         
         mode: Phaser.Scale.FIT,
         autoCenter: Phaser.Scale.CENTER_BOTH,
         width: 1100,
         height: 600
    },
	
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

var game = new Phaser.Game(config);

/*function resizeApp ()
{
    // Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
    let game_ratio = 800 / 500;
	
    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('phaser-app');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';
	
    // Check if device DPI messes up the width-height-ratio
    let canvas	= document.getElementsByTagName('canvas')[0];
	
    let dpi_w	= parseInt(div.style.width) / canvas.width;
    let dpi_h	= parseInt(div.style.height) / canvas.height;		
	
    let height	= window.innerHeight * (dpi_w / dpi_h);
    let width	= height * game_ratio;
	
    // Scale canvas	
    canvas.style.width	= width + 'px';
    canvas.style.height	= height + 'px';
}

window.addEventListener('resize', resizeApp);*/