var RegistrationOptions = function (obj) {
    if (this.constructor !== RegistrationOptions) {
        return new RegistrationOptions(obj);
    }

    this.registration = obj;
};

RegistrationOptions.prototype.named = function(name) {
    this.registration.name = name;

    return this;
};

module.exports = RegistrationOptions;