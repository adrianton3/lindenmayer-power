define([
	'Prod',
	'Util'
	],
	function (
		Prod,
		Util
	) {
	'use strict';

	function CFG(start, prod) {
		this.start = start;
		this.prod = prod;
	}

	CFG.fromString = function(s) {
		s = Util.trimWS(s);

		var tmp = s.indexOf(' ');
		var start = s.substr(tmp + 1, s.indexOf('\n') - tmp - 1);
		var prod = {};
		var tmpar = s.substr(3).split('\n-> ');
		var tmppr;
		for (var i in tmpar) {
			tmppr = Prod.fromString(tmpar[i]);
			prod[tmppr.from] = tmppr;
		}

		return new CFG(start, prod);
	};

	CFG.prototype.isNonterm = function(s) {
		return this.prod[s] != undefined;
	};

	return CFG;
});