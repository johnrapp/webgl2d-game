(function() {'use strict';

var getShader = (function () {
	var shaderMap = {
		'x-vertex': gl.VERTEX_SHADER,
		'x-fragment': gl.FRAGMENT_SHADER
	};

	return function getShader(id) {
		var element = document.getElementById(id);
		var shader = gl.createShader(shaderMap[element.type.replace('x-shader/', '')]);
		gl.shaderSource(shader, element.textContent);
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(shader));
			return;
		}

		return shader;
	}
})();

function ShaderProgram(vertexShaderId, fragmentShaderId) {
	this.vertexShader = getShader(vertexShaderId);
	this.fragmentShader = getShader(fragmentShaderId);

	this.link();
}

ShaderProgram.prototype = {
	link: function() {
		this.program = gl.createProgram();
		gl.attachShader(this.program, this.vertexShader);
		gl.attachShader(this.program, this.fragmentShader);
		gl.linkProgram(this.program);

		if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.error('Unable to initialize the shader program.');
		}
	},
	bind: function() {
		gl.useProgram(this.program);
	},
	createAttribute: function(name, size) {
		var attribute = gl.getAttribLocation(this.program, name);
		gl.enableVertexAttribArray(attribute);
		gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
	},
	createUniform: function(name) {
		return gl.getUniformLocation(this.program, name)
	}
}

window.ShaderProgram = ShaderProgram;
})();
