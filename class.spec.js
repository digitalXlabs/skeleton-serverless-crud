'use strict'
const fs = require('fs');

let Obj = require('./class');

let event = {
    "body": {
        "name": "slim shady",
        "terms": true,
        "created": "19-12-19"
    },
    "key1": "value1",
    "key3": "value3"
};
//
let context = {
    fail: function(msg) {
        expect(msg).toBeDefined();
        expect(data.statusCode).toBeDefined();
        expect(data.statusCode).toMatch(400);
    },
    succeed: function(data) {
        expect(data).toBeDefined();
        expect(data.statusCode).toBeDefined();
        expect(data.statusCode).toMatch(200);
        expect(data.body).toBeDefined()
    }
}

let callback = {
    anyting: function(err, res) {}
}



describe("Class", function() {

    describe("basics", function() {

        let o;
        beforeEach(function() {
            o = new Obj(event, context, callback);
        })

        it('has base CRUD methods', function() {
            expect(o).toBeDefined();
            expect(o.create).toBeDefined();
            expect(o.delete).toBeDefined();
            expect(o.readOne).toBeDefined();
            expect(o.readAll).toBeDefined();
            expect(o.update).toBeDefined();
            expect(o.validate).toBeDefined();
            expect(o.getClient).toBeDefined();

        })

        it('can instantiate class with params', function() {
            expect(o).toBeDefined();
            expect(o.context).toBeDefined();
            expect(o.event).toBeDefined();
            expect(o.callback).toBeDefined();

            expect(o.event).toMatch(event);
            expect(o.context).toMatch(context);
            expect(o.callback).toMatch(callback);

            expect(o.event.key1).toMatch('value1');
            // expect(o.responseSuccess).toMatch(null);
            // expect(o.responseError).toMatch(null);
        })
    })

    describe("validation", function() {

        let o, data, schema, file;
        beforeEach(function() {
            o = new Obj(event, context);
            file = fs.readFileSync(process.cwd() + "/schema.json");
            schema = JSON.parse(file);
        })

        it('validation throws an error', function() {
            o.validate(event.body, schema)
                .catch(function(err) {
                    expect(err).toBeDefined();
                    done();
                })

        })

        it('validation passes', function(done) {
            event.body = {
                    "uuid": "4EC4A9B4-E9AA-4741-A07B-D5035BFB7F30",
                    "name": "slim shady",
                    "updated": "1999-01-01T12:00:00Z",
                    "description": "this is my description",
                    "url": "http://thisisaurl.com"
                }
                // event.body.address = {};
            let o = new Obj(event, context, callback);
            o.validate(event.body, schema)
                .then(function(data) {
                    expect(data).toBeDefined();
                    expect(data).toBeTruthy();
                    done();
                })
        })
    })

    describe('write data', function() {
        let o, data, d, n;
        let schema, file;

        beforeEach(function() {
            event.body = JSON.stringify({
                "name": "slim shady",
                "updated": "1999-01-01T12:00:00Z",
                "description": "this is my description",
                "url": "http://thisisaurl.com"
            })

            o = new Obj(event, context, callback);

            spyOn(o, 'getClient').andCallThrough();
            spyOn(o, 'successCallback').andCallThrough();
            spyOn(o, 'validate').andCallFake(function() {
                return new Promise(function(resolve, reject) {
                    resolve(true);
                })
            });
        })

        it('can create', function(done) {
            o.create();
            done();
        })
    })

})
