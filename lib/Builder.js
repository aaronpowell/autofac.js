var Container = require('./Container');
var RegistrationOptions = require('./RegistrationOptions');
var Registration = require('./Registration');

var Builder = function () {
    if (this.constructor !== Builder) {
        return new Builder();
    }

    this.registrations = [];
};

var proto = Builder.prototype;

proto.register = function ( /* name, fn */ ) {
    if (!arguments.length) {
        throw 'Must provide something to register';
    }

    var name, registration;

    if (arguments.length === 1) {
        registration = arguments[0];
    } else {
        name = arguments[0];
        registration = arguments[1];
    }

    var obj = {
        name: name,
        registration: Registration(registration)
    };

    this.registrations.push(obj);

    return RegistrationOptions(obj);
};

proto.build = function () {
    return Container(this.registrations);
};

module.exports = Builder;