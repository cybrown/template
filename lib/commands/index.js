'use strict';

module.exports = {
	'if': require('./IfCommand'),
	'loop': require('./LoopCommand'),
	'use': require('./UseCommand'),
	'defineBlock': require('./BlockCommand').DefineBlockCommand,
	'block': require('./BlockCommand').BlockCommand,
	'option': require('./OptionCommand')
};
