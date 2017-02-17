# Deploader JS - A lightweight javascript dependency module loader.

For native JS, deploader-js offers a clean and fast method to wrap your code into modules and load them in the right order.

## Installation

bower: `bower install deploader-js`

git: `git clone https://github.com/MikeSpock/dljs`
 
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
    
    dljs.load("myModule",function(){console.log("myModule loaded");},["myOtherModule"]);
    dljs.load("myOtherModule",function(){console.log("myOtherModule loaded");});
    
_since myModule has myOtherModule as a dependency, it's the second to load_
    
### 2. Get modules
    dljs.get(<module-name:string>);

_For example:_ 
   
    dljs.get("myModule");
        
### 3. Get newable modules
    dljs.get(<module-name:string>,true);

_For example:_ 

   var newed = new dljs.get("myModule",true);
    
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
    
## Check out the `example` folder for more details



