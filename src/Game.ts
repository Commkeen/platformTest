class SimpleGame
{
	game:Phaser.Game;
	
	constructor()
	{
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
		this.game = new Phaser.Game( 720, 480, Phaser.AUTO, 'content', { preload:this.preload, create:this.create, update:this.update}, false, false );
		
	}
	
	preload()
	{
		// add our player image to the assets class under the
		// key 'player'. We're also setting the background colour
		// so it's the same as the background colour in the image
		
		this.game.load.spritesheet( 'clara', "assets/clara.png", 48, 48);
		this.game.load.spritesheet('terrain', "assets/crystalCaves.png", 32,32);
		this.game.load.tilemap('caveRoom', 'assets/caveRoom.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.stage.backgroundColor = 0xB20059;

		
	}
	
	create()
	{
		// add the 'player' sprite to the game, position it in the
		// center of the screen, and set the anchor to the center of
		// the image so it's centered properly. There's a lot of
		// centering in that last sentence
		var tilemap = this.game.add.tilemap('caveRoom');
		tilemap.addTilesetImage('foregroundTiles', 'terrain');
		var layer = tilemap.createLayer('foreground');
		layer.resizeWorld();

		var player = this.game.add.sprite( this.game.world.centerX - 200, this.game.world.centerY - 200, 'clara' );
		player.animations.add('stand', [1]);
		player.animations.play('stand');
		player.anchor.setTo( 0.5, 0.5 );
		this.game.camera.scale.x = 3;
		this.game.camera.scale.y = 3;
		this.game.camera.follow(player);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
		this.game.physics.enable([player], Phaser.Physics.ARCADE);

		player.body.collideWorldBounds = true;


		
	}

	update()
	{
		
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new SimpleGame();
}