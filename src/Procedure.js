define([
	'Instruction',
	'Util'
	], function (
		Instruction,
		Util
	) {
	'use strict';

	function Procedure(name, instructions) {
		this.name = name;
		this.instructions = instructions;
	}

	Procedure.fromString = function(s) {
		s = Util.trimWS(s);

		var tmp = s.indexOf('\n');
		var name = s.substr(0, tmp).trim();
		if (name.length === 0) throw new Error('Missing procedure name');
		if (name.match(/\s/)) throw new Error('Procedure name cannot contain spaces');

		var tmpar = s.substr(tmp + 1).split('\n');
		var instructions = tmpar.map(function(elem) {
			return Instruction.fromString(elem);
		});

		return new Procedure(name, instructions);
	};

	return Procedure;
});