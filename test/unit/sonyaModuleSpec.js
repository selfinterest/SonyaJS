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

         expect(module.providers.testValue).to.be.undefined;
        module.value("testValue", "terrence");

        expect(module.providers.testValue).to.not.be.undefined;
        expect(module.providers.testService).to.not.be.undefined;
        expect(module.providers.testFactory).to.not.be.undefined;
        //chaining
        module
            .service("chainedService", function(){
                return {
                    name: "Bob"
                }
            })
            .value("chainedValue", "Bob");

        expect(module.providers.chainedService).to.not.be.undefined;
        expect(module.providers.chainedValue).to.not.be.undefined;
    });

    describe("Module tests with dependencies", function(){
        it("should be able to create a module that has another module as a dependency, specified as a string", function(){
           var module1 = new SonyaModule("module1");
           var module2 = new SonyaModule("module2", ["module1"]);
           expect(module2.dependencies.length).to.equal(1);
           expect(module1.dependencies.length).to.equal(0);         //it has no dependencies declared
           expect(module2.dependencies[0]).to.equal("module1");
           expect(module1.name).to.equal("module1");
           expect(module2.name).to.equal("module2");
        });

        it("should be able to create a module that has another module as a dependency, specified as module object", function(){
            var module1 = new SonyaModule("module1");
            var module2 = new SonyaModule("module2", [module1]);
            expect(module2.dependencies.length).to.equal(1);
            expect(module1.dependencies.length).to.equal(0);
            expect(module2.dependencies[0].name).to.equal("module1");               //we get the name by looking at the name property of the object
        });

        it("should have a way to iterate over its providers", function(){
            var module1 = new SonyaModule("module1");
            var count = 0;
            function iteratorFn(providerName, provider){
                if(count  === 0){
                    expect(providerName).to.equal("test");
                    expect(provider).to.equal("bob");
                } else {
                    expect(providerName).to.equal("test2");
                    expect(provider).to.equal("jones");
                }
                count++;
            }
            var spy = sinon.spy(iteratorFn);
            
            module1.providers = {
                "test": "bob",
                "test2": "jones"
            };


            module1.iterateProviders(spy);

            expect(spy).to.have.been.calledTwice;
        })

        /*it("should be able to create a module that can resolve its own dependencies", function(){
            //We need to use the actual Sonya module for this
            
            Sonya.module("module1");
            Sonya.module("module2", ["module1"]);
            
            //var module1 = new SonyaModule("module1");
            //var module2 = new SonyaModule("module2", ["module1"]);

            module2.getDependencyMap();
        });*/
    });
});