module.exorts = function (value, func) {
	if (value.then && typeof value.then === 'function') {
		return value.then(func);
	} else {
		return func(value);
	}
};
