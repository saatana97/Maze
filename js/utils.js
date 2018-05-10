Object.prototype.marge = function (target, margeAll) {
    if (typeof margeAll === "undefined") {
        margeAll = true;
    }
    for (var prop in target) {
        var value = target[prop];
        if (typeof value !== "undefined" && (margeAll || prop in this)) {
            this[prop] = value;
        }
    }
}
Math.between = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
Math.range = function (array, filter) {
    var result = null;
    if (typeof filter !== "function") {
        filter = function () { return true };
    }
    if (array instanceof Array && array.length > 0) {
        var index = Math.between(0, array.length - 1);
        result = array[index];
        if (filter(result) !== true) {
            array = array.slice(0).splice(index, 1);
            result = Math.range(array, filter);
        }
    }
    return result;
}
Math.avg = function () {
    if (arguments.length === 0) return 0;
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum / arguments.length;
}
