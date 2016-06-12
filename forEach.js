function forEach (object, callback, scope) {
    var result = false;
    if (object instanceof Array || typeof object == 'string') {
        for (var iterator = 0; iterator < object.length; iterator++) {
            result = callback.call(scope, object[iterator], iterator, object);
            if (result !== undefined) {
                break;
            }
        }
    } else if (object instanceof Object) {
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
