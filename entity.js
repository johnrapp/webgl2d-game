(function() {'use strict';

	function Entity(src) {
		Sprite.call(this, src);
	}

	extendClass(Entity, Sprite, {
		bbScale: 1,
		getBB: function() {
			return new BoundingBox(this.position, this.bbSize());
		},
		bbSize: function() {
			return this.radius.scale(this.bbScale);
		},
		move: function(move) {
			// var blocked = this.block(move);
			var blocked = new Vec2(
				move.x ? this.blockX(move.x) : 0,
				move.y ? this.blockY(move.y) : 0);

			var next = this.position.add(blocked);

			var diff = next.subtract(this.position), angle;

			this.rotation = (diff.isNotZero() ? diff : move).angle() - Math.PI / 2;

			this.position = next;
		},
		blockX: function(move) {
			var bb = new BoundingBox(this.position.addX(move), this.bbSize());

			for(var i = 0, l = level.entities.length; i < l; i++) {
				var entity = level.entities[i];
				if(entity != this) {
					var entityBB = entity.getBB();
					if(bb.intersects(entityBB)) {
						var push = bb.radius.x + entityBB.radius.x;	
						if(move > 0) push = -push;
						return entityBB.position.x - this.position.x + push;
					}

				}
			}
		
			return move;
		},
		blockY: function(move) {
			var bb = new BoundingBox(this.position.addY(move), this.bbSize());

			for(var i = 0, l = level.entities.length; i < l; i++) {
				var entity = level.entities[i];
				if(entity != this) {
					var entityBB = entity.getBB();
					if(bb.intersects(entityBB)) {
						var push = bb.radius.y + entityBB.radius.y;	
						if(move > 0) push = -push;
						return entityBB.position.y - this.position.y + push;
					}

				}
			}
		
			return move;
		},
		// block: function(move) {
		// 	var next = this.position.add(move), bbSize = this.bbSize();

		// 	var bbNext = new BoundingBox(next, bbSize),
		// 		bbX = new BoundingBox(this.position.addX(move.x), bbSize),
		// 		bbY = new BoundingBox(this.position.addY(move.y), bbSize);

		// 	var abs = move.abs(), sign = move.sign();

		// 	var blocked = move;

		// 	console.log(sign);
		// 	for(var i = 0, l = level.entities.length; i < l; i++) {
		// 		var entity = level.entities[i];
		// 		if(entity != this) {
		// 			var entityBB = entity.getBB();
		// 			if(bbNext.intersects(entityBB)) {

		// 				if(move.x && bbX.intersects(entityBB)) {
		// 					var push = (bbX.radius.x + entityBB.radius.x) * -sign.x;	
		// 					blocked = blocked.addX(entityBB.position.x - bbX.position.x + push);
		// 				}

		// 				if(move.y && bbY.intersects(entityBB)) {
		// 					var push = (bbY.radius.y + entityBB.radius.y) * -sign.y;	
		// 					blocked = blocked.addY(entityBB.position.y - bbY.position.y + push);	
		// 				}
		// 			}

		// 		}
		// 	}

		// 	next = this.position.add(blocked);

		// 	return blocked;
		// }
	});

	window.Entity = Entity;

})();