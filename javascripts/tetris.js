
var Controller = function() {
};

Controller.prototype.start = function() {
        var gameArea = new GameArea($('#gamearea'));
		$('#startstop').attr('value','pause');
};
Controller.prototype.gameOver = function() {
		window.alert("gameOver");
};


function GameArea(gameareaDiv) {
	if (gameareaDiv === undefined) {
		throw new Error("GameArea was created without specifying a gameareaDiv.");
	}

	this.width = 10;         // ten block width
	this.height = 20;
	
	this.STARTPOSITION = {y:0, x:this.width/2};
	
    this.pointSize = 20;     // size of one block in pixels
    
	this.baseSpeed = 1000; 	// Milliseconds for block to move down one row
	this.speed = 1;			// Divisor by which to divide the baseSpeed
	
	this.mess = new Mess();
	this.tetrisBlock = undefined;
	this.blockPosition = undefined;		// An object on the form {y:##, x:##}
    
    this.canvas = undefined;    
    this.clearCanvas(gameareaDiv);
    
    var that = this;
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
	var point = {};
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
	return mess.getHeight() >= this.height;
}
GameArea.prototype.loop = function() {
	// TODO is the game initialized?
	
	this.blockPosition.moveDown();
	
	if (this.hasCollided()) {
		this.mess.add(tetrisBlock);
		this.newBlock();
	}
	

	if (this.isGameOver()) {
		return this;
	}
	setTimeout(this.loop(), this.baseSpeed/this.speed);
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
GameArea.prototype.newBlock = function() {
	this.tetrisBlock = new TetrisBlock();
	this.blockPosition = this.STARTPOSITION;
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


var TetrisBlock = function(kind) {
    if (kind === undefined) {
        var keys = Object.keys(this.defaultBlocks);
        var randomIndex = Math.floor( Math.random() * keys.length );
        this.name = keys[randomIndex];
        this.matrix = this.defaultBlocks[keys[randomIndex]];
    } else {
        this.name = kind;
        this.matrix = this.defaultBlocks[kind];
    }   
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
	
	this._enclosure = $('<div class="PointView"></div>');
	enclosure.css({
		position: 'relative',
		
	});
	
	
	this._enclosure.append(drawnPoint())
}

PointView.prototype._drawnPoint = function() {
	var div = $('<div class="point"></div>');
	div.css({
		position: 'absolute',
		height: pointSize, 
		width: pointSize
	});
	return div;
}
PointView.prototype.addPoint = function(point) {
	
}

function Matrix(twoDimArray) {
	this.matrix = twoDimArray;
}

Matrix.prototype.getPoints = function() {
	var points = [];
    for (var i = 0; i < this.matrix.length; i++) {
	    var blockRow = this.matrix[i];
	    var y = i;
	    for (var j = 0; j < blockRow.length; j++) {
		    var x = j;
		    if (blockRow[j] == 1) {
			    points.push({"y":y, "x":x});
		    }
	    }
    }
    return points;
}

$(document).ready(function(){
    var controller = new Controller();
    $("#startstop").bind('click', function(){
        controller.start()
    });
});
