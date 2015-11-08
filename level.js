(function() {'use strict';

	function Level(width, height) {
		Sprite.call(this, 'map.png');

		this.width = width;
		this.height = height;

		// this.position = new Vec2(0, 0);
		this.size = new Vec2(512, 512);
		this.position = new Vec2(this.width / 2, this.height / 2);

		this.entities = [];
	}

	extendClass(Level, Sprite, {
		addEntity: function(entity) {
			this.entities.push(entity);
		},
		update: function() {
			for(var i = 0, l = this.entities.length; i < l; i++) {
				this.entities[i].update();
			}
		},
		render: function() {
			camera.beginFrame();

			camera.render(this);

			for(var i = 0, l = this.entities.length; i < l; i++) {
				this.entities[i].render(camera);
			}

			camera.endFrame();
		}
	});

	window.Level = Level;

})();