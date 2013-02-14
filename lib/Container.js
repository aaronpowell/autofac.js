var Container = function (registrations) {
    if (this.constructor !== Container) {
        return new Container(registrations);
    }

    this.registrations = registrations;
};

Container.prototype.resolve = function(name) {
    if (!name) {
        throw 'Provide a name for the dependency to resolve';
    }

    var matches = this.registrations.filter(function (r) {
        return r.name === name;
    });

    if (!matches.length) {
        throw 'Unable to find a match for dependency named ' + name;
    }

    return matches[0].registration;
};

module.exports = Container;