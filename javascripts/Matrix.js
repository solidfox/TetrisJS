/**
 * Matrix
 *
 * an easy way to express a block's shape
 */
function Matrix(twoDimArray, color) {
	this._color = color;
	this._matrix = twoDimArray;
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
		position = new Point(0,0);
	}
	
	var points = [];
	for (var i = 0; i < this._matrix.length; i++) {
		var row = this._matrix[i];
		var y = i + position.y;
		for (var j = 0; j < row.length; j++) {
			var x = j + position.x;
			if (row[j] !== 0) {
				var color = typeof row[j] == 'string' ? row[j] : this._color;
				points.push(new Point(x, y, color));
			}
		}
	}
	return points;
};
Matrix.prototype.hasPoint = function (x,y) {
	var column = x;
	var row = y;
	if (x instanceof Point) {
		column = x.x;
		row = x.y;
	}
	return this._matrix[row][column] !== 0;
};
Matrix.prototype.getPoint = function (x,y) {
	return new Point(x,y,this._matrix[y][x]);
};
Matrix.prototype.getColor = function () {
	return this._color;
};
Matrix.prototype.getRow = function (row) {
	return this._matrix[row];
};
Matrix.prototype.deleteRow = function (row) {
	this._matrix.splice(row,1);
	this._matrix.unshift(this._cleanRow());
};
Matrix.prototype._cleanRow = function () {
    var row = new Array(this._matrix[0].length);
    for (var i = 0; i < row.length; i++) {
        row[i] = 0;
    }
    return row;
};
Matrix.prototype.countRows = function () {
	return this._matrix.length;
};
Matrix.prototype.addPoint = function (point) {
	color = point.color || 1;
	this._matrix[point.y][point.x] = color;
};
Matrix.prototype.getPointsOnRow = function (row, customY) {
	var rowLength = Array[this._matrix[0].length];
	var points = Array[rowLength];
	for (var column = 0; column < rowLength; column++) {
		var point = this.getPoint(column,row);
		if (typeof customY === 'number') {point.y = customY;}
		points.push(point);
	}
	return points;
};
Matrix.prototype.rotateLeft = function () {
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
Matrix.prototype.rotateRight = function () {
	var pre = this._matrix;   //previous matrix
	var yLength = pre.length;
	var xLength = pre[0].length;
	var next = new Array(xLength);    //the rotated matrix
	for( var y = 0 ; y < xLength ; y++ ){
		next[y] = new Array(yLength);
		for( x = 0 ; x < yLength ; x++ ){
			next[y][x] = pre[yLength - 1 - x][y];
		}
	}
	this._matrix = next;
};