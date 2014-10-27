'use strict';

var TreeVisitor = function () {
	var _this = this;
	this.logger = {
		log: function () {}
	};
	this.output = function (data) {
		process.stdout.write(data);
	};
	this.commands = {};
	this.expressions = require('angular-expressions');
	//this.logger = console;
	//this.output = function () {};
};

module.exports = TreeVisitor;

TreeVisitor.prototype.visit = function (template, node, context) {
	var _this = this;
	this.template = template;
	node.children.forEach(function (node) {
		_this._visit(node, context);
	});
};

TreeVisitor.prototype.registerCommand = function (name, func) {
	this.commands[name] = func;
};

TreeVisitor.prototype._visit = function (node, context) {
	switch (node.type) {
		case 'data':
			this._visitData(node, context);
			break;
		case 'variable':
			this._visitExpression(node, context);
			break;
		case 'node':
			this._visitCommand(node, context);
			break;
	}
};

TreeVisitor.prototype._visitData = function (node, context) {
	var data = this.template.slice(node.start, node.end).toString();
	this.logger.log('data: [%s]', data);
	this.output(data);
};

TreeVisitor.prototype._visitCommand = function (node, context) {
	var _this = this;
	var line = this.template.slice(node.start, node.end).toString();
	this.logger.log('command: [%s]', line);
	var index = line.indexOf(' ');
	var command = line.substring(0, index);
	var arg = line.substring(index + 1);
	this.logger.log('node command: [%s]', command);
	this.logger.log('node arg: [%s]', arg);

	this.commands[command](arg, context, function (err, context) {
		node.children.forEach(function (node) {
			_this._visit(node, context);
		});
	});
};

TreeVisitor.prototype._visitExpression = function (node, context) {
	this.logger.log('expression: [%s]', this.template.slice(node.start, node.end).toString());
	var expr = this.expressions.compile(this.template.slice(node.start, node.end).toString());
	var result = expr(context);
	this.logger.log('expression result: [%s]', result);
	this.output(String(result));
};
