/**
 * TetrisJS
 *
 * A tetris game
 */

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
						self._gameArea.moveLeft();
						break;
				case 39: //when left arrow key is pushed
						self._gameArea.moveRight();
						break;
				case 40: //when down arrow key is pushed
						self._gameArea.moveDown();
						break;
				case 38: //when up arrow key is pushed
						self._gameArea.rotate();
						break;
			}
	});    
    $('html').keyup(function(e){
        switch(e.which){
            case 40: //when down arror key is released
                self._gameArea.stopmoveDown();
                break;
        }       
    });
}


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
    var bpoints = this.tetrisBlock.matrix.getPoints();  //The Points of the block

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
        //this.loop();
    }else if (this.hasCollided()) {
		this.STARTPOSITION = new Point(this.width/2,0+2);
        this._blockView.stopped(this.blockPosition);
		this.mess.add(this.tetrisBlock, this.blockPosition);
        this.mess.check();  //check if there is a row that has completed
		this._newBlock();
	}
    this.blockPosition.y++;
	
	
	this._blockView.move(this.blockPosition, loopPeriod);

	if (this.isGameOver()) {
		return this;
	}
	
	this._loop = setTimeout(function(){that.loop()}, loopPeriod);
};
GameArea.prototype.moveRight = function() {
	this.blockPosition.x++;
    this._blockView.move(this.blockPosition,100);
};
GameArea.prototype.moveLeft = function() {
	this.blockPosition.x--;
    this._blockView.move(this.blockPosition,100);
};
GameArea.prototype.moveDown = function() {
    //this.blockPosition.y++;
    //this._blockView.move(this.blockPosition, 100); 
    clearTimeout(this._loop);
    this.speed = 10;
    this.loop();
};
GameArea.prototype.stopmoveDown = function(){
    clearTimeout(this._loop);
    this.speed = 1;
    this.loop();
};
GameArea.prototype.pause = function(){
    clearTimeout(this._loop);
};

GameArea.prototype.rotate = function() {
	// TODO rotate the displayed block
	this.tetrisBlock.rotate();
    this._blockView.rotate(this.tetrisBlock.matrix);
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
	this._blockView = new PointView(this.pointSize, this.tetrisBlock.matrix, this.blockPosition);
	this.canvas.append(this._blockView._enclosure); // TODO not nice to use private property here.
}


/**
 * Mess model
 *
 * The model of the bottom of gameArea
 *
 * Holds the status of each row by bitarray 
 */
function Mess(width,height) {
	//this.matrix = undefined;    //the bottom matrix
    this._width = Math.pow(2,width) - 1;
    this._height = height;
    this._rows = new Array(this._height);     //an array of bottom status
    //initialize
    for(i=0; i<height ; i++)
    {
        this._rows[i] = 0;
    }
};

Mess.prototype.hasCompleteRow = function() {
};
Mess.prototype.deleteRow = function(i) {
    //TODO
    var newRows = [0];
    newRows.push(this._rows.slice(0,i-1));
    newRows.push(this._rows.slice(i,this._height));
    $("div[data-row='"+i+"']").remove();
    this._rows = newRows;
};
Mess.prototype.getPoints = function() {
};
Mess.prototype.add = function(tetrisBlock, blockPosition) { 
    var blockPoints = tetrisBlock.matrix.getPoints();
    var x = 0;
    var y = 0;
    var add = 0;
    //add one point at a time
    for( i=0; i < blockPoints.length ; i++ ){
        x = blockPoints[i].x + blockPosition.x;
        y = blockPoints[i].y + blockPosition.y;
        add = Math.pow(2, x);
        this._rows[y] = this._rows[y] | add;
    }
    return this._rows;
}
Mess.prototype.hasPoint = function(point){
    var test = Math.pow(2,point.x);
    return (this._rows[point.y] & test) != 0;
}
Mess.prototype.check = function(){
    var list = new Array();
    for( i = 0; i < this._height ; i++){
        if( this._rows[i] >= this._width){
            list.push(i);
            //this.deleteRow(i);
        }
    }
    return list;
}
Mess.prototype.getHeight = function() {
	// TODO
}


/**
 * Tetris Block Model
 *
 * The model that defines he blocks
 * @param kind string the blocktype you want.
 */
function TetrisBlock(kind) {
    if (kind === undefined) {
        var keys = Object.keys(this.defaultBlocks);
        var randomIndex = Math.floor( Math.random() * keys.length );
        this.name = keys[randomIndex];
        matrix = this.defaultBlocks[keys[randomIndex]];
    } else {
        this.name = kind;
        matrix = this.defaultBlocks[kind];
    }   
    //Get the points of blocks 
    this.matrix = new Matrix(matrix);
};

