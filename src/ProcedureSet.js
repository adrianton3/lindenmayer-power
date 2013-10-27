define(['Procedure'],
	function (Procedure) {
	'use strict';

	function trimWS(s) {
		s = s.replace(/(^\s*)|(\s*$)/gi,"");
		s = s.replace(/[ ]{2,}/gi," ");
		s = s.replace(/\n /,"\n");
		return s;
	}

	function ProcedureSet(proc) {
		this.proc = proc;
	}

	ProcedureSet.fromString = function(s) {
		s = trimWS(s);

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