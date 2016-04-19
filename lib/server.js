'use strict';

/**
 * @class server
 * @description Routes for all handlers.
 */

var Hapi = require('hapi');
var config = require('./plugins/options');
var chokidar = require('chokidar');
var handler = require('./openbr/openbr-handler');
var fs = require('fs');

var options = {
    port: config.port
};

var server = new Hapi.Server();
server.connection(options);
server.faces = [];

handler.enrollToGallery();

var itemsNo = 0;

fs.readdir('./lib/openbr/enrollData/', function(err,files){
    chokidar.watch('./lib/openbr/enrollData/', {ignored: /[\/\\]\./})
        .on('add', function (path) {
            var file = path.split('/').pop();
            server.faces.push({name: file.slice(0, -4), fileName: file});
            console.log(++itemsNo + ' ' + file + ' has been added');

            if(server.faces.length > files.length){
                handler.enrollToGallery();
            }
        })
        .on('unlink', function (path) {
            handler.enrollToGallery();
            var name = path.split('/').pop().slice(0, -4);

            server.faces = server.faces
                .filter(function (el) {
                    return el.name !== name;
                });
            console.log(name + ' has been removed');
        });
});

server.route(require('./openbr/openbr-routes'));

module.exports = server;