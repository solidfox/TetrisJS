/**
 * Matrix
 *
 * an easy way to express a block's shape
 */
function Matrix(twoDimArray) {
	this._matrix = twoDimArray; // Holds the actual matrix
}

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
Matrix.prototype.getPoints = function(position) {
	if (position === undefined) {
		position = new Point(0, 0);
	}
	
	var points = [];
	for (var i = 0; i < this._matrix.length; i++) {
		var row = this._matrix[i];
		var y = i + position.y;
		for (var j = 0; j < row.length; j++) {
			var x = j + position.x;
			if (row[j] == 1) {
				points.push(new Point(x, y));
			}
		}
	}
	return points;
};
Matrix.prototype.countRows = function () {
	return this._matrix.length;
};
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
};