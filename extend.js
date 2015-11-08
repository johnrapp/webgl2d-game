'use strict';
function extendClass(childClass, superClass, prototype) {
	childClass.prototype = Object.create(superClass.prototype);

	extend(childClass.prototype, prototype);
}

function createSuper(superClass) {
	return function() {
		superClass.apply(this, arguments);
	}
}

function extend(target, extension) {
	for(var key in extension) {
		target[key] = extension[key];
	}
}