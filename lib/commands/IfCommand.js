var expressions = require('angular-expressions');

module.exports = function (arg, context, next) {
	var expr = expressions.compile(arg);
	if (expr(context)) {
		next(null, context);
	}
};
