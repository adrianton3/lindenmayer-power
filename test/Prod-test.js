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

		describe('getRanSubString', function() {
			it('can return the same substring of a single substring production', function() {
				var prod = new Prod('S', [new SubString(1, ['a', 'b'])], 1);

				for (var i = 0; i < 10; i++) {
					expect(prod.getRanSubString()).toEqual(['a', 'b']);
				}
			});
			it('returns [] for a no-substring producton', function() {
				var prod = new Prod('S', [], 0);

				expect(prod.getRanSubString()).toEqual([]);
			});
			it('can ignore rules with weight 0 at the beginning', function() {
				var prod = new Prod('S', [
					new SubString(0, ['a', 'b']),
					new SubString(1, ['c', 'd'])
				], 1);

				for (var i = 0; i < 10; i++) {
					expect(prod.getRanSubString()).toEqual(['c', 'd']);
				}
			});
			it('can ignore rules with weight 0 at the end', function() {
				var prod = new Prod('S', [
					new SubString(1, ['a', 'b']),
					new SubString(0, ['c', 'd'])
				], 1);

				for (var i = 0; i < 10; i++) {
					expect(prod.getRanSubString()).toEqual(['a', 'b']);
				}
			});
			it('can sample correctly', function() {
				var prod = new Prod('S', [
					new SubString(0.3, ['a']),
					new SubString(0.7, ['c'])
				], 1);

				var nTrials = 1000;
				var hits = 0;

				for (var i = 0; i < nTrials; i++) {
					var sampled = prod.getRanSubString();
					if (sampled[0] === 'a') hits++;
				}
				expect(Math.abs(hits/nTrials - 0.3) < 0.1).toBeTruthy();
			});
		});
	});
});