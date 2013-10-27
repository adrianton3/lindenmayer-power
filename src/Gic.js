define(['Prod'],
	function (Prod) {
	'use strict';

	function trimWS(s) {
		s = s.replace(/(^\s*)|(\s*$)/gi,'');
		s = s.replace(/[ ]{2,}/gi,' ');
		s = s.replace(/\n /,'\n');
		return s;
	}

	function Gic(start, prod) {
		this.start = start;
		this.prod = prod;
	}
	
	Gic.fromString = function(s) {
		s = trimWS(s);

		var tmp = s.indexOf(' ');
		var start = s.substr(tmp + 1, s.indexOf('\n') - tmp - 1);
		var prod = {};
		var tmpar = s.substr(3).split('\n-> ');
		var tmppr;
		for (var i in tmpar) {
			tmppr = Prod.fromString(tmpar[i]);
			prod[tmppr.from] = tmppr;
		}

		return new Gic(start, prod);
	};
	
	Gic.prototype.isNonterm = function(s) {
		return this.prod[s] != undefined;
	};

	return Gic;
});