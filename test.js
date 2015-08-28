'use strict';

var JSONInclude = require('./index');
var expect = require('chai').expect;

context('#JSONInclude', function() {
	describe('#inspect', function() {
	  it('should be able to compare array with one deep level', function() {
	    var A = [ 'b' ];
	    var B = [ 'a', 'b', 'c' ];
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = [ 'd' ];
	    var D = [ 'a', 'b', 'c' ];
	    expect(JSONInclude.inspect(C, D)).to.be.false;
	  });

	  it('should be able to compare objects with one deep level', function() {
	    var A = { name: 'rule' };
	    var B = { key1: 'one', name: 'rule', key2: 'two' };
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = { name: 'rule' };
	    var D = { key1: 'one', name: 'rules', key2: 'two' };
	    expect(JSONInclude.inspect(C, D)).to.be.false;
	  });

	  it('should be able to compare array containing one level deeep objects', function() {
	    var A = [ { id: 'b' } ];
	    var B = [ { id: 'a' }, { id: 'b' }, { id: 'c' } ];
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = [ { id: 'd' } ];
	    var D = [ { id: 'a' }, { id: 'b' }, { id: 'c' } ];
	    expect(JSONInclude.inspect(C, D)).to.be.false;
	  });

	  it('should be able to compare objects with one deep level array', function() {
	    var A = {
	      name: [ 'a', 'b', 'c' ],
	      other: [ 'a' ]
	    };
	    var B = {
	      name: [ 'a', 'b', 'c', 'd' ],
	      other: [ 'a', 'b' ],
	      otherKey: [ 'a', 'b' ]
	    };
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = {
	      name: [ 'a', 'b' ],
	      other: [ 'a' ]
	    };
	    var D = {
	      name: [ 'a', 'b', 'c', 'd' ],
	      other: [ 'b' ],
	      otherKey: [ 'a', 'b' ]
	    };
	    expect(JSONInclude.inspect(C, D)).to.be.false;
	  });

	  it('should be able to compare complexe objects', function() {
	    var A = {
	      name: 'test',
	      tags: [
	        { type: 'tag', id: 'c' }, { type: 'tag', id: 'b' }
	      ],
	      videoTypes: [ 'replay', 'bonus' ]
	    };
	    var B = {
	      name: 'test',
	      more: { tata: 'toto' },
	      videoTypes: [ 'extrait', 'replay', 'live', 'bonus' ],
	      tags: [
	        { type: 'tag', id: 'a' }, { type: 'tag', id: 'b' }, { type: 'tag', id: 'c' }
	      ],
	      opt: 'some'
	    };
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = {
	      name: 'test',
	      tags: [
	        { type: 'tag', id: 'b' }, { type: 'tag', id: 'e' }
	      ],
	      videoTypes: [ 'replay', 'bonus' ]
	    };
	    var D = {
	      name: 'test',
	      more: { tata: 'toto' },
	      videoTypes: [ 'extrait', 'replay', 'live', 'bonus' ],
	      tags: [
	        { type: 'tag', id: 'a' }, { type: 'tag', id: 'b' }, { type: 'tag', id: 'c' }
	      ],
	      opt: 'some'
	    };
	    expect(JSONInclude.inspect(C, D)).to.be.false;
	  });

	  it('should be able to compare 3 deep level complexe objects', function() {
	    var A = {
	      tags: [
	        { type: 'tag', id: 'c', more: [ 'totoo' ] },
	      ],
	    };
	    var B = {
	      tags: [
	        { type: 'tag', id: 'c', more: [ 'totoo' ] }, { type: 'tag', id: 'c', more: [ 'totoo' ] },
	      ],
	    };
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = {
	      tags: [
	        { type: 'tag', id: 'c', more: { toto: 'tata' } },
	      ],
	    };
	    var D = {
	      tags: [
	        { type: 'tag', id: 'c', more: { toto: 'tata' } },
	      ],
	    };
	    expect(JSONInclude.inspect(C, D)).to.be.true;
	  });

	  it('should be able to compare exreme complexe objects', function() {
	    var A = {
	      name: 'complexe',
	      tags: [
	        { type: 'tag', id: 'c', more: [ { tata: 'toto' } ] },
	      ],
	    };
	    var B = {
	      name: 'complexe',
	      tags: [
	        { type: 'tag', id: 'c', more: [ { tata: 'toti' } ] }, { type: 'tag', id: 'c', more: [ { tata: 'toto' } ] },
	      ],
	      other: 'ok'
	    };
	    expect(JSONInclude.inspect(A, B)).to.be.true;

	    var C = {
	      name: 'complexe',
	      tags: [
	        { type: 'tag', id: 'c', more: [ { tata: 'toto' } ] },
	      ],
	    };
	    var D = {
	      name: 'complexe',
	      tags: [
	        { type: 'tag', id: 'c', more: [ { tata: 'toti' } ] }, { type: 'tag', id: 'c', more: [ { tata: 'tota' } ] },
	      ],
	      other: 'ok'
	    };
	    expect(JSONInclude.inspect(C, D)).to.be.false;
	  });
	});

	describe('#fullfill', function() {
		it('should add the missing item', function() {
			var A = [ 'a', 'b', 'c' ];
			var B = [ 'a', 'b' ];

			JSONInclude.fullfill(A, B);

			expect(B.length).to.be.equal(A.length);
			expect(A).to.be.eql([ 'a', 'b', 'c' ]);
			expect(B).to.be.eql([ 'a', 'b', 'c' ]);
		});

		it('should add the missing item', function() {
			var a = { name: 'toto', age: 14 };
			var b = { name: 'toto' };

			JSONInclude.fullfill(a, b);

			expect(a).to.be.eql({ name: 'toto', age: 14 });
			expect(b).to.be.eql({ name: 'toto', age: 14 });
		});

		it('should add the missig item', function() {
			var a = { name: 'toto', age: 14, cars: [ 'class A', 'CLA' ] };
			var b = { name: 'toto' };

			JSONInclude.fullfill(a, b);

			expect(a).to.be.eql({ name: 'toto', age: 14, cars: [ 'class A', 'CLA' ] });
			expect(b).to.be.eql({ name: 'toto', age: 14, cars: [ 'class A', 'CLA' ] });
		});

		it('should add the missig item', function() {
			var a = { name: 'toto', age: 14, cars: [ 'class A', 'CLA' ] };
			var b = { name: 'toto', cars: [ 'Clio' ] };

			JSONInclude.fullfill(a, b);

			expect(a).to.be.eql({ name: 'toto', age: 14, cars: [ 'class A', 'CLA' ] });
			expect(b).to.be.eql({ name: 'toto', age: 14, cars: [ 'Clio', 'class A', 'CLA' ] });
		});
	});
});