/**
 * Point
 * 
 * Represents a position
 * 
 * @param x   x position or a Point object from which to copy coordinates
 * @param y   y position
 */
function Point(x, y, color){
	if (x instanceof Point) {
		this.x = x.x;
		this.y = x.y;
		this.color = x.color;
	} else {
	    this.x = x;
	    this.y = y;
	    this.color = color;
	}
}