var _ = require("underscore");
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

function SonyaProvider(functionOrValue){
    //Either a function or a value can be passed to the provider. If a function, we need to parse out the dependencies.
    //Dependencies can be expressed Angular style, i.e. ["dependency1", "dependency2", function(d1, d2).. ],
    //Or without any annotation at all.
    //Can also be provided directly through functionOrValue.$inject (which overrides everything else)
        
    //An array CAN be passed here that shouldn't be parsed, i.e. ["apple", "banana", "pear"]. We can tell the difference by checking the last item.
    if(_.isFunction(functionOrValue)){
        if(functionOrValue.$inject){
            this.dependencies = functionOrValue.$inject;
        } else {
            this.dependencies = functionOrValue.getArguments();    
        }
        this.$fn = functionOrValue;
    } else if(_.isArray(functionOrValue)) {
        if(_.isFunction(functionOrValue[functionOrValue.length - 1])){
            this.dependencies = _.initial(functionOrValue);
            this.$fn = _.last(functionOrValue);
        }
    } else {                //just a value
        this.$fn = functionOrValue;
    }

    this._resolvingDependencies = false;
}

SonyaProvider.prototype.$provide = function(){
    return this.$fn;
};

SonyaProvider.prototype.resolveDependencies = function(module){
    if(!this.dependencies) return;
};
/**
 * Resolves this provider's dependencies
 * @param  {SonyaModule} module The module that owns this provider 
 * @return {[type]}        [description]
 */
/*SonyaProvider.prototype.resolveDependencies = function(module){
    this._resolvingDependencies = true;
    var my = this;
    module.iterateProviders(function(providerName, provider){
        if(provider !== my){            //don't start resolving the same stupid provider
            provider.
        }
    });
};*/

module.exports = SonyaProvider;