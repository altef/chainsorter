# ChainSorter

_Sort your data in a single line_ &ndash; or more, if you like.

I got tired of writing `sort()` compare functions, so I made this general purpose sorting helper, which I'm now spinning off into a little library of its own.  Maybe it'll help someone else, only time and download stats will tell.

**ChainSorter** uses `sort()` under the hood, but allows you to simply define how you want that sort to work.  It does so by exposing the functions `asc()` and `desc()`, which you can pass multiple parameters to, and, of course, can chain.

The actual sort won't take place until you call `sort()`, which will return the data for immediate use.


### Getting started

Download the script or, eventually, `npm install chainsorter`.

Include it with whichever method is appropriate:
```html
<script src="chainsorter.js"></script>
```
```js 
const {ChainSorter} = require('../chainsorter.js');
```
```js
import {ChainSorter} from 'chainsorter';
```

Now, say you have an array of data such as:

```js
const names = [
    {
		"first": "John",
		"last": "Doe"
	},
	{
		"first": "Jane",
		"last": "Smith"
	},
	{
		"first": "John",
		"last": "Rabble"
	},
	{
		"first": "Jack",
		"last": "Doe"
	}
];
```

You can define your sort using the `asc()` and `desc()` functions.  Each take one or more params and can be chained.  `asc('first', 'last')` is equivalent to `asc('first').asc('last')`.

```js
const byFirstNameZtoA = ChainSorter(names).desc('first').sort();

// By last name, and if any last names are equivalent by first name
const Atoz = ChainSorter(names).asc('last', 'first').sort();

// The same as the last one, but using an array
const same = ChainSorter(names).asc(...['first', 'last']).sort();
```

The result will be sorted in priority of your definition from left to right.  Basically whichever field you pass to **ChainSorter** first will have the highest sort priority.  It will continue on to the next field/rule should that resolve a comparison as equal, and so on.

But what if you want to sort in some method that's more complicated than a niave comparison on object properties?  Well good news!  **ChainSorter** supports custom comparitor functions of its own.  And of course you can pass in as many as you want and chain them to your heart's content.  It's easily done through the `custom()` function.

### Functions

##### ChainSorter(data)
Returns a new ChainSorter object for your data.

##### asc(field)
Sort by a field (or fields) in ascending order.  You can pass multiple fields to this.  It returns the ChainSorter object for, you know, chaining.  This is exactly the same as the `desc()` function, but ascending.


##### desc(field)
Sort by a field (or fields) in descending order.  You can pass multiple fields to this.  It returns the ChainSorter object for, again, chaining.  This is exactly the same as the `asc()` function, but descending.

##### custom(fn)
Sort by a custom function.  You can pass multiple functions to this if you like.  It returns the ChainSorter object as well. Your compare function should be similar to one passed to javascript's `sort()` function &ndash; take two parameters and return `-1`, `0`, or `1`.
```js
(a,b) => { 
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
}
```

#### sort()
Perform the sort using the order you've defined, and return the data for immediate use.
