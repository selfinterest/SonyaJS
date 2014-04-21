var chai = require("chai");
var expect = require("chai").expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var SonyaModule = require("../../lib/sonya-module.js");

describe("sonya module test", function(){
    it("should be able to create a module", function(){
        var module = new SonyaModule();
        expect(module).to.not.be.empty;
    });

    it("should have methods for services, types, values, and factories", function(){
        var module = new SonyaModule();
        expect(module.service).to.be.a("function");
        expect(module.factory).to.be.a("function");
        expect(module.value).to.be.a("function");
        expect(module.type).to.be.a("function");
    });

    it("should be able to create a module and register types, factories, and values", function(){
        var module = new SonyaModule();
        
        function User(name){
            this.name = name;
        };

        module.service("testService", function(){
            return {
                "name": "Terrence"
            };
        });

        module.factory("testFactory", function(){
            return new User("terrence");
        });

        module.type("testType", User);

         expect(module.injectables.testValue).to.be.undefined;
        module.value("testValue", "terrence");
        console.log(module.injectables);

        expect(module.injectables.testValue).to.not.be.undefined;
        expect(module.injectables.testService).to.not.be.undefined;
        expect(module.injectables.testFactory).to.not.be.undefined;
        //module.
    });
});