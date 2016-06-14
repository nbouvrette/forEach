# forEach
Breakable forEach operator for Javascript



Javascript is a great language but have you ever wished you could have a simple way to loop through any object type and break out of it whenever needed. It is possible to do it through native `for` and `for...in` loops but a lot of boilerplate code is required. What if a new function could solve all this problems with only a few line of code with the promise of being also compatible on legacy and new browsers? Here is the solution! Simply copy paste the content of the `forEach.js` file anywhere you might require it in your project and you can start using this new tool. This solution has been designed like a new operator to avoid conflicts with other builtin methods such as `Array.forEach` which is far from what this version offer.

## Supportability

It supports `Arrays`, `Strings`, and any type of `Object`. It also has been tested on IE8+ but could possibly compatible with older browser as well (untested). No dependancy required, this is lightweight (less than 0.5kb minified) vanilla JS.

Make sure to minify with the solution of your choice. This version is not provided to keep this repository simple to manage.

This solution does not actually support the `break` command. You will have to use `return` to actually break the loop instead.

## Performance

Performance of this solution can be almost as fast a `for` loop as demonstrated here: https://jsfiddle.net/p4zq16rt/2/

Results while iterator a huge array:

```
For loop:  11.590000000000146
Custom forEach loop:  12.679999999999836
For...of loop:  64.29999999999973
For...in loop:  272.605
Array.forEach loop:  217.5699999999997
```

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
#### Example #6: Collect the returned value from a `forEach` loop.
```javascript
function whoIs(yearsOld) {
    var name = forEach({Joe: 30, Jack: 43, John: 55}, function(age, name) {
        if (age == yearsOld) {
            return name;
        }
    });
    return name + ' is ' + yearsOld + '.';
}
console.log(whoIs(30));

```
In this example, the iteration stopped right when it hit Joe and returned his name:
```
Joe is 30.
```
