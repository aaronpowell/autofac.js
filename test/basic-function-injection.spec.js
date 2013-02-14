var expect = require('chai').expect;
var Builder = require('../lib/index.js');

describe('basic function injection', function () {
    beforeEach(function () {
        this.builder = new Builder();
    });

    it('should allow functions to be just executed', function () {
        this.builder.register(function () {
            expect(true).to.equal(true);
        }).named('fn');

        var container = this.builder.build();

        var fn = container.resolve('fn');

        fn();
    });


    it('should be able to resolve constant values', function () {
        this.builder.register('foo').named('foo');

        var container = this.builder.build();

        var foo = container.resolve('foo');

        expect(foo).to.equal('foo');
    });

    it('should raise an error if there was no matching registration', function () {
        var container = this.builder.build();

        expect(container.resolve, 'foo').throws();
    });
});