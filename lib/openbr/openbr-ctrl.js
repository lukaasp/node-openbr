'use strict';

/**
 * @class openbr-ctrl
 * @description Handlers for openbr.
 */

var faces = require('./openbr-dao');

var getAllNames = {
    handler: function (request, reply) {
        return reply(faces.getAllNames());
    }
};

var removeUser = {
    handler: function (request, reply) {
        faces.removeUser(request.params.id)
            .then(function (data) {
                return reply(data);
            })
            .catch(function () {
                reply().code(404);
            });
    }
};

var enrollUser = {
    handler: function (request, reply) {
        faces.enrollUser(request.payload)
            .then(function (data) {
                return reply(data);
            })
            .catch(function () {
                reply().code(500);
            });
    }
};

var getUser = {
    handler: function (request, reply) {
        return reply.file('./lib/openbr/enrollData/' + request.params.id);
    }
};
var getDocs = {
    handler: function (request, reply) {
        return reply.file('./lib/openbr/docs/' + request.params.id);
    }
};

var identifyUser = {
    handler: function (request, reply) {
        faces.identifyUser(request.payload)
            .then(function (matches) {
                return reply(matches);
            })
            .catch(function () {
                reply().code(500);
            });
    }
};

var compareUsers = {
    handler: function (request, reply) {
        faces.compareUsers(request.payload)
            .then(function (score) {
                return reply(score);
            })
            .catch(function () {
                reply().code(500);
            });
    }
};

var handler = {
    list: getAllNames,
    remove: removeUser,
    create: enrollUser,
    read: getUser,
    identify: identifyUser,
    compare: compareUsers,
    docs: getDocs
};

module.exports = handler;
