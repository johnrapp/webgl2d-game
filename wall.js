(function() {'use strict';

	function Wall(src) {
		Entity.call(this, 'wall.png');
	}

	extendClass(Wall, Entity, {
	});

	window.Wall = Wall;

})();