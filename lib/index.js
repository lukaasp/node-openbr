'use strict';

/**
* Main script initialize database, starts server and emits logged_in event.
* @class main
*/

var server = require('./server');

// used for files serving
server.register(require('inert'));

server.start(function () {
    console.log('Server started', server.info.uri);
});