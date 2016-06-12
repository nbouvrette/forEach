/**
 * Custom `forEach` operator to cut down on boilerplate code and to increase readability.
 *
 * @param {Object} object     - The object from which to start the loop.
 * @param {Function} callback - The callback function to call on each loop.
 * @param {Object} [scope]    - The scope when calling the callback function.
 */
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
