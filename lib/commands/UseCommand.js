module.exports = function (arg, context, next) {
	var newContext = context[arg];
	try {
		newContext.__proto__ = context;
	} catch (e) {
		
	}
	next(null, newContext);
};
