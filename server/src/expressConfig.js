'use strict';

let express = require('express');
let lessMiddleware = require('less-middleware');

module.exports = function(app) {
    app.use(lessMiddleware(__dirname, {
        force: true
    }));
    app.use('/styles', express.static(__dirname + '/styles'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());
};
