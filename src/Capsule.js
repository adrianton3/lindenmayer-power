define([
	'goo/renderer/MeshData',
	'goo/math/MathUtils'],
	
	function (
		MeshData,
		MathUtils
	) {
	'use strict';

	function Capsule(len, radius, nSegments) {
		this.len = len || 1;
		this.radius = radius || 0.5;
		this.nSegments = nSegments || 8;

		var attributeMap = MeshData.defaultMap([MeshData.POSITION, MeshData.NORMAL]);
		var nQuads = (this.nSegments + 1) + (this.nSegments + 1) * (this.nSegments + 1) * 2;
		MeshData.call(this, attributeMap, nQuads * 4, nQuads * 6);

		this.rebuild();
	}

	Capsule.prototype = Object.create(MeshData.prototype);

	Capsule.prototype.rebuild = function () {
		var verts = [];
		var normals = [];
		var indices = [];
		var indexCount = 0;

		function addQuad(coords) {
			verts.push.apply(verts, coords);

			var norm = MathUtils.getTriangleNormal(
				coords[0], coords[1], coords[2],
				coords[3], coords[4], coords[5],
				coords[6], coords[7], coords[8]
			);
			normals.push.apply(normals, norm);
			normals.push.apply(normals, norm);
			normals.push.apply(normals, norm);
			normals.push.apply(normals, norm);

			indices.push(indexCount + 2, indexCount + 1, indexCount + 0, indexCount + 2, indexCount + 0, indexCount + 3);
			indexCount += 4;
		}

		//==== tube ====
		var lenp2 = this.len / 2;
		var ak = Math.PI * 2 / this.nSegments;
		for (var i = 0, k = 0; i < this.nSegments; i++, k += ak) {
			addQuad([
				-lenp2, Math.cos(k) * this.radius, Math.sin(k) * this.radius,
				 lenp2, Math.cos(k) * this.radius, Math.sin(k) * this.radius,
				 lenp2, Math.cos(k + ak) * this.radius, Math.sin(k + ak) * this.radius,
				-lenp2, Math.cos(k + ak) * this.radius, Math.sin(k + ak) * this.radius
			]);
		}

		//==== north pole ====
		var calotak = (Math.PI / 2 - 0.0001) / this.nSegments;
		for (var j = 0, calotk = 0; j < this.nSegments; j++, calotk += calotak) {
			var vRadius0 = Math.cos(calotk) * this.radius;
			var vRadius1 = Math.cos(calotk + calotak) * this.radius;
			var levitat0 = Math.sin(calotk) * this.radius;
			var levitat1 = Math.sin(calotk + calotak) * this.radius;

			for (var i = 0, k = 0; i < this.nSegments; i++, k += ak) {
				addQuad([
					lenp2 + levitat0, Math.cos(k) * vRadius0,      Math.sin(k) * vRadius0,
					lenp2 + levitat1, Math.cos(k) * vRadius1,      Math.sin(k) * vRadius1,
					lenp2 + levitat1, Math.cos(k + ak) * vRadius1, Math.sin(k + ak) * vRadius1,
					lenp2 + levitat0, Math.cos(k + ak) * vRadius0, Math.sin(k + ak) * vRadius0
				]);
			}
		}
		//==== south pole ====
		var calotak = (Math.PI / 2 - 0.0001) / this.nSegments;
		for (var j = 0, calotk = 0; j < this.nSegments; j++, calotk += calotak) {
			var vRadius0 = Math.cos(calotk) * this.radius;
			var vRadius1 = Math.cos(calotk + calotak) * this.radius;
			var levitat0 = Math.sin(calotk) * this.radius;
			var levitat1 = Math.sin(calotk + calotak) * this.radius;

			for (var i = 0, k = 0; i < this.nSegments; i++, k += ak) {
				addQuad([
					-lenp2 - levitat0, Math.cos(k + ak) * vRadius0, Math.sin(k + ak) * vRadius0,
					-lenp2 - levitat1, Math.cos(k + ak) * vRadius1, Math.sin(k + ak) * vRadius1,
					-lenp2 - levitat1, Math.cos(k) * vRadius1,      Math.sin(k) * vRadius1,
					-lenp2 - levitat0, Math.cos(k) * vRadius0,      Math.sin(k) * vRadius0,
				]);
			}
		}

		this.getAttributeBuffer(MeshData.POSITION).set(verts);
		this.getAttributeBuffer(MeshData.NORMAL).set(normals);

		this.getIndexBuffer().set(indices);

		return this;
	};

	return Capsule;
});