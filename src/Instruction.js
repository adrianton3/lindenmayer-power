define([],
	function () {
	'use strict';

	function Instruction(name, par) {
		this.name = name;
		this.par = par;
	}

	Instruction.fromString = function(s) {
		var par = [];
		var tmpd = s.split(' ');
		var name = tmpd[0];

		if(tmpd.length > 1) {
			var tmppar = s.substr(s.indexOf(' ') + 1).split(' ');
			if(tmppar[0].charAt(1) == '=') {
				var tmpaux = name;
				name = tmppar[0];
				tmppar[0] = tmpaux;
			}
			return new Instruction(name, tmppar);
		}
		else
			return new Instruction(name, []);
	};

	return Instruction;
});