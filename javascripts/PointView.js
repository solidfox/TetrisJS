/**
 * View class
 *
 * The view class to draw Points
 *
 * @param int       pointSize the size of each point
 * @param array     the matrix that defines the block
 * @param position  the position(left.top) to draw the block
 */
function PointView(pointSize, points, position) {
	
	this._position = new Point(position);
	this._pointSize = pointSize;
    this._angle = 0;
	this._enclosure = $('<div class="PointView"></div>');
	this._enclosure.css({
		position: 'absolute',
		top: position.y * this._pointSize,
		left: position.x * this._pointSize
	});
    this._points = points; //an array of points
    
    
	for (var i = 0; i < points.length; i++) {
		this._addPoint(points[i]);
	}
}

PointView.prototype._getPointElements = function() {
	return $(this._enclosure).children();
}
PointView.prototype._drawnPoint = function() {
	var div = $('<div class="point moving"></div>');
	div.css({
		position: 'absolute',
		height: this._pointSize, 
		width: this._pointSize
	});
	return div;
}
PointView.prototype._addPoint = function(position) {
	var point = this._drawnPoint();
    point.attr("data-relative-row",position.y);
	point.css({
		top: (position.y * this._pointSize),
		left: (position.x * this._pointSize)
	});
	this._enclosure.append(point);
    return point;
}

/** 
 * Moves the block to @param position
 */
PointView.prototype.move = function(position, animationTime) {
	
	// Was an animation time specified?
	if (animationTime === undefined) {
		animationTime = this._animationTime;
	} else {
		this._animationTime = animationTime;
	}
	
	// Are we moving sideways or down?
	if (position.x != this._position.x) {
		this._enclosure.animate({
			left: position.x * this._pointSize
		}, {
			duration: animationTime,
			queue: false
		});
	}
	if (position.y != this._position.y) {
		this._enclosure.animate({
			top: position.y * this._pointSize,
		}, {
			duration: animationTime,
			queue: false
		});
	}
	
	this._position = new Point(position);
}

/*
PointView.prototype.stopped = function(position){
	var pointElements = this._getPointElements();
    var x = 0;
    for( i=0; i < pointElements.length ; i++ ){
        x = pointElements[i].attr("data-relative-row");
        pointElements[i].attr("data-row", position.y + parseInt(x));
    }
}
*/

/**
 * Rotates view
 */
PointView.prototype.rotate = function(matrix){
    this._enclosure.empty();
    var point = matrix.getPoints();
    for( i=0 ; i<point.length ; i++ ){
        this._addPoint(point[i]);
    }
    //this._angle = (this._angle + 90) % 360;
    //this._enclosure.css({
    //    "transform-origin": "50% 50% 0",
    //    "-webkit-transform-origin": "50% 50% 0",
    //    "transform": "rotate("+this._angle+"deg)"
    //});
}
PointView.prototype.remove = function () {
	this._enclosure.remove();
}
