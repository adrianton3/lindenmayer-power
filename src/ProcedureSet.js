define([
	'Procedure', 
	'Util'
	],
	function (
		Procedure, 
		Util
	) {
	'use strict';

	function ProcedureSet(proc) {
		this.proc = proc;
	}

	ProcedureSet.fromString = function(s) {
		s = Util.trimWS(s);

		var proc = {};
		var tmpar = s.substr(2).split('\n: ');
		var tmppr;
		for (var i in tmpar) {
			tmppr = Procedure.fromString(tmpar[i]);
			proc[tmppr.name] = tmppr;
		}

		return new ProcedureSet(proc);
	};

	ProcedureSet.prototype.isProcedure = function(s) {
		return this.proc[s] !== undefined;
	};

	return ProcedureSet;
});