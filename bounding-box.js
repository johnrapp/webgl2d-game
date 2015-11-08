(function() {'use strict';

	function BoundingBox(position, radius) {
		this.position = position;
		this.radius = radius;
	}

	BoundingBox.prototype = {
		intersects: function(other) {
			return (Math.abs(this.position.x - other.position.x) < (this.radius.x + other.radius.x)) &&
				   (Math.abs(this.position.y - other.position.y) < (this.radius.y + other.radius.y));

			// return (Math.abs(this.position.x - other.position.x) * 2 < (this.size.x + other.size.x)) &&
				// (Math.abs(this.position.y - other.position.y) * 2 < (this.size.y + other.size.y));
		}
	};

	window.BoundingBox = BoundingBox;

})();