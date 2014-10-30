'use strict';

module.exports = {
	'if': require('./IfCommand'),
	'loop': require('./LoopCommand'),
	'use': require('./UseCommand'),
	'defineBlock': require('./BlockCommand').DefineBlockCommand,
	'block': require('./BlockCommand').BlockCommand,
	'blockContent': require('./BlockCommand').BlockContentCommand,
	'option': require('./OptionCommand'),
	'bin': require('./BinCommand'),
	'set': require('./SetCommand'),
	'unset': require('./UnsetCommand'),
	'buffer': require('./BufferCommand')
};
