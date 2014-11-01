var assert = require('assert');

var Promise = require('bluebird');
var MemoryStream = require('memory-stream');

var fs = Promise.promisifyAll(require('fs'));

var TemplateParser = require('../lib/TemplateParser');

describe ('Integration', function () {

	var templateParser = null;
	var stream = null;

	beforeEach (function () {
		stream = new MemoryStream();
		templateParser = new TemplateParser();
		templateParser._stream = stream;
	});

	var compareComputedAndOutput = function (name, done) {
		Promise.all([
			fs.readFileAsync(__dirname + '/' + name + '.tpl'),
			fs.readFileAsync(__dirname + '/' + name + '.json'),
			fs.readFileAsync(__dirname + '/' + name + '.txt')
		]).spread(function (template, jsonBuffer, result) {
			var context = JSON.parse(jsonBuffer.toString());
			templateParser.context = context;
			templateParser.parse(template);
			assert.ok(result <= stream.toBuffer() && result >= stream.toBuffer());
			done();
		}).catch(done);
	};

	describe ('Internal commands', function () {

		it ('$ internal command', function (done) {
			compareComputedAndOutput('variable', done);
		});
	});

	describe ('Commands', function () {

		describe ('UseCommand', function () {
			it ('use', function (done) {
				compareComputedAndOutput('use', done);
			});
		});

		describe ('IfCommand', function () {
			it ('if', function (done) {
				compareComputedAndOutput('if', done);
			});
		});
	});
});
