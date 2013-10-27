define([],
	function () {
	'use strict';

	function StateString(ss) {
		this.ss = ss;
	}
	
	StateString.fromFirstNonterm = function(gic) {
		return new StateString([gic.start]);
	};
	
	StateString.prototype.derive = function(gic) {
		var ss = [];
		var tmpss;
		var term;

		for (var i in this.ss) {
			term = this.ss[i];
			if(gic.isNonterm(term)) {
				tmpss = gic.prod[term].getRanSubString();
				for (var j in tmpss) {
					ss.push(tmpss[j]);
				}
			}
			else ss.push(term);
		}

		return new StateString(ss);
	};
	
	StateString.prototype.toString = function() {
		return this.ss.join(' ');
	};

	return StateString;
});