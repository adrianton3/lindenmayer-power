define(['SubString'],
	function (SubString) {
	'use strict';

	function Prod(from, toar, sum) {
		this.from = from; //string
		this.toar = toar; //array of SubString
		this.sum = sum;
	}

	Prod.fromString = function(s) {
		var sum = 0;
		var toar = [];
		var tmp = s.indexOf('\n');
		var from = s.substr(0,tmp);
		var tmpar = s.substr(tmp + 1).split('\n');
		var tmpss;
		for (var i in tmpar) {
			tmpss = SubString.fromString(tmpar[i]);
			toar.push(tmpss);
			sum += tmpss.chance;
		}

		return new Prod(from,toar,sum);
	};

	Prod.prototype.getRanSubString = function() {
		var ran = Math.random()*this.sum;
		var psum = 0;

		for (var i = 0; i < this.toar.length; i++) {
			psum += this.toar[i].chance;
			if(psum >= ran) return this.toar[i].ss;
		}
		throw "Exception at getRanSubString";
	};

	return Prod;
});