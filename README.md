# Deploader JS - A lightweight javascript dependency module loader.

For native JS, deploader-js offers a clean and fast method to wrap your code into modules and load them in the right order.
 
## Prequisites

Load `dljs.min.js` into your project. 

## Usage

### 1. Define modules
    dljs.load(
        <module-name:string>,
        <module-code:function>,
        <module-dependencies:[string]> *optional
    );
    
_For example:_ 
    
    dljs.load(
        "myModule",
        function(){console.log("myModule loaded");},
        ["myOtherModule"]
    );
    
### 2. Get modules
    dljs.get(<module-name:string>);
    
    
## Examples
    
    //main module definition
    dljs.load("myApp.main",  function () {        
        console.log(dljs.get("myApp.utils").foo());
        console.log("Main module loaded"); 
    },["myApp.utils"]); //main has utils as it's dependency
    
    
    //utils module definition
    dljs.load("myApp.utils", function(){    
        var foo = function(){
            return "bar";
        }
        console.log("Utils module loaded");        
        return {
            foo:foo
        }        
    }); //utils has no dependencies

Output will be: 
    
    Utils module loaded
    bar
    Main module loaded
    
## Please see more examples in the `/example` folder




