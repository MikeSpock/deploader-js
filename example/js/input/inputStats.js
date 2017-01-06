dljs.load("exampleApp.input.stats", function(){
    var inputs = [];

    var setInput = function(input){
        input.addEventListener('keyup', function(){
            dljs.get("exampleApp.utils").log("character count",this.value.length);
        }, false);
    };

    dljs.get("exampleApp.utils").log("Input.stats module inited");

    return {
        setInput:setInput
    }
},["exampleApp.utils"]);
