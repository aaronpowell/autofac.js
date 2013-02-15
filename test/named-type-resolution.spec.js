var expect = require('chai').expect;
var Builder = require('../lib/index.js');

describe('resolution by name', function () {
    beforeEach(function () {
        var builder = new Builder();

        builder.register(function () {
            expect(true).to.be.true;
        }).named('fn');

        this.container = builder.build();
    });

    it('should allow resolution of type by name', function () {
        var fn = this.container.resolve('fn');

        expect(fn).to.be.exist;
        expect(fn).to.be.a('function');
    });

    it('should throw an error when resolving an unregistered name', function () {
        var spec = this;
        var fn = function () {
            spec.container.resolve('not-exists');
        };

        expect(fn).to.throw();
    });
});