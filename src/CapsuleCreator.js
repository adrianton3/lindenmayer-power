define(['Capsule'],
	function (Capsule) {
	'use strict';

	function CapsuleCreator() {
		this.deposit = [];
		this.total = 0;
		this.hit = 0;
	}

	function compDist(len1, radius1, nSegments1, len2, radius2, nSegments2) {
		return Math.abs(len1 - len2) +
			Math.abs(radius1 - radius2) +
			Math.abs(nSegments1 - nSegments2);
	}

	CapsuleCreator.prototype.findClosest = function(len, radius, nSegments) {
		var closest;

		var minDist = Number.MAX_VALUE;
		for(var i = 0; i < this.deposit.length; i++) {
			var entry = this.deposit[i];
			var dist = compDist(len, radius, nSegments, entry.len, entry.radius, entry.nSegments);
			if(dist < minDist) {
				minDist = dist;
				closest = entry;
			}
		}

		return { dist: minDist, capsule: closest ? closest.capsule : undefined };
	};

	CapsuleCreator.prototype.createCapsule = function(len, radius, nSegments) {
		this.total++;
		var closestResult = this.findClosest(len, radius, nSegments);
		if(closestResult.dist > 0.01) {
			//console.log('capsule creator --- miss; ratio: ', this.hit / this.total);
			var capsule = new Capsule(len, radius, nSegments);
			this.deposit.push({len: len, radius: radius, nSegments: nSegments, capsule: capsule});
			return capsule;
		}
		else {
			this.hit++;
			//console.log('capsule creator --- hit; ratio: ', this.hit / this.total);
			return closestResult.capsule;
		}
	};

	return CapsuleCreator;
});