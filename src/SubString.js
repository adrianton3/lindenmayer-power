define([],
	function () {
	'use strict';

	function SubString(chance, ss) {
		this.chance = chance; 
		this.ss = ss;
	}

	SubString.fromString = function(s) {
		var tmp = s.indexOf(' ');
		var chance = parseFloat(s.substr(0, tmp));
		if(isNaN(chance)) throw 'Grammar parser: Chance must be a number';
		var ss = s.substr(tmp + 1).split(' ');

		return new SubString(chance, ss);
	};

	return SubString;
});