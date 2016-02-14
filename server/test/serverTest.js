'use strict';

let assert = require('chai').assert;
let request = require('supertest');
let Server = require('../src/server');

describe('basic express setup', () => {

    let server;
    let app;

    beforeEach((done) => {
        server = new Server();
        server.start().then(listeningApp => {
            app = listeningApp;
            done();
        });
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
