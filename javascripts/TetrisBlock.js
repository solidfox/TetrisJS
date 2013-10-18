/**
 * Tetris Block Model
 *
 * The model that defines the blocks
 * @param kind string the blocktype you want.
 */
function TetrisBlock(position, kind) {
	var matrix;
	var color;
	if (kind === undefined) {
		var keys = Object.keys(this.defaultBlocks);
		var randomIndex = Math.floor( Math.random() * keys.length );
		kind = keys[randomIndex];
		matrix = this.defaultBlocks[kind];
		color = this.defaultColors[kind];
	} else {
		
		matrix = this.defaultBlocks[kind];
		color = this.defaultColors[kind];
	}
	//Get the points of blocks
	this.name = kind;
	this._matrix = new Matrix(matrix, color);
	this._position = position;
	this._color = color;
}

TetrisBlock.prototype.rotateLeft =function() {
	this._matrix.rotateLeft();
	return this;
};

TetrisBlock.prototype.rotateRight =function() {
	this._matrix.rotateRight();
	return this;
};

/**
 * Returns the points in the matrix. Optionally you can provide a point position of
 * the matrix, that way the returned points will be offset from that point instead of (0,0).
 *
 * Example: given this matrix:
 * [0,1]
 * [1,0]
 * and the Point (3,4) the returned points will be
 * [Point(3,5), Point(4,4)]
 *
 * @returns the points in the matrix offset from the incomming Point object.
 * @argument position the Point object from which to offset the points.
 */
TetrisBlock.prototype.getPoints = function(position) {
	return this._matrix.getPoints(position);
};
TetrisBlock.prototype.getAbsolutePoints = function() {
	return this._matrix.getPoints(new Point(this._position));
};
TetrisBlock.prototype.getColor = function(){
	return this._color;
};
TetrisBlock.prototype.getHeight = function () {
	return matrix.countRows();
};
TetrisBlock.prototype.getPosition = function () {
	return new Point(this._position);
};
TetrisBlock.prototype.xPos = function () {
	return this._position.x;
};
TetrisBlock.prototype.yPos = function () {
	return this._position.y;
};
TetrisBlock.prototype.moveLeft = function () {
	this._position.x--;
};
TetrisBlock.prototype.moveRight = function () {
	this._position.x++;
};
TetrisBlock.prototype.moveDown = function () {
	this._position.y++;
};
TetrisBlock.prototype.moveUp = function () {
	this._position.y--;
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
		[1,1]
	],
	"MirrorLBlock": [
		[1,1,1],
		[0,0,1]
	],
	"MirrorSBlock": [
		[1,1,0],
		[0,1,1]
	],
	// "SpecialBlock": [
	// 	[1,1],
	// 	[0,1],
	// 	[1,1],
	// 	[1,0],
	// 	[1,1]
	// ],
	"TBlock": [
		[1,1,1],
		[0,1,0]
	],
	"CornerBlock": [
		[1,1],
		[0,1]
	],
	"BoxBlock": [
		[1,0,1],
		[1,0,1],
		[1,1,1]
	]
};
//Define the color of each block
TetrisBlock.prototype.defaultColors = {
	"sBlock":		"#ff0000",
	"LBlock":		"#0001ff",
	"IBlock":		"#03ff00",
	"SquareBlock":  "#fd00ff",
	"MirrorLBlock": "#00ffff",
	"MirrorSBlock": "#fffa00",
	"SpecialBlock": "#ffffff",
	"BoxBlock": "#ffffff",
	"TBlock": "#ddd",
	"CornerBlock": "purple"
};
