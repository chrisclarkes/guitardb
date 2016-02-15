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

    it('should get "yo" response', done => {
        request(app)
            .get('/')
            .expect(200, 'yo', done);
    });
});
