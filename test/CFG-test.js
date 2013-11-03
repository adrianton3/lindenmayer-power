define([
	'SubString',
	'Prod',
	'CFG'
	], function(
		SubString,
		Prod,
		CFG
	) {
	'use strict';

	describe('CFG', function() {
		describe('fromString', function() {
			it('can get the starting symbol of a single nonterminal grammar', function() {
				var s = '-> Start\n1 a-nonterm';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('Start');
			});

			it('can get the starting symbol of a more than one nonterminal grammar', function() {
				var s = '-> Tar\n1 a-nonterm\n-> Splat\n1 a-nonterm b-nonterm';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('Tar');
			});

			it('can get the starting symbol when a separating space is missing', function() {
				var s = '->Start\n1 a-nonterm';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('Start');
			});

			it('can handle missing the separator space', function() {
				var s = '->Tar\na-nonterm\nb-nonterm\n->Splat\n1 c-nonterm d-nonterm';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('Tar');
				expect(cfg.prod).toEqual({
					'Tar': new Prod('Tar', [
						new SubString(1, ['a-nonterm']),
						new SubString(1, ['b-nonterm'])
					], 2),
					'Splat': new Prod('Splat', [
						new SubString(1, ['c-nonterm', 'd-nonterm'])
					], 1)
				});
			});

			it('can handle extra spaces', function() {
				var s = '  ->  Tar  \n  a-nonterm  \n  b-nonterm  \n  ->  Splat  \n  1  c-nonterm  d-nonterm ';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('Tar');
				expect(cfg.prod).toEqual({
					'Tar': new Prod('Tar', [
						new SubString(1, ['a-nonterm']),
						new SubString(1, ['b-nonterm'])
					], 2),
					'Splat': new Prod('Splat', [
						new SubString(1, ['c-nonterm', 'd-nonterm'])
					], 1)
				});
			});

			it('can handle empty lines', function() {
				var s = '\n-> Tar\n\n1 a-nonterm\n\n\nb-nonterm\n-> Splat\n\n\n1 c-nonterm d-nonterm\n';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('Tar');
				expect(cfg.prod).toEqual({
					'Tar': new Prod('Tar', [
						new SubString(1, ['a-nonterm']),
						new SubString(1, ['b-nonterm'])
					], 2),
					'Splat': new Prod('Splat', [
						new SubString(1, ['c-nonterm', 'd-nonterm'])
					], 1)
				});
			});

			it('throws error when missing nonterminal name', function() {
				var s = '-> \n1 a-nonterm';

				expect(function() { CFG.fromString(s); }).toThrow(new Error('Missing source nonterminal'));
			});

			it('throws error when given bad nonterminal name', function() {
				var s = '-> Start Tar\n1 a-nonterm';

				expect(function() { CFG.fromString(s); }).toThrow(new Error('Source nonterminal cannot contain spaces'));
			});
		});
	});
});