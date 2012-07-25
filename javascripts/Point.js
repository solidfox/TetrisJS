/**
 * Point
 * 
 * Represents a position
 * 
 * @param x   x position or a Point object from which to copy coordinates
 * @param y   y position
 */
function Point(x, y){
	if (x instanceof Point) {
		this.x = x.x;
		this.y = x.y;
	} else {
	    this.x = x;
	    this.y = y;
	}
}