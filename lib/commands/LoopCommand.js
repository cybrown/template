'use strict';

var expressions = require('angular-expressions');

module.exports = function (arg, context, next) {
	var index = arg.indexOf(' ');
	var iterator = arg.substring(0, index);
	var strExpr = arg.substring(index + 1);

	var expr = expressions.compile(strExpr);
	var newContext = {};
	newContext.__proto__ = context;
	var result = expr(newContext);
	for (var i = 0; i < result.length; i++) {
		newContext[iterator] = result[i];
		newContext.first = i === 0;
		newContext.last = i === (result.length - 1);
		newContext.index = i;
		next(null, newContext);
	}
};
