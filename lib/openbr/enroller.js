'use strict';

/**
* @class enroller
* @description Handlers for faces.
*/

var faces = require('./openbr-dao');
var fs = require('fs');
var Q = require('q');

module.exports  = {
    hddEnroll: function (){
        var deferred = Q.defer();

        fs.readdir('./lib/openbr/enrollData', function(error, files){
            console.log('Enrolling faces from hdd: ');
            if (error) {
                deferred.reject(new Error(error));
            } else {
                deferred.resolve(files);
            }

        });
        return deferred.promise;
    }
};