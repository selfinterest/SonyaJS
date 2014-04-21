var expect = require("chai").expect;
describe("Sonya -- Module test", function(){
    it("should exist", function(){
        var module = require("../../lib/sonya");
        expect(module).to.not.be.empty;
    });
});
