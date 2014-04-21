var SonyaModule = require("./sonya-module.js");

function Sonya(classMap){
  this.modules = {};
  this.Module = classMap.moduleClass;
}

//Create the singleton instance
Sonya._instance = new Sonya({
    moduleClass: SonyaModule
});

Sonya.prototype.registerModule = function(moduleName, dependencies){
    this.modules[moduleName] = new this.Module(dependencies);
    return this.modules[moduleName];
};

Sonya.prototype.retrieveModule = function(moduleName){
    if(this.modules[moduleName]) return this.modules[moduleName];
    throw new Error("Module "+moduleName+ " not found.");
};

/**
 * Creates or returns a module
 * @param  {string} moduleName  The name of the module to create or retrieve
 * @param  {[string]} dependencies Array of dependencies.
 * @return {Module}             The created or retrieved module
 */
Sonya.module = function(moduleName, dependencies){
    
    if(dependencies){
        return Sonya._instance.registerModule(moduleName, dependencies);
    } else {
        return Sonya._instance.retrieveModule(moduleName);
    }
};


module.exports = Sonya;