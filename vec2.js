(function() {'use strict';

	function Vec2(x, y) {
		this.x = x;
		this.y = y;
	}

	Vec2.prototype = {
		add: function(vec2) {
			return new Vec2(this.x + vec2.x, this.y + vec2.y);
		},
		addX: function(x) {
			return new Vec2(this.x + x, this.y);
		},
		addY: function(y) {
			return new Vec2(this.x, this.y + y);
		},
		subtract: function(vec2) {
			return new Vec2(this.x - vec2.x, this.y - vec2.y);
		},
		multiply: function(vec2) {
			return new Vec2(this.x * vec2.x, this.y * vec2.y);
		},
		scale: function(scalar) {
			return new Vec2(this.x * scalar, this.y * scalar);
		},
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
		normalize: function() {
			var length = this.length();
			return new Vec2(this.x / length, this.y / length);
		},
		angle: function() {
			return Math.atan2(this.y, this.x);
		},
		copy: function() {
			return new Vec2(this.x, this.y);
		},
		abs: function() {
			return new Vec2(Math.abs(this.x), Math.abs(this.y));
		},
		sign: function() {
			return new Vec2(Math2.sign(this.x), Math2.sign(this.y));
		},
		isNotZero: function() {
			return this.x || this.y;
		},
		toArray: function() {
			return [this.x, this.y];
		}
	};

	Object.defineProperties(Vec2.prototype, {
		w: {
			get: function() {
				return this.x;
			},
			set: function(w) {
				this.x = w;
			}
		},
		h: {
			get: function() {
				return this.y;
			},
			set: function(h) {
				this.y = h;
			}
		}
	});

	extend(Vec2, {
		move: function(direction, speed) {
			return direction.normalize().scale(speed);
		},
		copy: function(vec2) {
			return new Vec2(vec2.x, vec2.y);
		}
	});

	Vec2.ZERO  = new Vec2( 0,  0);
	Vec2.ONE   = new Vec2( 1,  1);

	Vec2.UP    = new Vec2( 0,  1);
	Vec2.DOWN  = new Vec2( 0, -1);
	Vec2.LEFT  = new Vec2(-1,  0);
	Vec2.RIGHT = new Vec2( 1,  0);

	window.Vec2 = Vec2;

})();
