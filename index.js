'use strict';

var Promise = require('bluebird');

var fs = Promise.promisifyAll(require('fs'));

var TemplateParser = require('./lib/TemplateParser');
var readStream = require('./lib/readStream');
var args = require('commander');
var ifAsync = require('./lib/if-async')(require('./lib/when'));

var templateParser = new TemplateParser();

args
	.version('0.0.1')
	.usage('[options] <template files ...>')
	.option('-d, --data [dataFile]', 'JSON data file')
	.option('-e, --e')
	.parse(process.argv);

ifAsync(args.data, function () {
	return fs.readFileAsync(args.data).then(function (data) {
		return JSON.parse(data.toString());
	});
}, function () {
	return {};
}).then(function (data) {
	templateParser.context = data;
	templateParser.context.setFlag = function (value, pos) {
		return value | Math.pow(2, pos);
	};
	var streamToRead = null;
	if (!args.args.length || args.args[0] === '-') {
		streamToRead = process.stdin;
	} else {
		streamToRead = fs.createReadStream(args.args[0])
	}
	return readStream(streamToRead);
}).then(function (template) {
	templateParser.parse(template);
}).catch(function (err) {
	console.error(err.stack);
});
