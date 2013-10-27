define([
	'goo/renderer/Material',
	'goo/shapes/ShapeCreator',
	'goo/entities/EntityUtils',
	'goo/renderer/shaders/ShaderLib',
	'CapsuleCreator',
	'goo/shapes/Box',
	'Util'],
	function (
		Material,
		ShapeCreator,
		EntityUtils,
		ShaderLib,
		CapsuleCreator,
		Box,
		Util) {
	'use strict';


	function getColMat(r, g, b) {
		var material = Material.createMaterial(ShaderLib.simpleColored, '');
		//var material = Material.createMaterial(ShaderLib.simpleLit, '');
		material.uniforms.color = [r/255, g/255, b/255];
		return material;
	}

	var getColMatMemoized = Util.getMemoized(getColMat);
	var capsuleCreator = new CapsuleCreator();

	function line(x, y, z, yaw, pitch, len, thickness, material, goo) {
		var capsuleMeshData = capsuleCreator.createCapsule(len, thickness/2, 16);
		var capsuleEntity = EntityUtils.createTypicalEntity(goo.world, capsuleMeshData, material);
		var nx = x + Math.cos(yaw) * (len / 2) * Math.cos(pitch);
		var ny = y + Math.sin(yaw) * (len / 2) * Math.cos(pitch);
		var nz = z + Math.sin(pitch) * (len / 2);
		capsuleEntity.transformComponent.transform.rotation.rotateZ(yaw);
		capsuleEntity.transformComponent.transform.rotation.rotateY(-pitch);
		capsuleEntity.transformComponent.transform.translation.setd(nx, ny, nz);
		capsuleEntity.addToWorld();
	}

	function cube(x, y, z, yaw, pitch, dim, dist, material, goo) {
		var boxMeshData = new Box(dim, dim, dim); // cache this aswell
		var boxEntity = EntityUtils.createTypicalEntity(goo.world, boxMeshData, material);
		var nx = x + Math.cos(yaw) * dist * Math.cos(pitch);
		var ny = y + Math.sin(yaw) * dist * Math.cos(pitch);
		var nz = z + Math.sin(pitch) * dist;
		boxEntity.transformComponent.transform.rotation.rotateZ(yaw);
		boxEntity.transformComponent.transform.rotation.rotateY(-pitch);
		boxEntity.transformComponent.transform.translation.setd(nx, ny, nz);
		boxEntity.addToWorld();
	}
	//================================================================================================
	function Turtle(inistate, goo) {
		this.stack = {};
		this.gvars = {};
		inistate.material = getColMatMemoized(inistate.r, inistate.g, inistate.b);
		this.stack = [inistate.clone()];
		this.goo = goo;
	}
	//------------------------------------------------------------------------------------------------
	Turtle.prototype.getState = function() {
		return this.stack[this.stack.length - 1];
	};
	//------------------------------------------------------------------------------------------------
	Turtle.prototype.getVal = function(s) {
		var tmp = parseFloat(s);
		if(!isNaN(tmp)) return tmp;
		else {
			var tmp = s.charAt(0);
			if(tmp == tmp.toUpperCase()) return this.gvars[s];
			else return this.getState().vars[s];
		}
	};
	//------------------------------------------------------------------------------------------------
	Turtle.prototype.clearCanvas = function() {
		var entities = this.goo.world.entityManager.getEntities();

		for (var i in entities)
			if(entities[i].name !== 'Camera')
				entities[i].removeFromWorld();
	};
	//------------------------------------------------------------------------------------------------
	Turtle.prototype.interpretIns = function(ins) {
		var rap = Math.PI / 180;
		var val;
		var tmp;

		switch(ins.name) {
			case ':=':
				tmp = ins.par[0].charAt(0);
				if(tmp == tmp.toUpperCase()) this.gvars[ins.par[0]] = this.getVal(ins.par[1]);
				else this.getState().vars[ins.par[0]] = this.getVal(ins.par[1]);
				break;
			case '+=':
				tmp = ins.par[0].charAt(0);
				if(tmp == tmp.toUpperCase()) this.gvars[ins.par[0]] += this.getVal(ins.par[1]);
				else this.getState().vars[ins.par[0]] += this.getVal(ins.par[1]);
				break;
			case '-=':
				tmp = ins.par[0].charAt(0);
				if(tmp == tmp.toUpperCase()) this.gvars[ins.par[0]] -= this.getVal(ins.par[1]);
				else this.getState().vars[ins.par[0]] -= this.getVal(ins.par[1]);
				break;
			case '*=':
				tmp = ins.par[0].charAt(0);
				if(tmp == tmp.toUpperCase()) this.gvars[ins.par[0]] *= this.getVal(ins.par[1]);
				else this.getState().vars[ins.par[0]] *= this.getVal(ins.par[1]);
				break;
			case 'forward':
				val = this.getVal(ins.par[0]);
				if(this.getState().pen) {
					line(
						this.getState().x,
						this.getState().y,
						this.getState().z,
						this.getState().yaw * rap,
						this.getState().pitch * rap,
						val,
						this.getState().thickness,
						this.getState().material,
						this.goo
					);
				}

				this.getState().x += Math.cos(this.getState().yaw * rap) * val * Math.cos(this.getState().pitch * rap);
				this.getState().y += Math.sin(this.getState().yaw * rap) * val * Math.cos(this.getState().pitch * rap);
				this.getState().z += Math.sin(this.getState().pitch * rap) * val;
				break;

			case 'rotate':
				val = this.getVal(ins.par[0]);
				var pitch = this.getVal(ins.par[1]);
				this.getState().yaw += val;
				this.getState().pitch += pitch;
				break;

			case 'color':
				var r = Math.floor(this.getVal(ins.par[0]));
				var g = Math.floor(this.getVal(ins.par[1]));
				var b = Math.floor(this.getVal(ins.par[2]));

				if(r < 0) r = 0; else if(r > 255) r = 255;
				if(g < 0) g = 0; else if(g > 255) g = 255;
				if(b < 0) b = 0; else if(b > 255) b = 255;

				this.getState().r = r;
				this.getState().g = g;
				this.getState().b = b;

				this.getState().material = getColMatMemoized(r, g, b);
				break;

			case 'width':
				var w = this.getVal(ins.par[0]);
				if(w < 0) w = 0; else if(w > 32) w = 32;
				this.getState().thickness = w;
				break;

			case 'pen':
				if(ins.par[0] == 'true') this.getState().pen = true;
				else this.getState().pen = false;
				break;

			case 'cube':
				var dim = this.getVal(ins.par[0]);
				var dist = this.getVal(ins.par[1]);
				cube(
					this.getState().x,
					this.getState().y,
					this.getState().z,
					this.getState().yaw * rap,
					this.getState().pitch * rap,
					dim,
					dist,
					this.getState().material,
					this.goo
				);
				break;

			case 'text':
				//con2dtu.fillStyle = 'rgb(' + this.getState().r + ',' + this.getState().g + ',' + this.getState().b + ')';
				var round = this.getVal(ins.par[0]);
				round = Math.floor(round*100)/100;
				//con2dtu.fillText(round,this.getState().x,this.getState().y);
				break;

			case 'push':
				this.stack.push(this.getState().clone());
				break;

			case 'pop':
				this.stack.pop();
				if(this.stack.length == 0) {
					throw 'Interpreter: Stack should never be empty';
				}
				//con2dtu.strokeStyle = 'rgb(' + this.getState().r + ',' + this.getState().g + ',' + this.getState().b + ')';
				break;
			default:
				throw 'Interpreter: Unrecognized command ' + ins.name;
		}
	};
	//------------------------------------------------------------------------------------------------
	Turtle.prototype.interpret = function(s, ps) {
		for (var i in s.ss) {
			if(ps.isProcedure(s.ss[i])) {
				var p = ps.proc[s.ss[i]];
				for (var j in p.instructions) {
					this.interpretIns(p.instructions[j]);
				}
			}
		}
	};

	return Turtle;
});