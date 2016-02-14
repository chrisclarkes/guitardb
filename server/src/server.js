'use strict';

let express = require('express');
let app = express();
let Q = require('q');

class Server {
    constructor() {
        this._listeningPromise = Q.defer();
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
    }

    start() {
        this._server = app.listen(3000, () => {
            console.log('listening...');
            this._listeningPromise.resolve(app);
        });
        return this._listeningPromise.promise;
    }

    stop() {
        if (this._server) {
            this._server.close();
        }
    }
};

module.exports = Server;
