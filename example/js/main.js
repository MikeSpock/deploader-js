dljs.load("exampleApp.main", function(){
    var init = function(){
        dljs.get("exampleApp.utils").log("Main module inited");
        dljs.get("exampleApp.input").addInput(document.getElementsByTagName("textarea")[0]);
    };
    init();
},["exampleApp.input","exampleApp.utils"]);