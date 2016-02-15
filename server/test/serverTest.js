'use strict';

let assert = require('chai').assert;
let request = require('supertest');
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');
let Server = require('../src/server');
let GuitarStore = require('../src/guitarStore');

describe('basic express setup', () => {

    let guitarStore;
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
        guitarStore = new GuitarStore();
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

    it('should get guitar by serial number', done => {
        guitarStore.add('MX123', 'Fender', 'Telecaster', 1999, 'Mexico').then(() => {
            request(app)
                .get('/guitar/MX123')
                .expect(200)
                .expect('Content-type', /json/)
                .expect({
                   "factory": "Mexico",
                   "make": "Fender",
                   "model": "Telecaster",
                   "serialNumber": "MX123",
                   "year": 1999
               }, done);
        });
    });
});
