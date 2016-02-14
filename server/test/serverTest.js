'use strict';

let assert = require('chai').assert;
let request = require('supertest');
let Server = require('../src/server');

describe('basic express setup', () => {

    let server;
    let app;

    beforeEach(() => {
        server = new Server();
        app = server.start();
    });

    afterEach(() => {
        if (server) {
            server.stop();
        }
    })

    it('should get "yo" response', (done) => {
        request(app)
            .get('/')
            .expect(200, 'yo', done);
    });
});
