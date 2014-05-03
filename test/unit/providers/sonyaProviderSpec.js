var chai = require("chai");
var expect = require("chai").expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var SonyaProvider = require("../../../lib/providers/sonya-provider.js");

describe("Sonya provider tests", function(){
    it("should be able to extract dependencies from arguments", function(){
        var provider = new SonyaProvider(function(name, position){

        });
        expect(provider.dependencies).to.not.be.undefined;
        expect(provider.dependencies).to.include.members(["name", "position"]);
        expect(provider.$fn).to.be.a("function");
    });

    it("should be able to extract dependencies from an Angular-style array", function(){
        var provider = new SonyaProvider(["name", "position", function(name, position){

        }]);

        expect(provider.dependencies).to.not.be.undefined;
        expect(provider.dependencies).to.include.members(["name", "position"]);
        expect(provider.$fn).to.be.a("function");
    });

    it("should be able exact dependencies from the $inject property", function(){
        var fn = function(n, p){

        };

        fn.$inject = ["name", "position"];
        var provider = new SonyaProvider(fn);

        expect(provider.dependencies).to.not.be.undefined;
        expect(provider.dependencies).to.include.members(["name", "position"]);
        expect(provider.$fn).to.be.a("function");
    });


    xit("should be able to resolve dependencies", function(){
        var fn = function(n, p){

        }
        //Mock out sonya method
        //SonyaProvider.sonya.module 
        fn.$inject = ["name", "position"];
        var provider = new SonyaProvider(fn);
        provider.resolveDependencies();

    });
});