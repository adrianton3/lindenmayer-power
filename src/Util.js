define([],
	function () {
	'use strict';

	function Util() {
	}

	function compHash() {
		var args = Array.prototype.slice.call(arguments);
		return '_' + args.join('_');
	}

	Util.getMemoized = function(fun) {
		var ret = function() {
			ret._total++;

			var hash = compHash.apply(undefined, arguments);
			if(ret._cache[hash]) {
				ret._hit++;
				//console.log('cache hit; ratio: ', ret._hit / ret._total);
				return ret._cache[hash];
			}
			else {
				//console.log('cache miss; ratio: ', ret._hit / ret._total);
				var toRet = fun.apply(this, arguments);
				ret._cache[hash] = toRet;
				return toRet;
			}
		};

		ret._cache = {};
		ret._total = 0;
		ret._hit = 0;

		return ret;
	};
	
	Util.numberOrDef = function(strNum, def) {
		var tmp = parseInt(strNum, 10);
		return isNaN(tmp) ? def : tmp;
	};
	
	Util.clamp = function(v, min, max) {
		return v < min ? min : v > max ? max : v;
	};

	return Util;
});