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


console.log(ChainSorter(names).desc('first').sort());
console.log(ChainSorter(names).asc('last', 'first').sort());
console.log(ChainSorter(names).asc(...['first', 'last']).sort());