define([
	'SubString',
	'Util'
	], function (
		SubString,
		Util
	) {
	'use strict';

	function Prod(from, toar, sum) {
		this.from = from; //string
		this.toar = toar; //array of SubString
		this.sum = sum;
	}

	Prod.fromString = function(s) {
		s = Util.trimWS(s);

		var sum = 0;
		var toar = [];
		var tmp = s.indexOf('\n');

		var from = s.substr(0, tmp).trim();
		if (from.length === 0) throw new Error('Missing source nonterminal');
		if (from.match(/\s/)) throw new Error('Source nonterminal cannot contain spaces');

		var tmpar = s.substr(tmp + 1).split('\n');
		var tmpss;
		for (var i in tmpar) {
			tmpss = SubString.fromString(tmpar[i]);
			toar.push(tmpss);
			sum += tmpss.weight;
		}

		return new Prod(from,toar,sum);
	};

	Prod.prototype.getRanSubString = function() {
		if (this.toar.length === 0) return []; // better this than an extra rule

		var ran = Math.random() * this.sum;
		var psum = 0;

		for (var i = 0; i < this.toar.length; i++) {
			psum += this.toar[i].weight;
			if(psum >= ran) return this.toar[i].ss;
		}
		throw "Exception at getRanSubString";
	};

	return Prod;
});