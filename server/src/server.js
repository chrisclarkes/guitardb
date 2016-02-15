'use strict';

const PORT = 3000;
const MONGO_URL = 'mongodb://localhost/guitardb';

let express = require('express');
let mongoose = require('mongoose');
let GuitarStore = require('./guitarStore');
let app = express();
let Q = require('q');

class Server {
    constructor() {
        this._listeningPromise = Q.defer();
        this._store = new GuitarStore();
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jsx');
        app.engine('jsx', require('express-react-views').createEngine());
        app.get('/', (req, res) => {
            res.send('yo');
        });
        app.get('/index', (req, res) => {
            res.render('index', { 
                message: 'hey',
                title: 'Home'
            });
        });
        app.get('/guitar/:serialNumber', (req, res) => {
            this._store.findBySerialNumber(req.params.serialNumber).then(guitar => {
                res.json({ 
                    serialNumber: guitar.serialNumber,
                    make: guitar.make,
                    model: guitar.model,
                    year: guitar.year,
                    factory: guitar.factory
                });   
            }).fail(err => {
                res.send(err);
            });
        });
    }

    start() {
        mongoose.connect(MONGO_URL, err => {
            this._server = app.listen(PORT, () => {
                console.log(`Server listening on http://localhost:${PORT}/`);
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
};

module.exports = Server;
