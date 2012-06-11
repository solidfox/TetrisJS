var Controller = function() {};

Controller.prototype.start = function() {
		$(function(){
				$('input').click(function(){
						$('#start').attr('value','pause');
						$('#stop').attr('disabled', false);
				})				
		})
};
Controller.prototype.gameOver = function() {
		window.alert("gameOver");
};


var GameArea = function() {};
GameArea.prototype = new Controller();

this.width = 14;
this.height = 20;
this.is_gameover = 0;
GameArea.prototype.isGameOver = function() {
		if(is_gameover == 1){
				//gameOver()
		}
};
GameArea.prototype.loop = function() {
};
GameArea.prototype.moveRight = function() {
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
;
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
