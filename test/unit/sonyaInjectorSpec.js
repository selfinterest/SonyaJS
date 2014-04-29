var chai = require("chai");
var expect = require("chai").expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var SonyaInjector = require("../../lib/sonya-injector");

describe("Sonya injector", function(){
    it("should be instantiable both with and without the new keyword", function(){
        function fn(){

        }
        var sonyaInjector = SonyaInjector(fn);
        expect(sonyaInjector).to.be.instanceof(SonyaInjector);

        sonyaInjector = new SonyaInjector(fn);
        expect(sonyaInjector).to.be.instanceof(SonyaInjector);
    });

    it("should set a prototype method on function for getting arguments", function(){
        function fn(name, field){

        }
        expect(fn.getArguments).to.be.a("function");
        var args = fn.getArguments();
        expect(args).to.be.an("array");
        expect(args[0]).to.equal("name");
        expect(args[1]).to.equal("field");
    });

    it("should be able to resolve module dependencies", function(){

    });
});