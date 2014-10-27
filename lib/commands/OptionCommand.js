'use strict';

var expressions = require('angular-expressions');

module.exports = function (arg, context, next, api) {
	var args = arg.split(' ');
	var expr = expressions.compile(args[1], context);
	var oldOptionValue = api.getOption(args[0]);
	api.setOption(args[0], expr());
	next(null, context);
	api.setOption(args[0], oldOptionValue);
};
