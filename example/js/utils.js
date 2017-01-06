dljs.load("exampleApp.utils", function(){
    var logBox;

    var log = function(){
        if(console && console.log){
            console.log.apply( this, arguments );
        }
        var newLogLine = document.createElement("li");
        newLogLine.innerHTML="\n"+Array.prototype.slice.call(arguments).join(', '); //sorry for the oneliner trickery :)
        logBox.appendChild(newLogLine);
    };

    var init = function(){
        logBox = document.createElement("ul");
        document.body.appendChild(logBox);
        log("Utils module inited");
    };

    init();

    return {
        log:log
    }
});