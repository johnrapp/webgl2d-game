(function() {'use strict';

	function getTexture(src) {
		var texture = gl.createTexture();
		var image = new Image();
		image.onload = function() {
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		}
		image.src = src;

		return texture;
	}

	function Sprite(src) {
		this.texture = getTexture(src);
	}

	Sprite.prototype = {
		position: Vec2.ZERO,
		radius: Vec2.ONE,
		rotation: 0,
		update: function() {
		},
		render: function(camera) {
			camera.render(this);	
		},
		bind: function(matrixUniform) {
			gl.bindTexture(gl.TEXTURE_2D, this.texture);

			gl.uniformMatrix3fv(matrixUniform, false, this.getMatrix());
		},
		translate: function(translation) {
			this.position = this.position.add(translation);
		},
		scale: function(scalar) {
			this.radius = this.radius.scale(scalar);
		},
		getMatrix: function() {
			var matrix = mat3.create();
			mat3.translate(matrix, matrix, this.position.toArray());
			mat3.scale(matrix, matrix, this.radius.toArray());
			// mat3.translate(matrix, matrix, [(this.position.x - 512) / 512, (this.position.y - 512) / 512]);
			// mat3.translate(matrix, matrix, [(this.position.x), (this.position.y)]);
			// mat3.scale(matrix, matrix, [this.size.x, this.size.y]);
			// mat3.scale(matrix, matrix, [this.size.x / 512, this.size.y / 512]);
			mat3.rotate(matrix, matrix, this.rotation);
			return matrix;
		}
	};

	Object.defineProperties(Sprite.prototype, {
		size: {
			get: function() {
				return this.radius.scale(2);
			},
			set: function(size) {
				this.radius = size.scale(0.5);
			}
		},
		width: {
			get: function() {
				return this.radius.x * 2;
			},
			set: function(width) {
				this.radius.x = width / 2;;
			}
		},
		height: {
			get: function() {
				return this.radius.y * 2;
			},
			set: function(height) {
				this.radius.y = height / 2;;
			}
		}
	});

	window.Sprite = Sprite;

})();