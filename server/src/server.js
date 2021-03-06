'use strict';

const PORT = 3000;
const MONGO_URL = 'mongodb://localhost/guitardb';

let express = require('express');
let mongoose = require('mongoose');
let guitarRouter = require('./guitarRouter');
let lessMiddleware = require('less-middleware');
let expressConfig = require('./expressConfig');
let Q = require('q');
let app = express();

class Server {
    constructor() {
        this._listeningPromise = Q.defer();
        expressConfig(app);
        this._addRoutes();
    }

    _addRoutes() {
        app.get('/', (req, res) => {
            res.render('index', {
                message: 'Guitar DB',
                title: 'Home'
            });
        });
        app.get('/yo', (req, res) => res.send('yo'));
        app.use('/guitar', guitarRouter);
    }

    start() {
        mongoose.connect(MONGO_URL, err => {
            this._server = app.listen(PORT, () => {
                this._listeningPromise.resolve(app);
            });
        });

        return this._listeningPromise.promise;
    }

    stop() {
        if (this._server) {
            mongoose.disconnect(err => {
                this._server.close();
            });
        }
    }

    get port() {
        return PORT;
    }
};

module.exports = Server;
