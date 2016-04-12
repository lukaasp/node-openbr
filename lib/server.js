'use strict';

/**
* @class server
* @description Routes for all handlers.
*/

var config = require('./plugins/options');
var enroller = require('./openbr/enroller');

var options = {
    port: config.port
};

var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection(options);
server.faces = [];

//users
enroller.hddEnroll().then(function (data) {
    data.forEach(function(file){
        server.faces.push({name:file.slice(0, -4), fileName: file});
    });
    console.log(server.faces);
});

//routess
var openbrRoutes = require('./openbr/openbr-routes');
server.route(openbrRoutes);

module.exports = server;
