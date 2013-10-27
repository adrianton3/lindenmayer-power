define(['Instruction'],
	function (Instruction) {
	'use strict';

	function Procedure(name, instructions) {
		this.name = name;
		this.instructions = instructions;
	}

	Procedure.fromString = function(s) {
		var tmp = s.indexOf('\n');
		var name = s.substr(0, tmp);
		var instructions = [];
		var tmpar = s.substr(tmp + 1).split('\n');
		for (var i in tmpar) {
			instructions[i] = Instruction.fromString(tmpar[i]);
		}
		return new Procedure(name, instructions);
	};

	return Procedure;
});