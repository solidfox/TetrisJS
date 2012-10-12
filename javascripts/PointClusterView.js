/**
 * View class
 *
 * The view class to draw Points
 *
 * @param int       pointSize the size of each point
 * @param array     the matrix that defines the block
 * @param position  the position(left.top) to draw the block
 * @param color     the color of the block
 * @param z			the depth at which the object lies
 */
function PointClusterView(pointSize, points, position) {

	this._position = new Point(position);
	this._pointSize = pointSize;
	this._enclosure = $('<div class="PointClusterView"></div>');
	this._enclosure.css({
		position: 'absolute',
		top: position.y * this._pointSize,
		left: position.x * this._pointSize
	});
    this._points = points; //an array of points
    this._pointViews = [];
    
    
	for (var i = 0; i < points.length; i++) {
		this.addPoint(points[i]);
	}
}

PointClusterView.prototype._getPointElements = function() {
	return $(this._enclosure).children();
};
PointClusterView.prototype.addPoint = function(point) {
	var ptView = new PointView(point, this._pointSize);
	ptView.showOn(this._enclosure);
	this._pointViews.push(ptView);
};

/**
 * Moves the block to @param position
 */
PointClusterView.prototype.move = function(position, animationTime) {
	
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
			top: position.y * this._pointSize
		}, {
			duration: animationTime,
			queue: false
		});
	}
	
	this._position = new Point(position);
};

/**
 * Interrupt animation
 * stop animating and move the block to the
 * right position
 *
 * @param position  the position of the point
 */
PointClusterView.prototype.interrupt = function(position) {
    this._enclosure.stop();
	this._enclosure.css({
		position: 'absolute',
		top: position.y * this._pointSize,
		left: position.x * this._pointSize
	});
};

/*
PointClusterView.prototype.stopped = function(position){
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
PointClusterView.prototype.transformTo = function(points, color){
    for( i=0 ; i<points.length ; i++ ){
        this._pointViews[i].move(points[points.length - i - 1],100);
    }
    //this._angle = (this._angle + 90) % 360;
    //this._enclosure.css({
    //    "transform-origin": "50% 50% 0",
    //    "-webkit-transform-origin": "50% 50% 0",
    //    "transform": "rotate("+this._angle+"deg)"
    //});
};
PointClusterView.prototype.remove = function () {
	this._enclosure.remove();
};
PointClusterView.prototype.showOn = function (htmlParent) {
	htmlParent.append(this._enclosure);
};
