(function() {'use strict';

var spriteVertices = [
//	x	y
	-1, -1,
	 1, -1,
	 1,  1,
	-1,  1
];

var spriteTexCoords = [
//	x	y
	0, 1,
	1, 1,
	1, 0,
	0, 0
];

var spriteIndices = [
	0, 1, 2,
	0, 2, 3
];

function createBuffer(type, data) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(type, buffer);
	gl.bufferData(type, data, gl.STATIC_DRAW);
	
	return buffer;
}

function SpriteCamera(width, height, program) {
	this.width = width;
	this.height = height;

	this.program = program;
	program.bind();

	this.initDrawing();

	this.initBuffers();
}

SpriteCamera.prototype = {
	position: Vec2.ZERO,
	initDrawing: function() {
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		// gl.enable(gl.DEPTH_TEST);
		// gl.depthFunc(gl.LEQUAL);

		gl.viewport(0, 0, this.width, this.height);
		
		this.transform = mat3.create();
		mat3.translate(this.transform, this.transform, [-1, -1]);
		mat3.scale(this.transform, this.transform, [2 / this.width, 2 / this.height]);

		// mat3.scale(this.matrix, this.matrix, [1 / this.width, 1 / this.height]);
		// mat3.scale(this.matrix, this.matrix, [1 / this.width, 1 / this.height]);
		// mat3.translate(this.matrix, this.matrix, [-this.width, -this.height]);
	},
	initBuffers: function() {
		this.vertexBuffer = createBuffer(gl.ARRAY_BUFFER, new Float32Array(spriteVertices));
		this.positionAttribute = this.program.createAttribute('aPosition', 2);

		this.texCoordBuffer = createBuffer(gl.ARRAY_BUFFER, new Float32Array(spriteTexCoords));
		this.texCoordAttribute = this.program.createAttribute('aTexCoord', 2);

		this.indexBuffer = createBuffer(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(spriteIndices));

		this.transformMatrixUniform = this.program.createUniform('transformMatrix');
		gl.uniformMatrix3fv(this.transformMatrixUniform, false, this.transform);

		this.viewMatrixUniform = this.program.createUniform('viewMatrix');

		this.spriteMatrixUniform = this.program.createUniform('spriteMatrix');

		this.spriteUniform = this.program.createUniform('sprite');
		gl.uniform1i(this.spriteUniform, 0);

		this.playerPositionUniform = this.program.createUniform('playerPosition');
	},
	translate: function(translation) {
		this.position = this.position.add(translation);
	},
	beginFrame: function() {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		var viewMatrix = mat3.create();
		mat3.translate(viewMatrix, viewMatrix, this.position.toArray());
		gl.uniformMatrix3fv(this.viewMatrixUniform, false, viewMatrix);


		// var matrix = mat3.create();
		// mat3.translate(matrix, matrix, player.position.toArray());
		// mat3.multiply(matrix, this.matrix, matrix);
		// var position = vec2.transformMat3(vec2.create(), player.position.toArray(), this.matrix);

		// gl.uniform2fv(this.playerPositionUniform, position);
		gl.uniform2fv(this.playerPositionUniform, player.position.toArray());
	},
	render: function(sprite) {
		sprite.bind(this.spriteMatrixUniform);
		gl.drawElements(gl.TRIANGLES, spriteIndices.length, gl.UNSIGNED_SHORT, 0);
	},
	endFrame: function() {

	}
};

window.SpriteCamera = SpriteCamera;

})();