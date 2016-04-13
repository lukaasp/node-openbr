'use strict';

/**
 * @class server
 * @description Routes for all handlers.
 */

var Hapi = require('hapi');
var config = require('./plugins/options');
var chokidar = require('chokidar');

var options = {
    port: config.port
};

var server = new Hapi.Server();
server.connection(options);
server.faces = [];


chokidar.watch('./lib/openbr/enrollData/', {ignored: /[\/\\]\./})
    .on('add', function (path) {
        var file = path.split('/').pop();
        server.faces.push({name: file.slice(0, -4), fileName: file});

        console.log(path.split('/').pop() + ' has been added');
    })
    .on('unlink', function (path) {
        var name = path.split('/').pop().slice(0, -4);

        server.faces = server.faces
            .filter(function (el) {
                return el.name !== name;
            });
        console.log(name + ' has been removed');
    });

server.route(require('./openbr/openbr-routes'));

module.exports = server;