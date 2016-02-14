'use strict';

let express = require('express');
let app = express();

class Server {
    constructor() {
        app.get('/', (req, res) => {
            res.send('yo');
        });
    }

    start() {
        this._server = app.listen(3000, () => {
            console.log('listening...');
        });
        return app;
    }

    stop() {
        if (this._server) {
            this._server.close();
        }
    }
};

module.exports = Server;
