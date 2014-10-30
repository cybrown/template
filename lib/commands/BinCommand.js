var expressions = require('angular-expressions');

var formats = {
	'i8': {
		name: 'writeInt8',
		size: 1
	},
	'i16le': {
		name: 'writeInt16LE',
		size: 2
	},
	'i16be': {
		name: 'writeInt16BE',
		size: 2
	},
	'i32le': {
		name: 'writeInt32LE',
		size: 4
	},
	'i32be': {
		name: 'writeInt32BE',
		size: 4
	},
	'u8': {
		name: 'writeUInt8',
		size: 1
	},
	'u16le': {
		name: 'writeUInt16LE',
		size: 2
	},
	'u16be': {
		name: 'writeUInt16BE',
		size: 2
	},
	'u32le': {
		name: 'writeUInt32LE',
		size: 4
	},
	'u32be': {
		name: 'writeUInt32BE',
		size: 4
	}
};

module.exports = function (arg, context, next, api) {
	var index = arg.indexOf(' ');
	var format = arg.substring(0, index);
	var data = arg.substring(index + 1);
	var expr = expressions.compile(data);
	var result = expr(context);
	var buffer = new Buffer(formats[format].size);
	buffer[formats[format].name](result, 0);
	api.write(buffer);
};
