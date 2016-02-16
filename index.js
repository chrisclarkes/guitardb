'use strict';

let Server = require('./server/src/server');
let GuitarStore = require('./server/src/guitarStore');
let Q = require('q');

let server = new Server();

server.start().then(() => {
    let store = new GuitarStore();

    Q.allSettled([
        store.add('MX12151713', 'Fender', 'Cabronita Telecaster', 2012, 'Mexico'),
        store.add('MX11106442', 'Fender', 'Classic Player 60s Stratocaster', 2011, 'Mexico'),
        store.add('140015617', 'Gibson', 'Les Paul Traditional', 2014, 'Kalamazoo, US')
    ]).done(() => {
        console.log(`Server listening on http://localhost:${server.port}/`);
    });
});