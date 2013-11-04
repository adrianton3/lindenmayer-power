define([],
	function () {
	'use strict';

	function StateString(ss) {
		this.ss = ss;
	}

	StateString.fromFirstNonterm = function(cfg) {
		return new StateString([cfg.start]);
	};

	StateString.prototype.derive = function(cfg) {
		var ss = [];
		var tmpss;
		var term;

		for (var i in this.ss) {
			term = this.ss[i];
			if (cfg.isNonterm(term)) {
				tmpss = cfg.prod[term].getRanSubString();
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