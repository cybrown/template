var noop = function () { };

module.exports = function (when) {
    return function (condition, onTrue, onFalse) {
        onTrue = (typeof onTrue === 'function') ? onTrue : noop;
        onFalse = (typeof onFalse === 'function') ? onFalse : noop;
        return when(condition, function (conditionResult) {
            return when(conditionResult ? onTrue() : onFalse());
        });
    };
};
