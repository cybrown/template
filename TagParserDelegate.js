'use strict';

var TagParserDelegate = function () {
	this.start = 0;
	this.rootNode = {
		children: [],
		parent: null
	};
	this.currentNode = this.rootNode;
};

module.exports = TagParserDelegate;

TagParserDelegate.prototype.pushDataNode = function (curpos) {
	this.currentNode.children.push({
		type: 'data',
		start: this.start,
		end: curpos
	});
};

TagParserDelegate.prototype.tagAutocloseStart = function (curpos) {
	this.pushDataNode(curpos);
	var node = {
		type: 'variable',
		start: curpos + 2,
		end: 0,
		parent: this.currentNode,
		toJSON: function () {
			return {
				type: this.type,
				start: this.start,
				end: this.end
			};
		}
	};
	this.currentNode.children.push(node);
	this.currentNode = node;
};

TagParserDelegate.prototype.tagAutocloseEnd = function (curpos) {
	this.currentNode.end = curpos;
	this.currentNode = this.currentNode.parent;
	this.start = curpos + 1;
};

TagParserDelegate.prototype.tagOpenStart = function (curpos) {
	this.pushDataNode(curpos);
	var node = {
		type: 'node',
		start: curpos + 2,
		end: 0,
		children: [],
		parent: this.currentNode,
		toJSON: function () {
			return {
				type: this.type,
				start: this.start,
				end: this.end,
				children: this.children
			};
		}
	};
	this.currentNode.children.push(node);
	this.currentNode = node;
};

TagParserDelegate.prototype.tagOpenEnd = function (curpos) {
	this.currentNode.end = curpos;
	this.start = curpos + 1;
};

TagParserDelegate.prototype.tagCloseStart = function (curpos) {
	this.pushDataNode(curpos);
};

TagParserDelegate.prototype.tagCloseEnd = function (curpos) {
	this.currentNode = this.currentNode.parent;
	this.start = curpos + 1;
};

TagParserDelegate.prototype.last = function (curpos) {
	this.currentNode.children.push({
		type: 'data',
		start: this.start,
		end: curpos
	});
};
