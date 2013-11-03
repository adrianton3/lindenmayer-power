define(['Util'], function(Util) {
	'use strict';

	describe('Util', function() {
		describe('clamp', function() {
			it('clamps a number that is lower than the lower boundary', function() {
				expect(Util.clamp(2, 10, 20)).toEqual(10);
			});

			it('clamps a number that is equal to the lower boundary', function() {
				expect(Util.clamp(10, 10, 20)).toEqual(10);
			});

			it('clamps a number that is between the lower and upper boundaries', function() {
				expect(Util.clamp(16, 10, 20)).toEqual(16);
			});

			it('clamps a number that is equal to the upper boundary', function() {
				expect(Util.clamp(20, 10, 20)).toEqual(20);
			});

			it('clamps a number that is greater than the upper boundary', function() {
				expect(Util.clamp(30, 10, 20)).toEqual(20);
			});
		});

		describe('trimWS', function() {
			it('reduces a spaces-only string to an empty string', function() {
				expect(Util.trimWS('    ')).toEqual('');
			});

			it('removes extra spaces from the beginning of the string', function() {
				expect(Util.trimWS('  asd')).toEqual('asd');
			});

			it('removes extra spaces from the end of the string', function() {
				expect(Util.trimWS('asd  ')).toEqual('asd');
			});

			it('removes extra spaces from the middle of the string', function() {
				expect(Util.trimWS('a  sd')).toEqual('a sd');
			});
		});

		describe('trimEmptyLines', function() {
			it('reduces a \\n to an empty string', function() {
				expect(Util.trimEmptyLines('\n')).toEqual('');
			});

			it('removes empty lines from the beginning of a string', function() {
				expect(Util.trimEmptyLines('\nasd')).toEqual('asd');
			});

			it('removes empty lines from the end of a string', function() {
				expect(Util.trimEmptyLines('asd\n')).toEqual('asd');
			});

			it('removes empty lines from the middle of a string', function() {
				expect(Util.trimEmptyLines('a\n\nsd')).toEqual('a\nsd');
			});
		});
	});
});