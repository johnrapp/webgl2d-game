'use strict';
var program = new ShaderProgram('vertexShader', 'fragmentShader');

var camera = new SpriteCamera(width, height, program);

var level = new Level(width, height);

var player = new Player();
level.addEntity(player);

// var otherPlayer = new Player();
// level.addEntity(otherPlayer);
// otherPlayer.translate(new Vec2(-100, -100));

createWall(255, 12, 512, 22);

createWall(255, 502, 512, 20);

createWall(13, 258, 26, 470);

createWall(55, 285, 60, 20);

createWall(210, 285, 114, 20);

createWall(378, 188, 225, 20);

createWall(499, 257, 25, 470);

createWall(255, 395, 24, 200);



// createWall(width - 22, 0, 20, 512);

// createWall(25 - width, 0, 25, 512);

// createWall(0, height - 22, 512, 20);

// createWall(0, 22 - height, 512, 20);

// createWall(0, 255, 24, 215);

// createWall(-115, 60, 92, 22);

// createWall(-405, 60, 58, 22);

// createWall(245, -138, 225, 22);



// window.addEventListener('mousemove', function(e) {
// 	var x = e.offsetX || e.layerX, y = e.offsetY || e.layerY;
// 	console.log('x: ' + x, 'y: ' + (512 - y));
// });

function createWall(x, y, w, h) {
	var wall = new Wall();
	wall.position = new Vec2(x, y);
	wall.size = new Vec2(w, h);
	level.addEntity(wall);
}

function update() {
	debug.clear();
	level.update();
}

function render() {
	level.render();
}

requestAnimationFrame(function frame() {
	update();
	render();
	requestAnimationFrame(frame);
});