TetrisBlock.prototype.rotate =function() {
	// TODO need to recalculate the blockPosition
    var pre = this.matrix.matrix;   //previous matrix
    var next = new Array(pre[0].length);    //the rotated matrix
    for( n = 0 ; n < next.length ; n++ ){
        var temp = new Array(pre.length);
        for( i = 0 ; i < pre.length ; i++ ){
            temp[i] = pre[i][next.length - 1 - n];
        }
        next[n] = temp;
    }
    this.matrix = new Matrix(next);
    return this;
};
TetrisBlock.prototype.getPoints = function() {
	// TODO
};
TetrisBlock.prototype.getHeight = function () {
	return matrix.countRows();
}
TetrisBlock.prototype.defaultBlocks = {
    "sBlock": [
        [0,1,1],
    	[1,1,0]
	],
    "LBlock": [
    	[1,1,1],
		[1,0,0]
	],
    "IBlock": [
    	[1,1,1,1]
	],
    "SquareBlock" : [
        [1,1],
    	[1,1],
	],
    "MirrorLBlock": [
    	[1,1,1],
		[0,0,1]
	],
    "MirrorSBlock": [
    	[1,1,0],
		[0,1,1]
	],
    "SpecialBlock": [
    	[1,1],
		[0,1],
		[1,1],
		[1,0],
		[1,1]
	]
}

/**
 * View class
 *
 * The view class to draw Points
 *
 * @param int       pointSize the size of each point
 * @param array     the matrix that defines the block
 * @param position  the position(left.top) to draw the block
 */
function PointView(pointSize, matrix, position) {
	
	this._pointSize = pointSize;
    this._angle = 0;
	this._enclosure = $('<div class="PointView"></div>');
	this._enclosure.css({
		position: 'absolute',
		top: position.y * this._pointSize,
		left: position.x * this._pointSize
	});
    this._points = new Array(); //an array of each points
	
	
	var points = matrix.getPoints();
	
	for (var i = 0; i < points.length; i++) {
		this._points.push(this._addPoint(points[i]));
	}
}

PointView.prototype._drawnPoint = function() {
	var div = $('<div class="point moving"></div>');
	div.css({
		position: 'absolute',
		height: this._pointSize, 
		width: this._pointSize
	});
	return div;
}
PointView.prototype._addPoint = function(position) {
	var point = this._drawnPoint();
    point.attr("data-relative-row",position.y);
	point.css({
		top: (position.y * this._pointSize),
		left: (position.x * this._pointSize)
	});
	this._enclosure.append(point);
    return point;
}
//moves the block to @position
PointView.prototype.move = function(position, animationTime) { 
	if (animationTime === undefined) {
		animationTime = this._animationTime;
	} else {
		this._animationTime = animationTime;
	}
	this._enclosure.stop();
	this._enclosure.animate({
		top: position.y * this._pointSize, 
		left: position.x * this._pointSize
	}, animationTime);
}
PointView.prototype.stopped = function(position){
    var x = 0;
    for( i=0; i < this._points.length ; i++ ){
        x = this._points[i].attr("data-relative-row");
        this._points[i].attr("data-row", position.y + parseInt(x));
    }
}
//rotates block
PointView.prototype.rotate = function(matrix){
    this._enclosure.empty();
    var point = matrix.getPoints();
    for( i=0 ; i<point.length ; i++ ){
        this._addPoint(point[i]);
    }
    //this._angle = (this._angle + 90) % 360;
    //this._enclosure.css({
    //    "transform-origin": "50% 50% 0",
    //    "-webkit-transform-origin": "50% 50% 0",
    //    "transform": "rotate("+this._angle+"deg)"
    //});
}
PointView.prototype.remove = function () {
	this._enclosure.remove();
}


/**
 * Matrix
 * 
 * an easy way to express a block's shape
 */
function Matrix(twoDimArray) {
	this.matrix = twoDimArray; // Holds the actual matrix
}
//gives the points
Matrix.prototype.getPoints = function(position) {
	if (position === undefined) {
		position = new Point(0, 0);
	}
	
	var points = [];
    for (var i = 0; i < this.matrix.length; i++) {
	    var blockRow = this.matrix[i];
	    var y = i + position.y;
	    for (var j = 0; j < blockRow.length; j++) {
		    var x = j + position.x;
		    if (blockRow[j] == 1) {
			    points.push(new Point(x, y));
		    }
	    }
    }
    return points;
}
Matrix.prototype.countRows = function () {
	return this.matrix.length;
}

/**
 * Point
 * 
 * Expresses the position of each material
 * 
 * @param int   x position
 * @param int   y position
 */
function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.moveDown = function () {
	this.y++;
}

$(document).ready(function(){
    controller = new Controller();
    $("#startstop").bind('click', function(){
        controller.startstop()
    });
});

