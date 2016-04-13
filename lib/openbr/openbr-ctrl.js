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
            .catch(function (error) {
                reply(error.message).code(error.code);
            });
    }
};

var enrollUser = {
    handler: function (request, reply) {
        faces.enrollUser(request.payload)
            .then(function (data) {
                return reply(data);
            })
            .catch(function (error) {
                reply(error.message).code(error.code);
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
            .catch(function (error) {
                reply(error.message).code(500);
            });
    }
};

var compareUsers = {
    handler: function (request, reply) {
        faces.compareUsers(request.payload)
            .then(function (score) {
                return reply(score);
            })
            .catch(function (error) {
                reply(error.message).code(500);
            });
    }
};

module.exports = {
    list: getAllNames,
    remove: removeUser,
    create: enrollUser,
    read: getUser,
    identify: identifyUser,
    compare: compareUsers,
    docs: getDocs
};