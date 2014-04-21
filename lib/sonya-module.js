var SonyaService = require("./injectables/sonya-service.js");
var SonyaFactory = require("./injectables/sonya-factory.js");
var SonyaType = require("./injectables/sonya-type.js");
var SonyaValue = require("./injectables/sonya-value.js");

function SonyaModule(dependencies){
    this.dependencies = dependencies;
    this.injectables = {};
}

SonyaModule.prototype.service = function(name, dependencies){
    this.injectables[name] = new SonyaService(dependencies);
    return this;
};

/**
 * Registers a factory function. The injector will invoke the factory function without new and simply pass back the return value of the functin
 * @param  {[type]} name         [description]
 * @param  {[String] || fn} dependencies Can be either a string array (Angular style, with a function on the end) or a straight up function. 
 * @return {[type]}              [description]
 */
SonyaModule.prototype.factory = function(name, dependencies){
    this.injectables[name] = new SonyaFactory(dependencies);
    return this;            //return "this" for chaining.
};

/**
 * Registers a new type. The injector will invoke a type with the new keyword (so the function the injector injects should be a constructor)
 * @param  {[type]} name         [description]
 * @param  {[type]} dependencies [description]
 * @return {[type]}              [description]
 */
SonyaModule.prototype.type = function(name, dependencies){
    this.injectables[name] = new SonyaType(dependencies);
    return this;
};

/**
 * Registers a value. The injector will simply return the value.
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
SonyaModule.prototype.value = function(name, value){
    this.injectables[name] = new SonyaValue(value);
    return this;
};

module.exports = SonyaModule;