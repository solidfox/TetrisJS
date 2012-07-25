/**
 * Controller
 *
 * The class that manages the gama start/pause
 */
var Controller = function() {
    this._gameArea;
};

//Methods
Controller.prototype.startstop = function() {
    if( $('#startstop').attr('value') == 'start' ){         //start game
        this._getGameArea(); // asserts that _gameArea is initiated.
        this.bindKeys();
        this._gameArea.loop();
        $('#startstop').attr('value','pause');
    }else if( $('#startstop').attr('value') == 'pause' ){   //pause game
        this._gameArea.pause();
        $('#startstop').attr('value', 'restart');
    }else if( $('#startstop').attr('value') == 'restart' ){
        this._gameArea.loop();
    }
};
Controller.prototype.gameOver = function() {
		window.alert("gameOver");
};
Controller.prototype._getGameArea = function(){
    if( this._gameArea == null ){
        this._gameArea = new GameArea($('#gamearea'));
    }
    return this._gameArea;
}
Controller.prototype.bindKeys = function () {
    var self = this;
    $('html').keydown(function(e){
            switch(e.which){
				case 37: //when right arrow key is pushed
						//this.moveLeft();
						self._gameArea.leftKey();
						break;
				case 39: //when left arrow key is pushed
						self._gameArea.rightKey();
						break;
				case 40: //when down arrow key is pushed
						self._gameArea.downKey();
						break;
				case 38: //when up arrow key is pushed
						self._gameArea.rotateKey();
						break;
			}
	});    
    $('html').keyup(function(e){
        switch(e.which){
            case 40: //when down arror key is released
                self._gameArea.downKeyRelease();
                break;
        }       
    });
}
