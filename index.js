'use strict';

// Where b dons contain all of a
function _inspect(a, b) {
  if (typeof a !== typeof b) return false;

  if (typeof a !== 'object') return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
		return a.every(function(aChild) {
		  if (typeof aChild !== 'object') return b.indexOf(aChild) !== -1;

		  return b.some(function(bChild) {
				return _inspect(aChild, bChild);
		  });
		});
  }

  if (Object.keys(a).length > Object.keys(b).length) return false;

  for (var aKey in a) {
		if (!(aKey in b)) return false;

		if (!_inspect(a[aKey], b[aKey]))	return false;
  }

  return true;
}

// Where b will contains all of a
function _fullfill(a, b) {
  if (typeof a !== typeof b) throw new Error('both variables should have the same type');

  if (typeof a !== 'object') return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.forEach(function(aChild) {
      if (typeof aChild !== 'object') {
        if (b.indexOf(aChild) === -1) b.push(aChild);
        return ;
      }

      return b.some(function(bChild) {
        return _fullfill(aChild, bChild);
      });
    });
  }

  for (var aKey in a) {
    if (!(aKey in b)) {
      b[aKey] = a[aKey];
      continue ;
    }

    _fullfill(a[aKey], b[aKey]);
  }
}

module.exports = {
	inspect: _inspect,
	fullfill: _fullfill
};
