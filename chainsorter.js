(function (fake_exports) { "use strict";

class Sortable {
	constructor(data) {
		this.data = data;
		this.definition = [];
	}

	// Append each value to the definition along with an associated sort code
	push(code, value) {
		value.forEach(function(f) {
			if (Array.isArray(f)) // In case they send in an array accidentally
				this.push(code, f);
			else
				this.definition.push([code, f]);
		}.bind(this));
		return this;
	}

	// Ascending order; takes one or more property name as arguments
	asc(field) {
		return this.push('asc', [...arguments]);
	}


	// Descending order; takes one or more property name as arguments
	desc(field) {
		return this.push('desc', [...arguments]);
	}


	// Order by a custom function.  Pass in a function that takes two params, and in it compare them
	// and return -1, 1, or 0 as appropriate.
	// Also takes one or more functions as arguments
	custom(fn) {
		return this.push('fn', [...arguments]);
	}


	// Sorts the data and also returns it
	sort() {
		return this.data.sort((a,b) => {
			for(var i=0; i < this.definition.length; i++) {
				const [code, key] = this.definition[i];
				switch(code) {
					case 'asc':
					case 'desc':
						if (a[key] > b[key])
							return code == 'asc' ? 1 : -1;
						if (a[key] < b[key])
							return code == 'asc' ? -1 : 1;
						break;
					case 'fn':
						let result = key(a, b);
						if (result != 0) // If it's zero the sort wasn't decided.
							return result;
						break;
				}
			}
			return 0;
		});
	}
}

fake_exports['ChainSorter'] = (data) => { return new Sortable(data); };
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this);
