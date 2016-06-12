function forEach (object, callback, scope) {
    var result = undefined;
    if (typeof object.length != 'undefined') {
        for (var iterator = 0; iterator < object.length; iterator++) {
            result = callback.call(scope, object[iterator], iterator, object);
            if (result !== undefined) {
                break;
            }
        }
    } else {
        for (var property in object) {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
                result = callback.call(scope, object[property], property, object);
                if (result !== undefined) {
                    break;
                }
            }
        }
    }
    return result;
}
