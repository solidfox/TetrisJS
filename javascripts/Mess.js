/**
 * Mess model
 *
 * The model of the bottom of gameArea
 *
 * Holds the status of each row by bitarray
 */
function Mess(width, height, pointSize) {
    this._width = width;
    this._height = height;
    this._pointSize = pointSize;

    this._rows = new Array(this._height);     //an array of bottom status
    this._rowPoints = new Array(this._height);  //the array to contain jQuery objects
    //initialize
    for(i=0; i<height ; i++)
    {
        this._rows[i] = new Array(this._width);
        this._rowPoints[i] = new Array(this._width);
        for(var j = 0; j < width; j++){
            this._rows[i][j] = 0;
        }
    }
}

/**
 *  Delete a row
 *
 *  Delete the row i and redraw the points
 *
 *  @param i    the row number
 */
Mess.prototype.deleteRow = function(row) {
    //Delete completed row
    for( var j = 0 ; j < this._width ; j++ ){
        this._rowPoints[row][j].remove();
    }
    
    var newRows = new Array(this._height);
    var newRowPoints = new Array(this._height);
    //new row to the top
    newRows[0] = new Array(this._width);
    newRowPoints[0] = new Array(this._width);
    for( var j = 0; j< this._width; j++ ){
        newRows[0][j] = 0;
    }
    //redefine the row above
    for( var i = 0; i < row ; i++) {
        newRows[i+1] = new Array(this._width);
        newRowPoints[i+1] = new Array(this._width);
        for( var j = 0 ; j < this._width ; j++ ){
            newRows[i+1][j] = this._rows[i][j];
            if( this._rowPoints[i][j] ){
                //redefine newPoint
                var newPoint = this._rowPoints[i][j].css("top", ( i + 1 ) * this._pointSize);
                this._rowPoints[i][j].remove();
                newRowPoints[i+1][j] = newPoint.appendTo(".gameCanvas");
            }
        }
    }
    for( var i = row + 1 ; i < this._height ; i++) {
        this.newRows[i] = new Array(this._width);
        this.newRowPoints[i] = new Array(this._width);
        for( var j = 0 ; j < this._width ; j++ ){
            newRows[i][j] = this._rows[i][j];
            if( this._rowPoints[i][j]){
                var newPoint = this._rowPoints[i][j];
                this._rowPoints[i][j].remove();
                newRowPoints[i][j] = newPoint.appendTo(".gameCanvas");
            }
        }
    }
    this._rows = newRows;
    this._rowPoints = newRowPoints;
};
Mess.prototype.getPoints = function() {
	// TODO
};
/**
 *  Add points to Mess
 *
 *  Add the points to mess and redraw the point
 */
Mess.prototype.add = function(tetrisBlock, blockPosition) {
    var blockPoints = tetrisBlock.getPoints();
    var x = 0;
    var y = 0;
    //add one point at a time
    for( i=0; i < blockPoints.length ; i++ ){
        var div = $('<div class="point"></div>');
        x = blockPoints[i].x + blockPosition.x;
        y = blockPoints[i].y + blockPosition.y;
        div.css({
            position: 'absolute',
            height: this._pointSize,
            width: this._pointSize,
            top: y * this._pointSize,
            left: x * this._pointSize,
            background: tetrisBlock.getColor()
        });
        this._rows[y][x] = 1;
        this._rowPoints[y][x] = div.appendTo(".gameCanvas");
    }
    return this._rows;
};
Mess.prototype.hasPoint = function(point){
    return (this._rows[point.y][point.x] !== 0);
};
Mess.prototype.getCompleteRows = function(){
    var completeRows = [];
    for(var i = 0; i < this._height ; i++){
        for (var j = 0; j < this._width; j++) {
            if(this._rows[i][j] !== 1){
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

