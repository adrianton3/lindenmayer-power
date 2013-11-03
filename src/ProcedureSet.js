define([
	'Procedure',
	'Util'
	],
	function (
		Procedure,
		Util
	) {
	'use strict';

	function ProcedureSet(procedures) {
		this.procedures = procedures;
	}

	ProcedureSet.fromString = function(s) {
		s = Util.trimWS(s);
		s = Util.trimEmptyLines(s);
		s = s.replace(/\n\s*:/g, '\n:');

		var procedures = {};
		var tmpar = s.substr(1).split('\n:');
		var tmppr;
		for (var i in tmpar) {
			tmppr = Procedure.fromString(tmpar[i]);
			procedures[tmppr.name] = tmppr;
		}

		return new ProcedureSet(procedures);
	};

	ProcedureSet.prototype.isProcedure = function(s) {
		return this.procedures[s] !== undefined;
	};

	return ProcedureSet;
});