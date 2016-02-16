'use strict';

let assert = require('chai').assert;
let request = require('supertest');
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');
let Server = require('../src/server');
let GuitarStore = require('../src/guitarStore');

describe('guitarRouter', () => {

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


    it('should return 404 and empty json if no guitar found', done => {
            request(app)
                .get('/guitar/SERIAL_NUMBER_NO_EXIST')
                .expect(404)
                .expect('Content-type', /json/)
                .expect({}, done);
    });
});
