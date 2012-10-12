/**
 * GameArea
 * @param gameareaDiv jQuery object for the gamearea
 */
function GameArea(gameareaDiv) {
	if (gameareaDiv === undefined) {
		throw new Error("GameArea was created without specifying a gameareaDiv.");
	}

	this._start = false;    //The status whether the game has started
	this._loop = undefined;             //loop object used for interrupt
	this._loopRunning = false;
	this._isGameOver = false;

	this.width = 10;         // ten block width
	this.height = 20;
	this._pointSize = 20;      // size of one point in pixels
	
	this.STARTPOSITION = new Point(this.width/2-2,0);
	
	this.baseSpeed = 1000;      // Milliseconds for block to move down one row
	this.speed = 1;             // Divisor by which to divide the baseSpeed
	
	this.mess = new Mess(this.width, this.height, this._pointSize);
	this._tetrisBlock = undefined;
	
	this.canvas = undefined;    // A jQuery object using
	this.clearCanvas(gameareaDiv);
	
	this._blockView = undefined;
	this._messView = undefined;
}

GameArea.prototype.clearCanvas = function(aDiv) {
	if (this.canvas !== undefined) {
		$(this.canvas).remove();
	}
	var pixelWidth = this._pointSize * this.width;
	var pixelHeight = this._pointSize * this.height;
	//this.canvas = $('<div class="gameCanvas"></div>').appendTo(aDiv).width(pixelWidth).height(pixelHeight);
	this.canvas = $('<div class="gameCanvas"></div>').appendTo(aDiv).css({
		position: "relative",
		width: pixelWidth,
		height: pixelHeight,
		margin: '-2px 0 0 0'   //to align bottom
	});
};
/**
 * Determines if the currently moving tetris block has collided.
 * Precondition: there has to be a moving tetris block.
 */
GameArea.prototype.hasCollided = function() {
	var debug = $("#debug p");
	var offsetPoint = this._tetrisBlock.getPosition();

	//var matrix = this._tetrisBlock.matrix;
	var bpoints = this._tetrisBlock.getPoints(offsetPoint);  //The Points of the block

	for (var i = 0; i < bpoints.length; i++){
		//Calculate the absolute position for each point of the block
		var point = bpoints[i];
		debug.text("point x:"+point.x+" point y:"+point.y);
		if (point.y >= this.height){
			return true;
		}
		if (this.mess.hasPoint(point)){
			return true;
		}
		if (point.x < 0 || point.x >= this.width) {
			return true;
		}
	}

	return false;
};
GameArea.prototype.isGameOver = function() {
	return this._isGameOver;
};
GameArea.prototype.loop = function() {
	this._loopRunning = true;
	var loopPeriod = this.baseSpeed/this.speed;
	var that = this;
	var completeRows = [];
	if( this._start === false ){
		this._start = true;
		this._newBlock();
	}

	this._tetrisBlock.moveDown();

	if (this.hasCollided()) {
		this._tetrisBlock.moveUp();
		this.mess.add(this._tetrisBlock);
		this._blockView.remove();
		completeRows = this.mess.getCompleteRows();  //check if there is a row that has completed
		for( var i = 0; i < completeRows.length ; i++ ){
			this.mess.deleteRow(completeRows[i]);
		}
		this._newBlock();
		if (this.hasCollided()) {
			this._isGameOver = true;
		}
	}

	this._blockView.move(loopPeriod);

	
	this._loop = setTimeout(function(){that.loop();}, loopPeriod);

	if (this.isGameOver()) {
		alert("Game Over");
		this.stopLoop();
	}
	this._loopRunning = false;
};
//GameArea.prototype.startLoop = function(){
//	if (!this._loopRunning && this._loop === undefined) {
//		this.loop();
//	}
//};
GameArea.prototype.stopLoop = function(){
	//var self = this;
	//if (!(this._loop === undefined)) {
	//	if (!this._loopRunning) {
	//		clearTimeout(this._loop);
	//		this._loop = undefined;
	//	} else {
	//		setTimeout(function () {self.stopLoop();}, 10);
	//	}
	//}
	clearTimeout(this._loop);
	this._blockView.interrupt();
};
GameArea.prototype.rightKey = function() {
	this._tetrisBlock.moveRight();
	if (this.hasCollided()) {
		this._tetrisBlock.moveLeft();
	} else {
		this._blockView.move(100);
	}
};
GameArea.prototype.leftKey = function() {
	this._tetrisBlock.moveLeft();
	if (this.hasCollided()) {
		this._tetrisBlock.moveRight();
	} else {
		this._blockView.move(100);
	}
};
GameArea.prototype.downKey = function() {
	if( this.speed != 10){
		this.stopLoop();
		this.speed = 10;
		this.loop();
	}
};
GameArea.prototype.downKeyRelease = function(){
	if( this.speed != 1 ){
		this.stopLoop();
		this.speed = 1;
		this.loop();
	}
};
GameArea.prototype.pause = function(){
	clearTimeout(this._loop);
};

GameArea.prototype.rotateLeftKey = function() {
	this._tetrisBlock.rotateLeft();
	if (this.hasCollided()) {
		this._tetrisBlock.rotateRight();
	} else {
		this._blockView.update();
	}
};
GameArea.prototype.rotateRightKey = function() {
	this._tetrisBlock.rotateRight();
	if (this.hasCollided()) {
		this._tetrisBlock.rotateLeft();
	} else {
		this._blockView.update();
	}
};
GameArea.prototype.deleteRow = function() {
	window.alert("Game area delete");
};
GameArea.prototype._newBlock = function() {
	this._tetrisBlock = new TetrisBlock(new Point(this.STARTPOSITION));
	if (this._blockview !== undefined) {
		this._blockview.remove();
	}
	this._blockView = new BlockView(this._tetrisBlock, this._pointSize);
	this._blockView.showOn(this.canvas); // TODO uncool to use private property here.
};
