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

    require('fs').unlink('./lib/openbr/enrollData/' + id + '.jpg', function (error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            require('../server').faces = require('../server').faces
                .filter(function (el) {
                    return el.name !== id;
                });
            deferred.resolve({deleted: id, left: require('../server').faces});
        }
    });
    return deferred.promise;
};

var identifyUser = function (user) {
    var deferred = Q.defer();

    var base64Data = user.image.replace(/^data:image\/png;base64,/, '');
    var fileName = 'testuser'+Math.random().toString(36).slice(2)+'.jpg';

    fs.writeFile('./lib/openbr/enrollData/'+fileName, base64Data, 'base64', function (error) {
        if (error) {
            console.log('Error while writing...');
            deferred.reject(new Error(error));
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

    require('fs').writeFile('./lib/openbr/enrollData/' + user.name + '.jpg', base64Data, 'base64', function (error) {
        if (error) {
            console.log('Error while writing...');
            deferred.reject(new Error(error));
        } else {
            require('../server').faces.push({name: user.name, fileName: user.name + '.jpg'});
            deferred.resolve({name: user.name});
        }
    });
    return deferred.promise;
};

var compareUsers = function (user) {
    var deferred = Q.defer();

    var base64Data1 = user.image1.replace(/^data:image\/png;base64,/, '');
    var base64Data2 = user.image2.replace(/^data:image\/png;base64,/, '');

    var fileName1 = 'testuser'+Math.random().toString(36).slice(2)+'.jpg';
    var fileName2 = 'testuser'+Math.random().toString(36).slice(2)+'.jpg';

    fs.writeFile('./lib/openbr/enrollData/'+fileName1, base64Data1, 'base64', function (error) {
        if (error) {
            console.log('Error while writing...');
            deferred.reject(new Error(error));
        } else {
            fs.writeFile('./lib/openbr/enrollData/'+fileName2, base64Data2, 'base64', function (error) {
                if (error) {
                    console.log('Error while vwriting...');
                    deferred.reject(new Error(error));
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

var faces = {
    getAllNames: allNames,
    removeUser: removeUser,
    identifyUser: identifyUser,
    enrollUser: enrollUser,
    compareUsers: compareUsers
};

module.exports = faces;
