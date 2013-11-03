define([
	'Instruction',
	'Procedure'
	], function(
		Instruction,
		Procedure
	) {
	'use strict';

	describe('Procedure', function() {
		describe('fromString', function() {
			it('gets the name', function() {
				var s = 'proc\nins par1 par2';
				var procedure = Procedure.fromString(s);

				expect(procedure.name).toEqual('proc');
			});

			it('gets the instructions', function() {
				var s = 'proc\nins1 par1\nins2 par1 par2';
				var procedure = Procedure.fromString(s);

				expect(procedure.instructions).toEqual([
					new Instruction('ins1', ['par1']),
					new Instruction('ins2', ['par1', 'par2'])
				]);
			});
		});
	});
});