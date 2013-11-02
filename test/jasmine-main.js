require.config({
	baseUrl: '../src',
	paths: {
		test: '../test'
	}
});

require(['test/all-tests'], function() {
	'use strict';

	var env = jasmine.getEnv();
	env.addReporter(new jasmine.HtmlReporter());
	env.execute();
});