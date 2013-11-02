define([],
	function () {
	'use strict';

	function SubString(weight, ss) {
		this.weight = weight;
		this.ss = ss;
	}

	SubString.fromString = function(s) {
		var tmp = s.indexOf(' ');
		var weight = parseFloat(s.substr(0, tmp));

		var ss;
		if(isNaN(weight)) {
			weight = 1;
			ss = s.split(' ');
		} else {
			weight = Math.max(weight, 0);
			ss = s.substr(tmp + 1).split(' ');
		}

		return new SubString(weight, ss);
	};

	return SubString;
});