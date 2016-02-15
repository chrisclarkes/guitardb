'use strict';

let assert = require('chai').assert;
let request = require('supertest');
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');
let Server = require('../src/server');

describe('server', () => {

    let server;
    let app;

    before(() => {
        mockgoose(mongoose);
    });

    after(done => {
        mongoose.unmock(done);
    });

    beforeEach(done => {
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

    it('should get "yo" response on /yo', done => {
        request(app)
            .get('/yo')
            .expect(200, 'yo', done);
    });

    it('should get homepage on /', function(done) {
        this.timeout(10000); // server-side React is slow on first hit - maybe replace

        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Home/, done);
    });
});
