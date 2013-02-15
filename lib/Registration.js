var argsRegex = /function\s+\((.*)\)/;

var Registration = function (obj) {
    if (this.constructor !== Registration) {
        return new Registration(obj);
    }

    this.obj = obj;
};

Registration.prototype.resolve = function(container) {
    if (typeof this.obj !== 'function') {
        return this.obj;
    }

    var fn = this.obj;

    var argumentNames = fn.toString()
        .split(argsRegex)[1]
        .replace(' ', '')
        .split(',')
        .filter(function (x) { return !!x.trim(); });

    var args = argumentNames.map(function (a) {
        return container.resolve(a);
    });

    return function () {
        fn.apply(this, args);
    }
};

module.exports = Registration;