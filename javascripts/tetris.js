/**
 * TetrisJS
 *
 * A tetris game
 */

$(document).ready(function(){
    controller = new Controller();
    $("#startstop").bind('click', function(){
        controller.startstop()
    });
});

