'use strict';

var fs = require('fs');

var Promise = require('bluebird');

var TemplateParser = require('./lib/TemplateParser');
var commands = require('./lib/commands');
var readStream = require('./lib/readStream');

var dataPath = process.argv[2];

var templateParser = new TemplateParser();
templateParser.commands = commands;

new Promise(function (resolve, reject) {
	if (dataPath) {
		fs.readFile(dataPath, function (err, data) {
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
		resolve({
			text: 'hello',
			person: {
				name: 'Cy'
			},
			numbers: [7, 13, 21],
			trueValue: true,
			falseValue: false,
			'var': 'outside use',
			'in': {
				'var': 'inside use'
			}
		});
	}
}).then(function (data) {
	templateParser.context = data;
	return readStream(process.stdin);
}).then(function (template) {
	templateParser.parse(template);
}).catch(function (err) {
	console.error(err);
});
