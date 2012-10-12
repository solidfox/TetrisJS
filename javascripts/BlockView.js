
function BlockView(tetrisBlock, pointSize) {
	this._tetrisBlock = tetrisBlock;
	this._pointView = new PointView(pointSize, tetrisBlock.getPoints(), tetrisBlock.getPosition(), tetrisBlock.getColor());
}

BlockView.prototype.move = function(animationTime) {
	this._pointView.move(this._tetrisBlock.getPosition(), animationTime);
};

BlockView.prototype.interrupt = function() {
    this._pointView.interrupt(this._tetrisBlock.getPosition());
};

BlockView.prototype.rotate = function(){
	this._pointView.rotate(this._tetrisBlock.getPoints(), this._tetrisBlock.getColor());
};
BlockView.prototype.remove = function () {
	this._pointView.remove();
};
BlockView.prototype.showOn = function (htmlParent) {
	this._pointView.showOn(htmlParent);
};