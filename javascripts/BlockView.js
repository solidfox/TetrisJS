/**
 * View class specifically made for viewing tetris blocks.
 */
function BlockView(tetrisBlock, pointSize) {
	this._tetrisBlock = tetrisBlock;
	this._pointCluster = new PointClusterView(pointSize, tetrisBlock.getPoints(), tetrisBlock.getPosition());
}

BlockView.prototype.move = function(animationTime) {
	this._pointCluster.move(this._tetrisBlock.getPosition(), animationTime);
};

BlockView.prototype.interrupt = function() {
    this._pointCluster.interrupt(this._tetrisBlock.getPosition());
};

BlockView.prototype.update = function(){
	this._pointCluster.transformTo(this._tetrisBlock.getPoints());
};
BlockView.prototype.remove = function () {
	this._pointCluster.remove();
};
BlockView.prototype.showOn = function (htmlParent) {
	this._pointCluster.showOn(htmlParent);
};