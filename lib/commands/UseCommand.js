module.exports = function (arg, context, next) {
	var newContext = context[arg];
	newContext.__proto__ = context;
	next(null, newContext);
};
