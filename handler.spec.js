'use strict'

let handler = require('./handler');

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
        },
        succeed: function(data) {
            expect(data).toBeDefined();
            expect(data.result).toBeDefined();
            expect(data.result.length).toEqual(3);
            expect(data.result[0]).toEqual('Saab');
        }
    }
    //ˇ
let callback = {
    anyting: function(err, res) {}
}



describe("Handler", function() {

  it('has base exporters', function() {
      expect(handler.create).toBeDefined();
      expect(handler.delete).toBeDefined();
      expect(handler.readOne).toBeDefined();
      expect(handler.readAll).toBeDefined();
      expect(handler.update).toBeDefined();

  })
})
