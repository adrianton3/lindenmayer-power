define([],
	function () {
	'use strict';

	function TurtleState(x, y, z, yaw, pitch, pen, r, g, b, vars, thickness, material) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.yaw = yaw;
		this.pitch = pitch;
		this.pen = pen;
		this.r = r;
		this.g = g;
		this.b = b;
		this.vars = vars;
		this.thickness = thickness,
		this.material = material;
	}

	TurtleState.prototype.clone = function() {
		var vars = [];
		for (var i in this.vars)
			vars[i] = this.vars[i];

		return new TurtleState(
			this.x,
			this.y,
			this.z,
			this.yaw,
			this.pitch,
			this.pen,
			this.r,
			this.g,
			this.b,
			vars,
			this.thickness,
			this.material);
	};

	return TurtleState;
});