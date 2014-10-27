'use strict';

var expressions = require('angular-expressions');

var TagParserDelegate = require('./TagParserDelegate');
var TreeVisitor = require('./TreeVisitor');

var Chars = {
	NEWLINE: 10,
	SPACE: 32,
	OPEN: 60,
	CLOSE: 62,
	DOLLAR: 36,
	PERCENT: 37,
	SLASH: 47
};

var TemplateParser = function () {
	this.commands = null;
};

module.exports = TemplateParser;

TemplateParser.prototype.parse = function (template) {
	var _this = this;
	var curpos = 0;
	var isClosing = false;
	var autoClosing = false;
	var tagParserDelegate = new TagParserDelegate();
	var treeVisitor = new TreeVisitor();
	Object.keys(this.commands).forEach(function (key) {
		treeVisitor.registerCommand(key, _this.commands[key]);
	});

	for (curpos = 0; curpos < template.length; curpos++) {
		var byte = template[curpos];
		var nextByte = template[curpos + 1];
		if (byte === Chars.OPEN) {
			if (nextByte === Chars.SLASH) {
				tagParserDelegate.tagCloseStart(curpos);
				isClosing = true;
			} else if (nextByte === Chars.DOLLAR) {
				tagParserDelegate.tagAutocloseStart(curpos);
				autoClosing = true;
			} else {
				tagParserDelegate.tagOpenStart(curpos);
			}
		} else if (byte === Chars.CLOSE) {
			if (isClosing) {
				isClosing = false;
				tagParserDelegate.tagCloseEnd(curpos);
			} else if (autoClosing) {
				autoClosing = false;
				tagParserDelegate.tagAutocloseEnd(curpos);
			} else {
				tagParserDelegate.tagOpenEnd(curpos);
			}
		}
	}

	tagParserDelegate.last(curpos);
	expressions.filters.capitalize = function (str) {
		return str[0].toUpperCase() + str.slice(1);;
	};
	treeVisitor.expressions = expressions;
	treeVisitor.visit(template, tagParserDelegate.rootNode, this.context);
};
