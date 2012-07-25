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
