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
function PointView(point, size) {
	var color = point.color || "gray";
	this._position = new Point(point);
	this._size = size;
	this._drawn = $('<div class="point"></div>');
	this._drawn.css({
		position: 'absolute',
		top: point.y * size,
		left: point.x * size,
		width: size,
		height: size,
		background : color
	});
}


/**
 * Moves the block to @param position
 */
PointView.prototype.move = function(position, animationTime) {
	animationTime = animationTime || 0;
	
	// Are we moving sideways or down?
	if (position.x != this._position.x) {
		this._drawn.animate({
			left: position.x * this._size
		}, {
			duration: animationTime,
			queue: false
		});
	}
	if (position.y != this._position.y) {
		this._drawn.animate({
			top: position.y * this._size
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
PointView.prototype.interrupt = function(position) {
    this._drawn.stop();
	this._drawn.css({
		top: position.y * this._pointSize,
		left: position.x * this._pointSize
	});
};

PointView.prototype.showOn = function (htmlParent) {
	htmlParent.append(this._drawn);
};
