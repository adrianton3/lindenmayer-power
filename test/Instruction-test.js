define(['Instruction'], function(Instruction) {
	'use strict';

	describe('Instruction', function() {
		describe('fromString', function() {
			it('gets the name', function() {
				var s = 'ins par1 par2';
				var instruction = Instruction.fromString(s);

				expect(instruction.name).toEqual('ins');
			});

			it('gets no parameters', function() {
				var s = 'ins';
				var instruction = Instruction.fromString(s);

				expect(instruction.par).toEqual([]);
			});

			it('gets one parameter', function() {
				var s = 'ins par1';
				var instruction = Instruction.fromString(s);

				expect(instruction.par).toEqual(['par1']);
			});

			it('gets the parameters', function() {
				var s = 'ins par1 par2';
				var instruction = Instruction.fromString(s);

				expect(instruction.par).toEqual(['par1', 'par2']);
			});
		});
	});
});