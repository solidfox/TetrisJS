/**
 * Tetris Block Model
 *
 * The model that defines the blocks
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
    this._matrix = new Matrix(matrix);
};

TetrisBlock.prototype.rotate =function() {
	// TODO need to recalculate the blockPosition
    this._matrix.rotate();
    return this;
};
TetrisBlock.prototype.getPoints = function() {
	return this._matrix.getPoints();
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
