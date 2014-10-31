var MemoryStream = require('memory-stream');

module.exports = function (arg, context, next, api) {
	var stream = new MemoryStream();
	var oldStream = api.getCurrentStream();
	context[arg] = stream;
	api.setCurrentStream(stream);
	next(null, context);
	api.setCurrentStream(oldStream);
};
