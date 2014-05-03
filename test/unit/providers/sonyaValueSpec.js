var chai = require("chai");
var expect = require("chai").expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var SonyaValue = require("../../../lib/providers/sonya-value.js");

describe("Sonya value test", function(){
    it("should be able to create a value", function(){
        var sonyaValue = new SonyaValue("cat");
        expect(sonyaValue.$provide).to.be.a("function");
        expect(sonyaValue.$fn).to.equal("cat");
        //Invoke the provide function. It just spits back the value.
        var cat = sonyaValue.$provide();
        expect(cat).to.equal("cat");
    });
    
});