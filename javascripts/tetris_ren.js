function GameArea(){
    this.width = 200;
    this.height = 200;
};

function Controller(){
    this.start = function(){
        return new GameArea();
    };

};

$(document).ready(function(){
    controller = new Controller();
    $("#start").bind('click', function(){
        controller.start()
    });
});
