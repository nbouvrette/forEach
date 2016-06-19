# forEach
Breakable forEach operator for Javascript

Javascript is a great language but have you ever wished you could have a simple way to loop through any object type and break out of it whenever needed. It is possible to do it through native `for` and `for...in` loops but a lot of boilerplate code is required. What if a new function could solve all this problems with only a few line of code with the promise of being also compatible on legacy and new browsers? Here is the solution! Simply copy paste the content of the `forEach.js` file anywhere you might require it in your project and you can start using this new tool. This solution has been designed like a new operator to avoid conflicts with other builtin methods such as `Array.forEach` which is far from what this version offer.

## Why?

The idea is to make code easier to read without having to wait for the latest browsers to support the new bells and whistles. Here are 3 way to solve the same example:

###### Current legacy-proof solution:
This is supported by most (+8 year old) browsers today. Unfortuately this is very verbose and can hurt your eyes after long exposure. This is also probably why new versions of JavaScript came with better options.

```javascript
var divNodeList = document.querySelectorAll('div');
for (var key = 0; key < divNodeList.length; key++) {
    var value = divNodeList[key];
    console.log(key); // This is the key;
    console.log(value); // This is the value;
}
```

###### This script:
This is what this script provide, clear way to write code - the drawback is a custom operator which is not native to JavaScript.

```javascript
forEach(document.querySelectorAll('div'), function(value, key) {
    console.log(key); // This is the key;
    console.log(value); // This is the value;
});
```

###### `for...of - the future`:
This is what the future holds (New 2015 JavaScript specification - ECMA6). As you can imagine, the support for both browsers and even IDE is limited and will take a long time to become mainstream. The other drawback is that given this is a new operator, it cannot be polyfilled, which means it will never be backward compatible. And also, it can support `break`, not just return and does not need a scope. This is what JavaScript's previous versions should have been shipped with!

```javascript
for (let [key, value] of document.querySelectorAll('div').entries()) {
    console.log(key); // This is the key;
    console.log(value); // This is the value;
}
```
Note that while this works great on iterable objects, you will be in an even worse position for non-iterable objects. The browser support as of June 18th 2016 seems only by default on Firefox. Even in Chrome you will need to enable this special flag `chrome://flags/#enable-javascript-harmony` to be able to use the `Object.entries` method.

###### Other options...
Some popular libraries such as AngularJS and jQuery have implemented their own custom loops to solve the same problem. If you are already using these libraries, `forEach.js` will be redundant. If not, then you have more reasons to continue reading below.

## Supportability

It supports `Arrays`, `Strings`, and any type of `Object`. It also has been tested on IE8+ but could possibly compatible with older browser as well (untested). No dependancy required, this is lightweight (less than 0.5kb minified) vanilla JS.

Make sure to minify with the solution of your choice. This version is not provided to keep this repository simple to manage.

This solution does not actually support the `break` command. You will have to use `return` to actually break the loop instead.

## Performance

Performance of this solution can be almost as fast a `for` loop as demonstrated here: https://jsfiddle.net/p4zq16rt/3/

Results while iterating a huge array (numbers provided from Chrome and may vary in other browsers):

```
For loop:  11.590000000000146
Custom forEach loop (this script):  12.679999999999836
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
Note that `forEach` will also work when adding `.bind(this)` after the callback function. It's a good way to specify scope on browsers that supports `bind`. Passing the scope as an argument is mostly meant for legacy browsers such as IE8.

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

## What now?

While you might say `« there is no way I will use this custom operator »`, there are several advantages by using it. Is it future proof? Most likely. Will it be redundant in a few years from now (or even sooner depending on the type of project)? For sure. In the meantime it is up to you to decide but the upside is that if you ever decide to use this, refactoring to `for...of` should be relatively easy in the future and in the meantime it will do your eyes a favor.
