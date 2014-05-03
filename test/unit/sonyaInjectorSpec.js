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
        var Sonya = require("../../lib/sonya.js"); 
        Sonya.module("module1", []);
        Sonya.module("module2", []);
        function fn(){

        }
        SonyaInjector(fn, ["module1", "module2"]);
    });

    it("should be able to inject dependencies", function(){
        var Sonya = require("../../lib/sonya.js");
        var sonyaInjector = new SonyaInjector(function(n, p){
            expect(n).to.equal("name");
            expect(p).to.equal("position");
        }, Sonya.module("test", []).value("n", "name").value("p", "position"));
    });

    it("should be able to inject dependencies with multiple (independent) modules", function(){
        var Sonya = require("../../lib/sonya.js");
        Sonya.module("module1", []).value("n", "name");
        Sonya.module("module2", []).value("p", "position");

        var sonyaInjector = new SonyaInjector(function(n, p){
            expect(n).to.equal("name");
            expect(p).to.equal("position");
        }, ["module1", "module2"]);

    });

    it("should be able to inject dependencies with multiple dependent modules", function(){
        var Sonya = require("../../lib/sonya.js");
        Sonya.module("module1", []).value("n", "name");
        Sonya.module("module2", ["module1"]).value("p", "position");


        var sonyaInjector = new SonyaInjector(function(n, p){
            expect(n).to.equal("name");
            expect(p).to.equal("position");
        }, ["module2"]);            //we call in module2, it calls in module1...
    });

    it("should be able to inject dependencies using $inject", function(){
        var Sonya = require("../../lib/sonya.js");
        Sonya.module("module1", []).value("n", "name");
        Sonya.module("module2", ["module1"]).value("p", "position");
        var fn = function(n, p){
            expect(n).to.equal("position");         //because we used $inject, n now equals position
            expect(p).to.equal("name");             //mutatis mutandis for p and name
        };
        fn.$inject = ["p", "n"];        //notice we've swapped the order of the dependencies. It now differs from the order of the arguments of function fn

        var sonyaInjector = new SonyaInjector(fn, ["module2"]);
    });

    it("should be able to inject different kinds of dependencies", function(){
        var Sonya = require("../../lib/sonya.js");
        function Car(){
            expect(this).to.be.instanceof(Car);
        }

        function fn(car, color){
            car.color = color;
            expect(car).to.be.instanceof(Car);
            expect(color).to.equal("blue");
        }

        Sonya.module("module1", []).type("car", Car).value("color", "blue");
        var sonyaInjector = new SonyaInjector(fn, ["module1"]);
    });



});