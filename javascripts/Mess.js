/**
 * Mess model
 *
 * The model of the bottom of gameArea
 *
 * Holds the status of each row by bitarray
 */
function Mess(width, height) {
    this._width = width;
    this._height = height;

    this._rows = new Array(this._height);     //an array of bottom status
    //initialize
    for(i=0; i<height ; i++)
    {
        this._rows[i] = new Array(width);
        for(var j = 0; j < width; j++){
            this._rows[i][j] = 0;
        }
    }

    this._matrix = new Matrix(this._rows);
}

/**
 *  Delete a row
 *
 *  Delete the row i and redraw the points
 *
 *  @param i    the row number
 */
Mess.prototype.deleteRow = function(row) {
    this._matrix.deleteRow(row);
};
Mess.prototype.getPoints = function () {
    return this._matrix.getPoints();
};
Mess.prototype.getPointsOnRow = function (row, customY) {
    return this._matrix.getPointsOnRow(row, customY);
};
Mess.prototype.getHeight = function () {
    return this._height;
};
Mess.prototype.getMatrix = function () {
    return this._matrix;
};
/**
 *  Add points to Mess
 *
 *  Add the points to mess and redraw the point
 */
Mess.prototype.add = function(tetrisBlock) {
    var blockPoints = tetrisBlock.getAbsolutePoints();
    for( i=0; i < blockPoints.length ; i++ ){
        this._matrix.addPoint(blockPoints[i]);
    }
    return this._rows;
};
Mess.prototype.hasPoint = function(x,y){
    return this._matrix.hasPoint(x,y);
};
Mess.prototype.getCompleteRows = function(){
    var completeRows = [];
    for(var i = 0; i < this._height ; i++){
        for (var j = 0; j < this._width; j++) {
            if(!this.hasPoint(j,i)){
                break;
            }
        }
        if (j == this._width) {
            completeRows.push(i);
        }
    }
    return completeRows;
};
Mess.prototype.getHeight = function() {
	// TODO
};

