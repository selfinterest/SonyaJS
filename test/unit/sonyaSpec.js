var chai = require("chai");
var expect = require("chai").expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var SonyaModule = require("../../lib/sonya-module.js");

describe("Sonya -- main module test", function(){
    it("should exist", function(){
        var module = require("../../lib/sonya");
        expect(module).to.not.be.empty;
    });

    it("should have a way to register and retrieve modules modules", function(){
        var sonya = require("../../lib/sonya");
        expect(sonya.module).to.be.a("function");
    });

    it("should be able to register modules", function(){
        var sonya = require("../../lib/sonya");
        var spy = sinon.spy(sonya._instance, "registerModule");
        var module = sonya.module("test", []);
        expect(module).to.be.an("object");
        expect(module).to.be.instanceof(SonyaModule);
        expect(spy).to.have.been.calledWith("test", []);
    });

    it("should be able to retrieve a module", function(){
        var sonya = require("../../lib/sonya");
        //Register it
        var module = sonya.module("test", ["bob"]);
        var spy = sinon.spy(sonya._instance, "retrieveModule");
        var retrievedModule = sonya.module("test");
        expect(spy).to.have.been.calledWith("test");
        expect(retrievedModule).to.be.instanceof(SonyaModule);
        expect(module).to.equal(retrievedModule);
    });
});
