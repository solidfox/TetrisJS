/**
 * GameArea 
 * @param gameareaDiv jQuery object for the gamearea
 */
function GameArea(gameareaDiv) {
	if (gameareaDiv === undefined) {
		throw new Error("GameArea was created without specifying a gameareaDiv.");
	}

    this._start = false;    //The status whether the game has started
    this._loop;             //loop object used for interrupt

	this.width = 10;         // ten block width
	this.height = 20;
	
	this.STARTPOSITION = new Point(this.width/2,0+2);
	
    this.pointSize = 20;     	// size of one point in pixels
    
	this.baseSpeed = 1000; 		// Milliseconds for block to move down one row
	this.speed = 1;				// Divisor by which to divide the baseSpeed
	
	this.mess = new Mess(this.width, this.height);
	this.tetrisBlock;
	this.blockPosition;			// A Point object
    
    this.canvas = undefined;    // A jQuery object using 
    this.clearCanvas(gameareaDiv);
    
    this._blockView;
    this._messView;
};

GameArea.prototype.clearCanvas = function(aDiv) {
    if (!(this.canvas === undefined)) {
        $(this.canvas).remove();
    }
    var pixelWidth = this.pointSize * this.width;
    var pixelHeight = this.pointSize * this.height;
    //this.canvas = $('<div class="gameCanvas"></div>').appendTo(aDiv).width(pixelWidth).height(pixelHeight);
    this.canvas = $('<div class="gameCanvas"></div>').appendTo(aDiv).css({
        position: "relative",
        width: pixelWidth,
        height: pixelHeight,
        margin: '-2px 0 0 0',   //to align bottom
    });
}
/**
 * Determines if the currently moving tetris block has collided.
 * Precondition: there has to be a moving tetris block.
 */
GameArea.prototype.hasCollided = function() {
    var debug = $("#debug p");
	var point = new Point(0, 0);
	//var matrix = this.tetrisBlock.matrix;
    var bpoints = this.tetrisBlock.getPoints();  //The Points of the block

    for (var i = 0; i < bpoints.length; i++){
        //Calculate the absolute position for each point of the block
        point.x = bpoints[i].x + this.blockPosition.x;
        point.y = bpoints[i].y + this.blockPosition.y + 1;  //next point
        debug.text("point x:"+point.x+" point y:"+point.y);
        if (this.mess.hasPoint(point)){
            return true;
        }
        if (point.y >= this.height){
            return true;
        }
        if (point.x < 0 || point.x >= this.width) {
	        return true;
        }
    }
	
    //for (var i = 0; i < matrix.length; i++) {
	//    var blockRow = matrix[i];       
	//    point.y = i + this.blockPosition.y;
	//    for (var j = 0; j < blockRow.length; j++) {
	//	    point.x = j + blockPosition.x;
	//	    if (mess.hasPoint(point)) {
	//		    return true;
	//	    }
	//	    if (point.y + this.tetrisBlock.getHeight() >= this.height) {
	//		    return true;
	//	    }
	//    }
    //}
    return false;
}
GameArea.prototype.isGameOver = function() {
	return this.mess.getHeight() >= this.height;
}
GameArea.prototype.loop = function() {
	var loopPeriod = this.baseSpeed/this.speed;
	var that = this;
    if( this._start === false ){
        this._start = true;
        this._newBlock();
    } else if (this.hasCollided()) {
		this.STARTPOSITION = new Point(this.width/2,0+2);
//        this._blockView.stopped(this.blockPosition);
		this.mess.add(this.tetrisBlock, this.blockPosition);
        this.mess.check();  //check if there is a row that has completed
        this._newBlock();
    }else{
        this.blockPosition.y++;
    }
	
	
	this._blockView.move(this.blockPosition, loopPeriod);

	if (this.isGameOver()) {
		alert("Game Over");
	}
	
	this._loop = setTimeout(function(){that.loop()}, loopPeriod);
};
GameArea.prototype.rightKey = function() {
	this.blockPosition.x++;
	if (this.hasCollided()) {
		this.blockPosition.x--;
	} else {
	    this._blockView.move(this.blockPosition,100);		
	}
};
GameArea.prototype.leftKey = function() {
	this.blockPosition.x--;
    if (this.hasCollided()) {
		this.blockPosition.x++;
	} else {
	    this._blockView.move(this.blockPosition,100);		
	}
};
GameArea.prototype.downKey = function() {
    //this.blockPosition.y++;
    //this._blockView.move(this.blockPosition, 100); 
    clearTimeout(this._loop);
    this.speed = 10;
    this.loop();
};
GameArea.prototype.downKeyRelease = function(){
    clearTimeout(this._loop);
    this.speed = 1;
    this.loop();
};
GameArea.prototype.pause = function(){
    clearTimeout(this._loop);
};

GameArea.prototype.rotateKey = function() {
	this.tetrisBlock.rotate();
    this._blockView.rotate(this.tetrisBlock.getPoints());
    //$('.PointView').animate({rotate: '+=90deg'}, 100);
};
GameArea.prototype.deleteRow = function() {
    window.alert("Game area delete");
}
GameArea.prototype._newBlock = function() {
	this.tetrisBlock = new TetrisBlock();
	this.blockPosition = new Point(this.width/2,0);
	if (!(this._blockview === undefined)) {
		this._blockview.remove();
	}
	this._blockView = new PointView(this.pointSize, this.tetrisBlock.getPoints(), this.blockPosition);
	this.canvas.append(this._blockView._enclosure); // TODO uncool to use private property here.
}