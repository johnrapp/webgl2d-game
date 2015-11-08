(function() {

	var canvas = document.querySelector('canvas#debug'),
		ctx = canvas.getContext('2d'),
		width = canvas.width,
		height = canvas.height;

	function translate(position) {
		return new Vec2(position.x + camera.position.x, height - (position.y + camera.position.y));
	}

	window.debug = {
		clear: function() {
			ctx.clearRect(0, 0, width, height);
		},
		rect: function(position, radius) {
			var translated = translate(new Vec2(position.x - radius.x, position.y + radius.y));
			ctx.fillRect(translated.x, translated.y, radius.x * 2, radius.y * 2);
		},
		entity: function(entity) {
			this.rect(entity.position, entity.radius);
		},
		bb: function(entity) {
			this.rect(entity.position, entity.bbSize());
		}
	};
})();