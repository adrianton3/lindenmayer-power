define(['SubString'], function(SubString) {
	'use strict';

	describe('SubString', function() {
		describe('fromString', function() {
			it('can get the weight', function() {
				var s = '5.3 a b c';
				var subString = SubString.fromString(s);

				expect(subString.weight).toBeCloseTo(5.3);
			});

			it('can assign a default weight', function() {
				var s = 'a b c';
				var subString = SubString.fromString(s);

				expect(subString.weight).toBeCloseTo(1);
			});

			it('deals with negative weights', function() {
				var s = '-5 a b c';
				var subString = SubString.fromString(s);

				expect(subString.weight).toBeCloseTo(0);
			});

			it('can get the substitution string of rule with weight', function() {
				var s = '3 a b c';
				var subString = SubString.fromString(s);

				expect(subString.ss).toEqual(['a', 'b', 'c']);
			});

			it('can get the substitution string of rule without weight', function() {
				var s = 'a b c';
				var subString = SubString.fromString(s);

				expect(subString.ss).toEqual(['a', 'b', 'c']);
			});
		});
	});
});