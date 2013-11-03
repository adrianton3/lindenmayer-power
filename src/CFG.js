define([
	'Prod',
	'Util'
	], function (
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
		s = Util.trimEmptyLines(s);
		s = s.replace(/\n\s*->/g, '\n->');

		var tmp = s.indexOf('->');
		var start = Util.trimWS(s.substring(tmp + 2, s.indexOf('\n')));

		var prod = {};
		var tmpar = s.substr(2).split('\n->');
		var tmppr;
		for (var i in tmpar) {
			tmppr = Prod.fromString(tmpar[i]);
			prod[tmppr.from] = tmppr;
		}

		return new CFG(start, prod);
	};

	CFG.prototype.isNonterm = function(s) {
		return this.prod[s] !== undefined;
	};

	return CFG;
});