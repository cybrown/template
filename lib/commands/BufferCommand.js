var MemoryStream = require('memory-stream');

module.exports = function (arg, context, next, api) {
	var stream = new MemoryStream();
	var oldStream = api.getCurrentStream();
	api.setCurrentStream(stream);
	next(null, context);
	context[arg] = stream.toBuffer();
	api.setCurrentStream(oldStream);
};
