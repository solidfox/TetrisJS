/**
 * Matrix
 * 
 * an easy way to express a block's shape
 */
function Matrix(twoDimArray) {
	this._matrix = twoDimArray; // Holds the actual matrix
}
//gives the points
Matrix.prototype.getPoints = function(position) {
	if (position === undefined) {
		position = new Point(0, 0);
	}
	
	var points = [];
    for (var i = 0; i < this._matrix.length; i++) {
	    var blockRow = this._matrix[i];
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
	return this._matrix.length;
}
Matrix.prototype.rotate = function () {
	var pre = this._matrix;   //previous matrix
    var next = new Array(pre[0].length);    //the rotated matrix
    for( n = 0 ; n < next.length ; n++ ){
        var temp = new Array(pre.length);
        for( i = 0 ; i < pre.length ; i++ ){
            temp[i] = pre[i][next.length - 1 - n];
        }
        next[n] = temp;
    }
    this._matrix = next;
}