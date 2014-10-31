'use strict';

var fs = require('fs');

var Promise = require('bluebird');

var TemplateParser = require('./lib/TemplateParser');
var readStream = require('./lib/readStream');
var args = require('commander');

var templateParser = new TemplateParser();

args
	.version('0.0.1')
	.usage('[options] <template files ...>')
	.option('-d, --data [dataFile]', 'JSON data file')
	.option('-e, --e')
	.parse(process.argv);

new Promise(function (resolve, reject) {
	if (args.data) {
		fs.readFile(args.data, function (err, data) {
			if (err) {
				reject(err);
			} else {
				try {
					resolve(JSON.parse(data.toString()));
				} catch (e) {
					reject(e);
				}
			}
		});
	} else {
		resolve({});
	}
}).then(function (data) {
	templateParser.context = data;
	var streamToRead = null;
	if (args.args[0] === '-') {
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
