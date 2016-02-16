'use strict';

const PORT = 3000;
const MONGO_URL = 'mongodb://localhost/guitardb';

let express = require('express');
let mongoose = require('mongoose');
let guitarRouter = require('./guitarRouter');
let lessMiddleware = require('less-middleware');
let Q = require('q');
let app = express();

class Server {
    constructor() {
        this._listeningPromise = Q.defer();
        app.use(lessMiddleware(__dirname, {
            force: true
        }));
        app.use('/styles', express.static(__dirname + '/styles'));
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jsx');
        app.engine('jsx', require('express-react-views').createEngine());

        app.get('/yo', (req, res) => {
            res.send('yo');
        });
        app.get('/', (req, res) => {
            res.render('index', { 
                message: 'Guitar DB',
                title: 'Home'
            });
        });
        app.use('/guitar', guitarRouter);
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
