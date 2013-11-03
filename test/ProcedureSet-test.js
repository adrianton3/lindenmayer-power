define([
	'Instruction',
	'Procedure',
	'ProcedureSet'
	], function(
		Instruction,
		Procedure,
		ProcedureSet
	) {
	'use strict';

	describe('ProcedureSet', function() {
		describe('fromString', function() {
			it('can handle empty lines', function() {
				var s = '\n: asd\n\n\nins1 par1\n:dsa\nins2 par1 par2\n';
				var ps = ProcedureSet.fromString(s);

				expect(ps.procedures).toEqual({
					'asd': new Procedure('asd', [
						new Instruction('ins1', ['par1'])
					]),
					'dsa': new Procedure('dsa', [
						new Instruction('ins2', ['par1', 'par2'])
					])
				});
			});

			it('can handle missing space between : and procedure name', function() {
				var s = ':asd\n\nins1 par1\n:dsa\nins2 par1 par2';
				var ps = ProcedureSet.fromString(s);

				expect(ps.procedures).toEqual({
					'asd': new Procedure('asd', [
						new Instruction('ins1', ['par1'])
					]),
					'dsa': new Procedure('dsa', [
						new Instruction('ins2', ['par1', 'par2'])
					])
				});
			});

			it('can handle extra space', function() {
				var s = '  :  asd \n ins1   par1 \n :   dsa   \n  ins2   par1  par2  ';
				var ps = ProcedureSet.fromString(s);

				expect(ps.procedures).toEqual({
					'asd': new Procedure('asd', [
						new Instruction('ins1', ['par1'])
					]),
					'dsa': new Procedure('dsa', [
						new Instruction('ins2', ['par1', 'par2'])
					])
				});
			});

			it('throws error when missing procedure name', function() {
				var s = ':\nins1 par1';

				expect(function() { ProcedureSet.fromString(s); }).toThrow(new Error('Missing procedure name'));
			});

			it('throws error when given bad procedure name', function() {
				var s = ': P1 P2\nins1 par1';

				expect(function() { ProcedureSet.fromString(s); }).toThrow(new Error('Procedure name cannot contain spaces'));
			});
		});
	});
});