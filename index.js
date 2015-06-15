'use strict';

// Where b contains all of a
function _does(a, b) {
  if (typeof a !== typeof b) {
		return false;
  }

  if (typeof a !== 'object') {
		return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
		return a.every(function(aChild) {
		  if (typeof aChild !== 'object') {
				return b.indexOf(aChild) !== -1;
		  }

		  return b.some(function(bChild) {
				return _does(aChild, bChild);
		  });
		});
  }

  if (Object.keys(a).length > Object.keys(b).length) {
		return false;
  }

  for (var aKey in a) {
		if (!(aKey in b)) {
		  return false;
		}

		if (!_does(a[aKey], b[aKey])) {
	  	return false;
		}
  }

  return true;
}

module.exports = {
	does: _does
};