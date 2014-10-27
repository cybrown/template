var TagParserDelegate = require('./TagParserDelegate');
var TreeVisitor = require('./TreeVisitor');
var expressions = require('angular-expressions');
var fs = require('fs');

var dataPath = process.argv[2];
var data = false;

if (dataPath) {
	data = JSON.parse(fs.readFileSync(dataPath).toString());
}



var buffers = [];

var Chars = {
	NEWLINE: 10,
	SPACE: 32,
	OPEN: 60,
	CLOSE: 62,
	DOLLAR: 36,
	PERCENT: 37,
	SLASH: 47
};

process.stdin.on('data', function (buffer) {
	buffers.push(buffer);
});

var commandIf = function (arg, context, next) {
	var expr = expressions.compile(arg);
	if (expr(context)) {
		next(null, context);
	}
};

var commandLoop = function (arg, context, next) {
	var index = arg.indexOf(' ');
	var iterator = arg.substring(0, index);
	var strExpr = arg.substring(index + 1);

	var expr = expressions.compile(strExpr);
	var newContext = {};
	newContext.__proto__ = context;
	var result = expr(newContext);
	for (var i = 0; i < result.length; i++) {
		newContext[iterator] = result[i];
		newContext.first = i === 0;
		newContext.last = i === (result.length - 1);
		newContext.index = i;
		next(null, newContext);
	}
};

var commandUse = function (arg, context, next) {
	var newContext = context[arg];
	newContext.__proto__ = context;
	next(null, newContext);
};

process.stdin.on('end', function () {
	var template = Buffer.concat(buffers);
	var curpos = 0;
	var isClosing = false;
	var autoClosing = false;
	var tagParserDelegate = new TagParserDelegate();
	var treeVisitor = new TreeVisitor();
	treeVisitor.registerCommand('if', commandIf);
	treeVisitor.registerCommand('loop', commandLoop);
	treeVisitor.registerCommand('use', commandUse);

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
	var context = data || {
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
	expressions.filters.capitalize = function (str) {
		return str[0].toUpperCase() + str.slice(1);;
	};
	treeVisitor.expressions = expressions;
	treeVisitor.visit(template, tagParserDelegate.rootNode, context);
});
