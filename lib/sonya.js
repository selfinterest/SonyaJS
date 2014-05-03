
/**
 * The main Sonya module. Should never be called with the new keyword. Singleton instance is created automatically.
 * @param {Object | Function | [Function]} classMap Allows substitute classes (I may remove this later)
 *  This is a conditional constructor. If invoked outside of an instantiation context, a function or array of functions should be passed. The injector will be invoked with this function.
 *
 * Use like:
 * Sonya(function(car){
 *   //car will be injected into the function
 * }) 
 */
function Sonya(classMap, modules){
  if(this instanceof Sonya){
    this.modules = {};
    this.Module = classMap.moduleClass;
    this.Injector = classMap.injectorClass;
    //Inject Sonya
    //this.Module.assignSonya(Sonya);
    //this.Injector.assignSonya(Sonya);
  } else {
    var mainFunction = classMap;                                //strictly speaking, unnecessary, but I like to rename the parameter                    
    modules = modules || Sonya._instance.modules;   //if no modules specified, use all modules.
    this._injectorInstantiated = true;
    return Sonya._instance.Injector(mainFunction, modules);
  }
}

//Create the singleton instance. _instance can be overridden later for testing or whatever.
Sonya._instance = new Sonya({
    moduleClass: require("./sonya-module.js"),
    injectorClass: require("./sonya-injector.js")
});



Sonya.prototype.registerModule = function(moduleName, dependencies){
    this.modules[moduleName] = new this.Module(moduleName, dependencies);
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

Sonya.configure = function(config){
    Sonya.config = config;
    return Sonya._instance;
};


module.exports = Sonya;