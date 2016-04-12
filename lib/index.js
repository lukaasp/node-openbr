'use strict';

/**
* Main script initialize database, starts server and emits logged_in event.
* @class main
*/

var server = require('./server');
const Inert = require('inert');
server.register(Inert);

server.start(function () {
    console.log('Server started', server.info.uri);
});
