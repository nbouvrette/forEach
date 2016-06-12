# forEach
Breakable forEach operator for Javascript



Javascript is a great language but have you ever wished you could have a simple way to loop through any object type and break out of it whenever needed. It is possible to do it through native `for` and `for...in` loops but a lot of boilerplate code is required. What if a new function could solve all this problems with only a few line of code with the promise of being also compatible on legacy and new browsers? Here is the solution! Simply copy paste the content of the `forEach.js` file anywhere you might require it in your project and you can start using this new tool. This solution has been designed like a new operation to avoid conflicts with other builtin methods such as `Array.forEach` which is far from what this version offer.

## Supportability

It supports `Arrays`, `Strings`, and any type of `Object`. It also has been tested on IE8+ but could possibly compatible with older browser as well (untested). No dependancy required, this is lightweight (less than 0.5kb minified) vanilla JS.

## Examples

#### Example #1: Display each character of a string individually in the console.

```javascript
forEach('hello', function(letter) {
    console.log(letter);
});
```

#### Example #2: Display each value of an array individually in the console.

```javascript
forEach([1, 2, 3], function(number) {
    console.log(number);
});
```

#### Example #3: Display only the values of an array until a condition has been met.

```javascript
forEach([1, 2, 3, 4], function(number) {
    if (number == 3) {
      return false;
    }
    console.log(number);
});
```
This will only display (and loop) 1 and 2.

#### Example #4: Display each value of a NodeList until a condition has been met.

```javascript
var listOfNonVisibleDivs = [];

forEach(document.querySelectorAll('div'), function(divElement) {
    if (divElement.id == 'doNotGoPastThisId') {
      return false;
    }
    if (divElement.style.display == 'none') {
      listOfNonVisibleDivs.push(divElement)
    }
});
console.log(listOfNonVisibleDivs);
```
This will build a new array containing all `div` elements before a specific div with the id value of `doNotGoPastThisId`.

#### Example #5: Display an object's key/value from within an other object's scope until a condition has been met.

```javascript
window.TestObject = {
    printStillLowerThan: function(number, thing, limit) {
        console.log('A ' + number + ' meters ' + thing + ' is still lower than the ' + limit + ' meters limit.');
    },

    testMethod: function() {
        var limit = 500;
        forEach({tree: 10, building: 20, skyscraper: 300, everest: 10000}, function(attributeValue, attributeName) {
            if (attributeValue > limit) {
                return false;
            }
            this.printStillLowerThan(attributeValue, attributeName, limit);
        }, this)
    }
};

TestObject.testMethod();
```
The output will stop the display (and loop) at the limit as follows:
```
A 10 meters tree is still lower than the 500 meters limit.
A 20 meters building is still lower than the 500 meters limit.
A 300 meters skyscraper is still lower than the 500 meters limit.
```
