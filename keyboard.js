(function() {'use strict';

	var keys = {}, keyMap = {
		37: 'left',
		39: 'right',
		38: 'up',
		40: 'down',

		87: 'w',
		65: 'a',
		83: 's',
		68: 'd'
	};

	window.keys = keys;

	window.addEventListener('keydown', function(e) {
		if(keyMap.hasOwnProperty(e.which)) {
			keys[keyMap[e.which]] = 1;
			e.preventDefault();
		} 
	});
	window.addEventListener('keyup', function(e) {
		if(keyMap.hasOwnProperty(e.which)) {
			keys[keyMap[e.which]] = 0;
			e.preventDefault();
		}
	});

	function keydown(key) {
		return keys[key];
	}

	window.keyboard = {
		isDown: keydown
	};

})();