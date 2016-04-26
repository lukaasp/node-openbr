'use strict';

/**
* Entry point & info
* @class index
*/

var server = require('./server');

// used for files serving
server.register(require('inert'));

server.start(function () {
    console.log('Server started', server.info.uri);
});
