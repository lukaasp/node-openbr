
'use strict';
var openbrHandler = require('./openbr-ctrl');
module.exports = (function () {
    return [
        {
            path: '/openbr/faces',
            method: 'GET',
            config: openbrHandler.list
        },
        {
            path: '/openbr/faces/{id}',
            method: 'GET',
            config: openbrHandler.read
        },
        {
            path: '/openbr/faces',
            method: 'POST',
            config: openbrHandler.create
        },
        {
            path: '/openbr/faces/{id}',
            method: 'DELETE',
            config: openbrHandler.remove
        },
        {
            path: '/openbr/identify',
            method: 'POST',
            config: openbrHandler.identify
        },
        {
            path: '/openbr/compare',
            method: 'POST',
            config: openbrHandler.compare
        },
        {
            path: '/openbr/docs/{id}',
            method: 'GET',
            config: openbrHandler.docs
        }
    ];
}());
