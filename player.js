(function() {'use strict';

	function Player(src) {
		Entity.call(this, 'player.png');

		this.position = new Vec2(level.width / 2, level.height / 2);
		// this.position = new Vec2(0, 0);
		this.size = new Vec2(64, 64);

		// this.bbScale = 0.75;
	}

	extendClass(Player, Entity, {
		bbScale: 0.75,
		speed: 10,
		cameraSpeed: 5,
		update: function() {
			var move = Vec2.ZERO;
			if(keyboard.isDown('w')) {
				move = move.add(Vec2.UP);
			}
			if(keyboard.isDown('s')) {
				move = move.add(Vec2.DOWN);
			}
			if(keyboard.isDown('a')) {
				move = move.add(Vec2.LEFT);
			}
			if(keyboard.isDown('d')) {
				move = move.add(Vec2.RIGHT);
			}
			if(move.isNotZero()) {
				this.move(Vec2.move(move, this.speed));
			}

			move = Vec2.ZERO;
			if(keyboard.isDown('up')) {
				move = move.add(Vec2.UP);
			} 
			if(keyboard.isDown('down')) {
				move = move.add(Vec2.DOWN);
			}
			if(keyboard.isDown('left')) {
				move = move.add(Vec2.LEFT);
			}
			if(keyboard.isDown('right')) {
				move = move.add(Vec2.RIGHT);
			}
			if(move.isNotZero()) {
				camera.translate(Vec2.move(move, this.cameraSpeed));
			}

			debug.bb(this);
		}
	});

	window.Player = Player;

})();