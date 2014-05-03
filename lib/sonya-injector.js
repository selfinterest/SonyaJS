var _ = require("underscore");
var sonya = require("./sonya.js");

//Add some reflection to JavaScript
(function (extern) {

    var Reflection = this.Reflection = (function () { return Reflection; });

    Reflection.prototype = Reflection;

    Reflection.constructor = Reflection;

    Reflection.getArguments = function (func) {
        var symbols = func.toString(),
            start, end, register;
        start = symbols.indexOf('function');
        if (start !== 0 && start !== 1) return undefined;
        start = symbols.indexOf('(', start);
        end = symbols.indexOf(')', start);
        var args = [];
        symbols.substr(start + 1, end - start - 1).split(',').forEach(function (argument) {
            args.push(argument.trim());
        });
        return args;
    };

    extern.Reflection = extern.reflection = Reflection;

    Function.prototype.getArguments = function () { return Reflection.getArguments(this); };

    Function.prototype.getExpectedReturnType = function () { /*ToDo*/ };

}) (this);



/**
 * Instantiates the injector
 * @param {Function} mainFunction The function to run the injector against (i.e. where our dependencies are defined.)
 * @param {[SonyaModules]} modules Array of modules to associate with the injector. Can be a literal array of modules, or array of strings, or mix
 */
function SonyaInjector(mainFunction, modules){
    if(this instanceof SonyaInjector){
        var my = this;
        if(!modules) modules = [];
        if(!_.isArray(modules)) modules = [modules];            //if not array, turn into array
        this.modules = modules;
        this.providerMap = {};
        
        if(!SonyaInjector.sonya) SonyaInjector.sonya = require("./sonya.js");    
        
        this.resolveModuleDependencies();

        if(_.isFunction(mainFunction)){
            var args, argProviders = [];
            if(!mainFunction.$inject){
                args = mainFunction.getArguments();    
            } else {
                args = mainFunction.$inject;
            }
                      
            args.forEach(function(a){
                if(my.providerMap[a]){
                    argProviders.push(my.providerMap[a].$provide());
                }
            });
            mainFunction.apply(my, argProviders);
        }
    } else {
        return new SonyaInjector(mainFunction, modules);
    }
    

}


SonyaInjector.prototype.resolveModuleDependencies = function(parent){
    var my = this;
    this.modules.forEach(function(module){
        if(_.isString(module)) module = SonyaInjector.sonya.module(module);
        module.resolveDependencies();
        my.providerMap = _.extend(my.providerMap, module.providers);        //the injector should get access to all the providers at once
        my.resolveProviderDependencies(module);
    });
};

SonyaInjector.prototype.resolveProviderDependencies = function(module){
    var providerName, provider;
    module.iterateProviders(function(providerName, provider){

        provider.resolveDependencies(module);
        //Each dependency of the provider should already be in its module at this point
        //if()
    });          //ensure that this function is called with "this" being the injector

};

module.exports = SonyaInjector;