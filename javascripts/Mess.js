/**
 * Mess model
 *
 * The model of the bottom of gameArea
 *
 * Holds the status of each row by bitarray 
 */
function Mess(width,height) {
	//this.matrix = undefined;    //the bottom matrix
    this._width = Math.pow(2,width) - 1;
    this._height = height;
    this._rows = new Array(this._height);     //an array of bottom status
    //initialize
    for(i=0; i<height ; i++)
    {
        this._rows[i] = 0;
    }
};

Mess.prototype.hasCompleteRow = function() {
};
Mess.prototype.deleteRow = function(i) {
    //TODO
    var newRows = [0];
    newRows.push(this._rows.slice(0,i-1));
    newRows.push(this._rows.slice(i,this._height));
    $("div[data-row='"+i+"']").remove();
    this._rows = newRows;
};
Mess.prototype.getPoints = function() {
};
Mess.prototype.add = function(tetrisBlock, blockPosition) { 
    var blockPoints = tetrisBlock.matrix.getPoints();
    var x = 0;
    var y = 0;
    var add = 0;
    //add one point at a time
    for( i=0; i < blockPoints.length ; i++ ){
        x = blockPoints[i].x + blockPosition.x;
        y = blockPoints[i].y + blockPosition.y;
        add = Math.pow(2, x);
        this._rows[y] = this._rows[y] | add;
    }
    return this._rows;
}
Mess.prototype.hasPoint = function(point){
    var test = Math.pow(2,point.x);
    return (this._rows[point.y] & test) != 0;
}
Mess.prototype.check = function(){
    var list = new Array();
    for( i = 0; i < this._height ; i++){
        if( this._rows[i] >= this._width){
            list.push(i);
            //this.deleteRow(i);
        }
    }
    return list;
}
Mess.prototype.getHeight = function() {
	// TODO
}
