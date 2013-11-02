define(['CFG'], function(CFG) {
	'use strict';

	describe('CFG', function() {
		describe('fromString', function() {
			it('can get the starting symbol of one nonterminal grammar', function() {
				var s = '-> S\n1 a';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('S');
			});

			it('can get the starting symbol of more than one nonterminal grammar', function() {
				var s = '-> T\n1 a\n-> S\n1 a b';
				var cfg = CFG.fromString(s);

				expect(cfg.start).toEqual('T');
			});
		});
	});
});