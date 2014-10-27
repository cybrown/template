'use strict';

var blocks = {};

module.exports = {
	DefineBlockCommand: function (arg, context, next) {
		var blockName = arg;
		blocks[arg] = next;
	},
	BlockCommand: function (arg, context, next) {
		blocks[arg](null, context);
	}
};
