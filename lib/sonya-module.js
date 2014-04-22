var SonyaService = require("./providers/sonya-service.js");
var SonyaFactory = require("./providers/sonya-factory.js");
var SonyaType = require("./providers/sonya-type.js");
var SonyaValue = require("./providers/sonya-value.js");

function SonyaModule(dependencies){
    this.dependencies = dependencies;
    this.providers = {};
}

SonyaModule.prototype.service = function(name, service){
    this.providers[name] = new SonyaService(service);
    return this;
};

/**
 * Registers a factory function. The injector will invoke the factory function without new and simply pass back the return value of the functin
 * @param  {[type]} name         [description]
 * @param  {[String] || fn} factory Can be either a string array (Angular style, with a function on the end) or a straight up function. 
 * @return {[type]}              [description]
 */
SonyaModule.prototype.factory = function(name, factory){
    this.providers[name] = new SonyaFactory(factory);
    return this;            //return "this" for chaining.
};

/**
 * Registers a new type. The injector will invoke a type with the new keyword (so the function the injector injects should be a constructor)
 * @param  {[type]} name         [description]
 * @param  {[type]} dependencies [description]
 * @return {[type]}              [description]
 */
SonyaModule.prototype.type = function(name, type){
    this.providers[name] = new SonyaType(type);
    return this;
};

/**
 * Registers a value. The injector will simply return the value.
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
SonyaModule.prototype.value = function(name, value){
    this.providers[name] = new SonyaValue(value);
    return this;
};

SonyaModule.prototype.checkDependenciesExist = function(){

};

module.exports = SonyaModule;