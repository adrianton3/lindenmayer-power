define([
	'SubString',
	'Prod'
	], function(
		SubString,
		Prod
	) {
	'use strict';

	describe('Prod', function() {
		describe('fromString', function() {
			it('can parse a single rule production', function() {
				var s = 'S\na b c';
				var prod = Prod.fromString(s);

				expect(prod.from).toEqual('S');
				expect(prod.toar).toEqual([SubString.fromString('a b c')]);
				expect(prod.sum).toBeCloseTo(1);
			});

			it('can parse a multiple rule production', function() {
				var s = 'S\na b c\n7 d e f';
				var prod = Prod.fromString(s);

				expect(prod.from).toEqual('S');
				expect(prod.toar).toEqual([
					SubString.fromString('a b c'),
					SubString.fromString('7 d e f')
				]);
				expect(prod.sum).toBeCloseTo(8);
			});
		});
	});
});