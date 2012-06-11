
var Controller = function() {
	var GameArea = new GameArea();
};

Controller.prototype.start = function() {
		$(function(){
				$('input').click(function(){
						$('#startstop').attr('value','pause');
				})				
		})
};
Controller.prototype.gameOver = function() {
		window.alert("gameOver");
};


var GameArea = function() {
	var width = 10;
	var height = 20;
	
	var baseSpeed = 1000; 	// Milliseconds for block to move down one row
	var speed = 1;			// Divisor by which to divide the baseSpeed
	
	var mess = new Mess();
	var tetrisBlock = null;
	var blockPosition = null;
};

GameArea.prototype.isGameOver = function() {
		return mess.getHeight() >= this.height;
};
GameArea.prototype.loop = function() {

	if (this.isGameOver()) {
		return this;
	}
	setTimeout(loop(), this.baseSpeed/speed);
};
GameArea.prototype.moveRight = function() {
	blockPosition.moveRight();
};
GameArea.prototype.moveLeft = function() {
};
GameArea.prototype.moveDown = function() {
};
GameArea.prototype.rotate = function() {
};
GameArea.prototype.deleteRow = function() {
		window.alert("Game area delete");
};


var Mess = function() {};
Mess.prototype = new GameArea();

Mess.prototype.hasCompleteRow = function() {
};
Mess.prototype.deleteRow = function() {
		window.alert("Mess delete");
};
Mess.prototype.getPoints = function() {
};


var TetrisBlock = function() {};
TetrisBlock.prototype = new GameArea();

TetrisBlock.prototype.rotate =function() {
};
TetrisBlock.prototype.getPoints = function() {
};
TetrisBlock.prototype.LBlock = [
		[1,1,1],
		[1,0,0]
		]
;2
TetrisBlock.prototype.IBlock = [
		[1,1,1,1]
		]
;
TetrisBlock.prototype.SBlock = [
		[0,1,1],
		[1,1,0]
		]
;
TetrisBlock.prototype.SquareBlock = [
		[1,1],
		[1,1]
		]
;
TetrisBlock.prototype.MirrorLBlock = [
		[1,1,1],
		[0,0,1]
		]
;
TetrisBlock.prototype.MirrorSBlock = [
		[1,1,0],
		[0,1,1]
		]
;
TetrisBlock.prototype.SpecialBlock = [
		[1,1],
		[0,1],
		[1,1],
		[1,0],
		[1,1]
		]
;

hiroshi = new TetrisBlock();
hiroshi.deleteRow();                                                         
hiroshi.start(); 
