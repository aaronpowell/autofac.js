var expect = require('chai').expect;
var Builder = require('../lib/index.js');

describe('basic function injection', function () {
    beforeEach(function () {
        this.builder = new Builder();
    });

    it('should allow functions to be just executed', function () {
        this.builder.register(function () {
            expect(true).to.be.true;
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

    describe('argument injection', function () {
        it('should resolve an argument', function () {
            var toResolve = {};
            this.builder.register(function (foo) {
                expect(foo).to.equal(toResolve);
            }).named('fn');

            this.builder.register(toResolve).named('foo');

            var container = this.builder.build();

            var fn = container.resolve('fn');

            fn();
        });

        it('should resolve multiple arguments', function () {
            var a = 1, b = 2;
            this.builder.register(function (x, y) {
                expect(x).to.equal(a);
                expect(y).to.equal(b);
            }).named('fn');

            this.builder.register(a).named('x');
            this.builder.register(b).named('y');

            var container = this.builder.build();

            var fn = container.resolve('fn');

            fn();
        });

        it('should resolve nested dependencies', function () {
            var fn = function () {
                expect(true).to.be.true;
            };

            var fn2 = function (fn) {
                fn();
            };

            this.builder.register(fn).named('fn');
            this.builder.register(fn2).named('fn2');

            var container = this.builder.build();

            container.resolve('fn2')();
        });
    });
});