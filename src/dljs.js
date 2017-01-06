if(!window.dljs) {
    window.dljs = (function (moduleName, module) {
        var modules = {};
        var appdependencies = null;

        var isModuleLoaded = function (moduleName) {
            return (modules[moduleName] && modules[moduleName].isInited);
        };

        var haveAllDependenciesLoaded = function (deps) {
            if (!deps) return true;
            var depsHaveLoaded = true;
            for (var i = 0; i < deps.length; i++) {
                if (!isModuleLoaded(deps[i])) {
                    depsHaveLoaded = false;
                }
            }
            return depsHaveLoaded;
        };

        var initModule = function (moduleName) {
            var module = modules[moduleName];
            module.module = module.classCache();
            module.isInited = true;
        };

        var tryInitModule = function (moduleName) {
            var module = modules[moduleName];
            if (haveAllDependenciesLoaded(module.deps)) {
                initModule(moduleName);
                return true;
            } else {
                return false;
            }
        };

        var load = function (moduleName, module, deps) {
            if(modules[moduleName]){
                if(console && console.log) console.log("Module already loaded: "+moduleName);
                return null;
            }
            modules[moduleName] = {
                classCache: module,
                isInited: false,
                deps: deps
            };

            var successfullyInited = true;
            while(successfullyInited) {
                var successfullyInited = false;
                for (var key in modules) {
                    if (!modules[key].isInited) {
                        var initResult = tryInitModule(key);
                        if(!successfullyInited) {
                            successfullyInited = initResult;
                        }
                    }
                }
            }

            return modules[moduleName];
        };

        var get = function (moduleName) {
            if (typeof modules[moduleName] === 'undefined') {
                throw "Module '" + moduleName + "' is not loaded. Check dependency in the end of your module definition.";
            }
            return modules[moduleName].module;
        };

        var appLoaded = function () {
            for (var key in modules) {
                //console.log("init",key);
                modules[key] = modules[key]();
            }
        };

        return {
            load: load,
            get: get
        };
    })();
}