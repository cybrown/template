'use strict';

var blocks = {};

module.exports = {
	DefineBlockCommand: function (arg, context, next) {
		var blockName = arg;
		blocks[arg] = next;
	},
	BlockCommand: function (arg, context, next) {
		context.$blockNext = next;
		context.$blockContext = context;
		blocks[arg](null, context);
	},
	BlockContentCommand: function (arg, context, next) {
		context.$blockNext(null, context.$blockContext);
	}
};
