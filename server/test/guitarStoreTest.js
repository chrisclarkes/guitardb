'use strict';

let GuitarStore = require('../src/guitarStore');
let assert = require('chai').assert;
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');

describe('GuitarStore', function() {

    let guitarStore;

    before(() => {
        mockgoose(mongoose);
    });

    after(done => {
        mongoose.unmock(done);
    });

    beforeEach(done => {
        guitarStore = new GuitarStore();
        mongoose.connect('mongodb://localhost/TestingDB', err => {
            done(err);
        });
    });

    afterEach(done => {
        mongoose.disconnect(err => {
            done(err);
        });
    });

    it('adds a guitar', done => {
        guitarStore.add('MX325235', 'Fender', 'Stratocaster', 2011, 'Mexico').then(() => {
            guitarStore.findBySerialNumber('MX325235').then(guitar => {
                assert.equal(guitar.make, 'Fender');
                assert.equal(guitar.model, 'Stratocaster');
                assert.equal(guitar.year, 2011);
                assert.equal(guitar.factory, 'Mexico');
                done();
            });
        });
    });

    it('findBySerialNumber resolves to null if no guitar found', done => {
        guitarStore.findBySerialNumber('SHOULD_NOT_EXIST').then(guitar => {
            assert.isNull(guitar);
            done();
        });
    });

    it('rejects the add promise if add is called with an already existing guitar', done => {
        guitarStore.add('MX325235', 'Fender', 'Stratocaster', 2011, 'Mexico').then(() => {
            guitarStore.add('MX325235', 'Fender', 'Stratocaster', 2011, 'Mexico').fail(() => done());
        });
    });
});