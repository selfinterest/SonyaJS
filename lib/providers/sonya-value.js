var SonyaProvider = require("./sonya-provider.js"), util = require("util");

util.inherits(SonyaValue, SonyaProvider);

function SonyaValue(value){
    SonyaProvider.call(this, value);
    this.value = value;

}


/**
 * The function that is invoked during dependency injection to return a value
 * @overrides
 * @return {[type]} [description]
 */
SonyaValue.prototype.$provide = function(){
    
    return this.$fn;
};



module.exports = SonyaValue;