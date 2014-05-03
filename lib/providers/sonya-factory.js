var SonyaProvider = require("./sonya-provider.js"), util = require("util");

function SonyaFactory(){

}

util.inherits(SonyaFactory, SonyaProvider);


 module.exports = SonyaFactory;