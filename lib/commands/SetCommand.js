var expressions = require('angular-expressions');

module.exports = function (arg, context, next) {
	var index = arg.indexOf(' ');
	var varName = arg.substring(0, index);
	var exprStr = arg.substring(index + 1);
	var expr = expressions.compile(exprStr);
	var value = expr(context);
	context[varName] = value;
};
