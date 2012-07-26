$(function(){

    var Person = Backbone.Model.extend({
        defaults: {
            Name: null,
            Age: null
        }
    });

    var elliot = new Person({
        Name: "Elliot",
        Age: 10/12
    });
    
    window.slides = {};
    slides.outputBox = null;

    window.print = function(toPrint){
        if(slides.outputBox != null){
            slides.outputBox.append(toPrint + "\n");
        }
    };

    window.printJSON = function(toPrint){
        print(JSON.stringify(toPrint));
    }

    $('.highlight').each(function(){
        var el = $(this);
        el.addClass('clearfix');
        var outputBox = $('<pre class="output-box" />');
        var container = $("<div class='js-runner-div clearfix'></div>");
        var runButton = $("<span class='js-runner-btn'>Run</span>").click(function(){
            slides.outputBox = outputBox;
            outputBox.html('');
            eval("(function(){"+el.find('pre').text()+"})();");
        });
        var editButton = $("<span class='js-runner-btn'>Edit</span>").click(function(){
            var text = el.find('pre').text();
        });
        container.append(runButton);

        el.prepend(container);
        el.append(outputBox);
    });
});
