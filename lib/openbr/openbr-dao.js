'use strict';
/**
 * @class openbr-dao
 */

var Q = require('q');
var handler = require('./openbr-handler');
var fs = require('fs');

var allNames = function () {
    return require('../server').faces;
};

var removeUser = function (id) {
    var deferred = Q.defer();

    fs.unlink('./lib/openbr/enrollData/' + id + '.jpg', function (error) {
        if (error) {
            deferred.reject({code: 404,message: error.code + ": User doesn't exist"});
        } else {
            deferred.resolve({deleted: id, left: require('../server').faces});
        }
    });
    return deferred.promise;
};

var identifyUser = function (user) {
    var deferred = Q.defer();

    var base64Data = user.image.replace(/^data:image\/png;base64,/, '');
    var fileName = randomFileName(1);

    fs.writeFile('./lib/openbr/enrollData/' + fileName, base64Data, 'base64', function (error) {
        if (error) {
            deferred.reject({message:error});
        } else {
            var matches = [];
            var faces = require('../server').faces;

            faces.forEach(function (enrolledUser) {
                handler.compare(enrolledUser.fileName, fileName, function (score) {
                    matches.push({name: enrolledUser.name, score: parseFloat(score)});
                    if (matches.length === faces.length) {
                        deferred.resolve(matches);
                        handler.cleanUp(fileName);
                    }
                });
            });
        }
    });
    return deferred.promise;
};

var enrollUser = function (user) {
    var deferred = Q.defer();
    var base64Data = user.image.replace(/^data:image\/png;base64,/, '');

    var userExists = require('../server').faces.filter(function (face) {
        return face.name === user.name;
    }).length;

    if (userExists) {
        deferred.reject({code: 403, message: "Forbidden: User already exists"});
    } else {
        fs.writeFile('./lib/openbr/enrollData/' + user.name + '.jpg', base64Data, 'base64', function (error) {
            if (error) {
                deferred.reject({message:error});
            } else {
                deferred.resolve({name: user.name});
            }
        });
    }
    return deferred.promise;
};

var compareUsers = function (data) {
    var deferred = Q.defer();

    var base64Data1 = data.image1.replace(/^data:image\/png;base64,/, '');
    var base64Data2 = data.image2.replace(/^data:image\/png;base64,/, '');

    var fileName1 = randomFileName(1);
    var fileName2 = randomFileName(2);

    fs.writeFile('./lib/openbr/enrollData/' + fileName1, base64Data1, 'base64', function (error) {
        if (error) {
            deferred.reject({message:error});
        } else {
            fs.writeFile('./lib/openbr/enrollData/' + fileName2, base64Data2, 'base64', function (error) {
                if (error) {
                    deferred.reject({message:error});
                } else {
                    handler.compare(fileName1, fileName2, function (score) {
                        deferred.resolve(parseFloat(score));
                        handler.cleanUp(fileName1);
                        handler.cleanUp(fileName2);
                    });
                }
            });
        }
    });
    return deferred.promise;
};

function randomFileName(mod){
    return '.testuser'+ mod + Math.random().toString(36).slice(2) + '.jpg';
}

module.exports = {
    getAllNames: allNames,
    removeUser: removeUser,
    identifyUser: identifyUser,
    enrollUser: enrollUser,
    compareUsers: compareUsers
};