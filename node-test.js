const {ChainSorter} = require('./chainsorter.js');


const names = [{
		"first": "John",
		"last": "Doe",
		"id": 0
	},
	{
		"first": "Jane",
		"last": "Smith",
		"id": 1
	},
	{
		"first": "John",
		"last": "Rabble",
		"id": 2
	},
	{
		"first": "Jack",
		"last": "Doe",
		"id": 3
	}];

const vals = [['John', 'Doe'], ['Jane', 'Smith'], ['John', 'Rabble'], ['Jack', 'Doe']];

console.log(ChainSorter(names).desc('first').sort()); // You can send a single field param
console.log(ChainSorter(names).asc('last', 'first').sort()); // You can send in multiple params
console.log(ChainSorter(names).asc(...['first', 'last']).sort()); // You can expand your array before passing it in
console.log(ChainSorter(names).asc(['first', 'last']).sort()); // You can also send in an array if you want
console.log(ChainSorter(vals).asc(0, 1).sort()); // You can send in indices of your array is of arrays