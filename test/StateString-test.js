define([
	'StateString',
	'SubString',
	'Prod',
	'CFG'
	], function(
		StateString,
		SubString,
		Prod,
		CFG
	) {
	'use strict';

	describe('StateString', function() {
		describe('derive', function() {
			it('derives a nonterminal', function() {
				var cfg = new CFG('S', {
					'S': new Prod('S', [
						new SubString(1, ['a'])
					], 1)
				});
				var stateString = new StateString(['S']);
				var derived = stateString.derive(cfg);

				expect(derived).toEqual(new StateString(['a']));
			});
			it('does not derive a terminal', function() {
				var cfg = new CFG('S', {
					'S': new Prod('S', [
						new SubString(1, ['b'])
					], 1)
				});
				var stateString = new StateString(['a']);
				var derived = stateString.derive(cfg);

				expect(derived).toEqual(new StateString(['a']));
			});
			it('derives many nonterminals', function() {
				var cfg = new CFG('S', {
					'S': new Prod('S', [
						new SubString(1, ['a'])
					], 1),
					'T': new Prod('T', [
						new SubString(1, ['b', 'c'])
					], 1)
				});
				var stateString = new StateString(['S', 'T', 'T']);
				var derived = stateString.derive(cfg);

				expect(derived).toEqual(new StateString(['a', 'b', 'c', 'b', 'c']));
			});
			it('derives a nonterminal into []', function() {
				var cfg = new CFG('S', {
					'S': new Prod('S', [], 0)
				});
				var stateString = new StateString(['S']);
				var derived = stateString.derive(cfg);

				expect(derived).toEqual(new StateString([]));
			});
		});
	});
});