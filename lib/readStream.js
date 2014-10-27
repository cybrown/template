var Promise = require('bluebird');

module.exports = function (inputStream) {
	return new Promise(function (resolve, reject) {
		var buffers = [];
		inputStream.on('error', function (error) {
			reject(error);
		});
		inputStream.on('data', function (buffer) {
			buffers.push(buffer);
		});
		inputStream.on('end', function () {
			resolve(Buffer.concat(buffers));
		});
	});
};
