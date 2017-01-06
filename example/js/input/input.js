dljs.load("exampleApp.input", function(){
    var inputs = [];

    var addInput = function(input){
        var stats = new dljs.get("exampleApp.input.stats");
        stats.setInput(input);
        inputs.push(input);
    };

    dljs.get("exampleApp.utils").log("Input module inited");

    return {
        addInput:addInput
    }
},["exampleApp.input.stats","exampleApp.utils"]);