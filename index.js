'use strict';

var fs = require('fs');

var TemplateParser = require('./lib/TemplateParser');
var commands = require('./lib/commands');

var dataPath = process.argv[2];
var data = null;

if (dataPath) {
	data = JSON.parse(fs.readFileSync(dataPath).toString());
} else {
	data = {
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
	};
}

var buffers = [];

process.stdin.on('data', function (buffer) {
	buffers.push(buffer);
});

process.stdin.on('end', function () {
	var template = Buffer.concat(buffers);
	var templateParser = new TemplateParser();
	templateParser.context = data;
	templateParser.commands = commands;
	templateParser.parse(template);
});
