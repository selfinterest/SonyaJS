var SonyaProvider = require("./sonya-provider.js"), util = require("util");

util.inherits(SonyaType, SonyaProvider);

function SonyaType(typeConstructor, dependencies){
    SonyaProvider.call(this, typeConstructor);
}

SonyaType.prototype.$provide = function(){
    return new this.$fn();
}



module.exports = SonyaType;