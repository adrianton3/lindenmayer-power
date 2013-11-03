define(['SubString'], function(SubString) {
	'use strict';

	describe('SubString', function() {
		describe('fromString', function() {
			it('gets the weight', function() {
				var s = '5.3 a b c';
				var subString = SubString.fromString(s);

				expect(subString.weight).toBeCloseTo(5.3);
			});

			it('assigns a default weight', function() {
				var s = 'a b c';
				var subString = SubString.fromString(s);

				expect(subString.weight).toBeCloseTo(1);
			});

			it('deals with negative weights', function() {
				var s = '-5 a b c';
				var subString = SubString.fromString(s);

				expect(subString.weight).toBeCloseTo(0);
			});

			it('gets the substitution string of rule with weight', function() {
				var s = '3 a b c';
				var subString = SubString.fromString(s);

				expect(subString.ss).toEqual(['a', 'b', 'c']);
			});

			it('gets the substitution string of rule without weight', function() {
				var s = 'a b c';
				var subString = SubString.fromString(s);

				expect(subString.ss).toEqual(['a', 'b', 'c']);
			});
		});
	});
});