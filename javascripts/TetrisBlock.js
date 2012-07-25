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
