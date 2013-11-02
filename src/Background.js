define([
	'goo/util/MeshBuilder',
	'goo/math/Transform',
	'goo/renderer/MeshData',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/Camera',
	'Util'],
	function (
		MeshBuilder,
		Transform,
		MeshData,
		Material,
		ShaderLib,
		Camera,
		Util
	) {
	'use strict';

	var Background = {};

	var multipliers = [
		{ r: 0.7, g: 0.2, b: 0.1, baseK: 0, period: 0.4 },
		{ r: 0.3, g: 0.2, b: 0.3, baseK: 0, period: 0.4 },
		{ r: 0.5, g: 0.5, b: 0.1, baseK: 0, period: 0.2 },
		{ r: 1.7, g: 1.6, b: -0.7, baseK: 3.4, period: 0.1 }
	];

	function buildTriangle(verts) {
		return function(cols) {
			var meshData = new MeshData(MeshData.defaultMap([MeshData.POSITION, MeshData.COLOR]), 3, 3);

			meshData.getAttributeBuffer(MeshData.POSITION).set(verts);
			meshData.getAttributeBuffer(MeshData.COLOR).set(cols);
			meshData.getIndexBuffer().set([0, 1, 2]);

			meshData.indexLengths = [3];
			meshData.indexModes = ['Triangles'];

			return meshData;
		};
	}

	function ranColBuilder(rMult, gMult, bMult, baseK, period) {
		return function(k) {
			k += Math.random() * 0.5;
			var r = Math.cos(baseK + Math.sin(k)) * 0.5 + 0.5;
			var g = Math.cos(baseK + Math.sin(k) + period) * 0.5 + 0.5;
			var b = Math.cos(baseK + Math.sin(k) + period * 2) * 0.5 + 0.5;

			r *= rMult;
			g *= gMult;
			b *= bMult;
			b += g;

			r = Util.clamp(r, 0, 1);
			g = Util.clamp(g, 0, 1);
			b = Util.clamp(b, 0, 1);

			return [r, g, b];
		};
	}

	function buildWall(ranCol) {
		var meshBuilder = new MeshBuilder();

		var transform = new Transform();
		transform.scale.setd(100, 100, 1);
		transform.update();

		var rap = Math.sqrt(3) / 2;
		var buildEquiTriangle = buildTriangle([
			0.5, 0, 0,
			0, rap, 0,
			-0.5, 0, 0]);
		var buildEquiRevTriangle = buildTriangle([
			-0.5, 0, 0,
			0, -rap, 0,
			0.5, 0, 0]);

		var offX = -1020;
		var offY = -420;

		for(var i = 0; i < 22; i++) {
			for(var j = 0; j < 11; j++) {
				transform.translation.setd(
					offX + i * 100 - 50 * (j % 2),
					offY + j * rap * 100,
					0
				);
				transform.scale.setd(100, 100, 1);
				transform.update();

				var rc1 = ranCol(i/3);
				var rc2 = ranCol(j/3);

				var triMeshData = buildEquiTriangle([
					rc1[0], rc1[1], rc1[2], 1,
					rc1[0], rc1[1], rc1[2], 1,
					rc1[0], rc1[1], rc1[2], 1
				]);

				var triRevMeshData = buildEquiRevTriangle([
					rc2[0], rc2[1], rc2[2], 1,
					rc2[0], rc2[1], rc2[2], 1,
					rc2[0], rc2[1], rc2[2], 1
				]);

				meshBuilder.addMeshData(triMeshData, transform);

				meshBuilder.addMeshData(triRevMeshData, transform);
			}
		}

		var mesh = meshBuilder.build()[0];
		return mesh;
	}

	function getBackMeshData(multiplier) {
		var colBuilder = ranColBuilder(
			multiplier.r,
			multiplier.g,
			multiplier.b,
			multiplier.baseK,
			multiplier.period
		);
		return buildWall(colBuilder);
	}

	var added = false;
	var renderableMarker;

	Background.add = function(goo, i) {
		if (added) return ;
		added = true;

		var multiplier = multipliers[Util.clamp(i, 0, multipliers.length)];
		var renderableMarker = {
			meshData: getBackMeshData(multiplier),
			materials: [Material.createMaterial(ShaderLib.point, '')],
			transform: new Transform()
		};

		var backCamera = new Camera(45, 3, 1, 1000);
		backCamera.translation.setd(0, 0, 1000);

		function drawBack() {
			goo.renderer.checkResize(backCamera);
			goo.renderer.render(renderableMarker, backCamera, [], null, false);
		}

		goo.callbacks.push(drawBack);
	};

	Background.change = function(i) {
		var multiplier = multipliers[Util.clamp(i, 0, multipliers.length)];
		var backMeshData = getBackMeshData(multiplier);
		renderableMarker.meshData = backMeshData;
	};

	return Background;
});