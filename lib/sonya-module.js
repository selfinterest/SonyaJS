var SonyaService = require("./providers/sonya-service.js");
var SonyaFactory = require("./providers/sonya-factory.js");
var SonyaType = require("./providers/sonya-type.js");
var SonyaValue = require("./providers/sonya-value.js");
var _ = require("underscore");
var sonya;
/**
 * Constructs a module
 * @param {String} The name the module is registered under
 * @param {[String|SonyaModule]} dependencies. Can be an array of strings or an array of SonyaModules. If strings, assumed to be names of module
 */
function SonyaModule(name, dependencies){
    if(!dependencies) dependencies = [];                                                    //if not specified, empty array = no dependencies
    if(!_.isArray(dependencies)) dependencies = [dependencies];             //if not array, turn into array
    this.dependencies = dependencies;
    this.providers = {};
    this.name = name;
    this._resolvingModuleDependencies = false;                                         //set to true when we're resolving module dependencies

    //inject sonya (the class, not the instance)
    if(!SonyaModule.sonya) SonyaModule.sonya = require("./sonya.js");
}

SonyaModule.assignSonya = function(sonyaInstance){
    SonyaModule.sonya = sonyaInstance;
};

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

SonyaModule.prototype.resolveDependencies = function(){
    var my = this, module;
    //var Sonya = require("./sonya.js");
    if(this._resolvingModuleDependencies) throw new Error("Circular dependency error");
    
    this._resolvingModuleDependencies = true;
    
    this.dependencies.forEach(function(moduleOrModuleName){
        if(_.isString(moduleOrModuleName)){
            module = SonyaModule.sonya.module(moduleOrModuleName);
        } else {
            module = moduleOrModuleName;
        }
        module.resolveDependencies();
        my.providers = _.extend(my.providers, module.providers);
    });
    this._resolvingModuleDependencies = false;
};

SonyaModule.prototype.resolveProviderDependencies = function(){
    var my = this;
    this.providers.forEach(function(provider){

    });
}

/**
 * Iterates over this module's providers as key-value pairs.
 * @param  {Function} fn Execute this function for each key-value pair, passing the pair
 * @return {[type]}      [description]
 */
SonyaModule.prototype.iterateProviders = function(fn){
    var keys = _.keys(this.providers);
    var my = this;
    for(var i=0, len = keys.length; i < len; i++){
        fn(keys[i], my.providers[keys[i]]);
    }
}



module.exports = SonyaModule;