
var Controller = function() {
	this.gameArea;
};

Controller.prototype.start = function() {
    this.gameArea = new GameArea($('#gamearea'));
    this.gameArea.loop();
	$('#startstop').attr('value','pause');
};
Controller.prototype.gameOver = function() {
		window.alert("gameOver");
};


/**
 * GameArea 
 * @param gameareaDiv jQuery object for the gamearea
 */
function GameArea(gameareaDiv) {
	if (gameareaDiv === undefined) {
		throw new Error("GameArea was created without specifying a gameareaDiv.");
	}

    this._start = false;    //The status whether the game has started

	this.width = 10;         // ten block width
	this.height = 20;
	
	this.STARTPOSITION = new Point(this.width/2, 0);
	
    this.pointSize = 20;     	// size of one point in pixels
    
	this.baseSpeed = 1000; 		// Milliseconds for block to move down one row
	this.speed = 1;				// Divisor by which to divide the baseSpeed
	
	this.mess = new Mess();
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
    this.canvas = $('<div class="gameCanvas"></div>').appendTo(aDiv).width(pixelWidth).height(pixelHeight);
}
GameArea.prototype.hasCollided = function() {
	var point = new Point(0, 0);
	var matrix = this.tetrisBlock.matrix;
	
    for (var i = 0; i < matrix.length; i++) {
	    var blockRow = matrix[i];
	    point.y = i + blockPosition.y;
	    for (var j = 0; j < blockRow.length; j++) {
		    point.x = j + blockPosition.x;
		    if (mess.hasPoint(point)) {
			    return true;
		    }
		    if (point.y > this.height) {
			    return true;
		    }
	    }
    }
    return false;
}
GameArea.prototype.isGameOver = function() {
	return this.mess.getHeight() >= this.height;
}
GameArea.prototype.loop = function() {
    if( this._start === false ){
        this._start = true;
        this._newBlock();
    }
	
	this.blockPosition.moveDown();
	
	if (this.hasCollided()) {
		this.mess.add(tetrisBlock);
		this._newBlock();
	}
	if (this.isGameOver()) {
		return this;
	}
	
	var loopPeriod = this.baseSpeed/this.speed;
	
	this._blockView.move(this.blockPosition, loopPeriod);

	var that = this;
	setTimeout(function(){that.loop()}, loopPeriod);
};
GameArea.prototype.moveRight = function() {
	this.blockPosition.moveRight();
};
GameArea.prototype.moveLeft = function() {
	this.blockPosition.moveLeft();
};
GameArea.prototype.moveDown = function() {
	this.blockPosition.moveDown();
};
GameArea.prototype.rotate = function() {
	// TODO rotate the displayed block
	this.tetrisBlock.rotate();
};
GameArea.prototype.deleteRow = function() {
		window.alert("Game area delete");
}
GameArea.prototype._newBlock = function() {
	this.tetrisBlock = new TetrisBlock();
	this.blockPosition = new Point(this.STARTPOSITION.x,this.STARTPOSITION.y);
	this._blockView = new PointView(this.pointSize, this.tetrisBlock.matrix, this.blockPosition);
	this.canvas.append(this._blockView._enclosure); // TODO not nice to use private property here.
}


function Mess() {
	this.matrix = undefined;
};

Mess.prototype.hasCompleteRow = function() {
};
Mess.prototype.deleteRow = function() {
	window.alert("Mess delete");
};
Mess.prototype.getPoints = function() {
};
Mess.prototype.add = function(tetrisBlock) { 
	// TODO
}
Mess.prototype.getHeight = function() {
	// TODO
}


function TetrisBlock(kind) {
    if (kind === undefined) {
        var keys = Object.keys(this.defaultBlocks);
        var randomIndex = Math.floor( Math.random() * keys.length );
        this.name = keys[randomIndex];
        this.matrix = this.defaultBlocks[keys[randomIndex]];
    } else {
        this.name = kind;
        this.matrix = this.defaultBlocks[kind];
    }   
    //Get the points of blocks 
    this.matrix = new Matrix(this.matrix);
};

TetrisBlock.prototype.rotate =function() {
	// TODO
};
TetrisBlock.prototype.getPoints = function() {
	// TODO
};
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

function PointView(pointSize, matrix, position) {
	
	this._pointSize = pointSize;
	this._enclosure = $('<div class="PointView"></div>');
	this._enclosure.css({
		position: 'relative',
		top: position.y * this._pointSize,
		left: position.x * this._pointSize
	});
	
	
	var points = matrix.getPoints();
	
	for (var i = 0; i < points.length; i++) {
		this._addPoint(points[i])
	}
}

PointView.prototype._drawnPoint = function() {
	var div = $('<div class="point"></div>');
	div.css({
		position: 'absolute',
		height: this._pointSize, 
		width: this._pointSize
	});
	return div;
}
PointView.prototype._addPoint = function(position) {
	var point = this._drawnPoint();
	point.css({
		top: (position.y * this._pointSize),
		left: (position.x * this._pointSize)
	});
	this._enclosure.append(point);
}
PointView.prototype.move = function(position, animationTime) { 
	this._enclosure.animate({top: position.y, left: position.x}, animationTime);
}



function Matrix(twoDimArray) {
	this.matrix = twoDimArray; // Holds the actual matrix
}

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

//The class express points
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
        controller.start()
    });
});
