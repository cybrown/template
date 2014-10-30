module.exports = function (arg, context, next) {
	delete context[arg];
};
