/**
 * View class specifically made for viewing tetris blocks.
 */
function MessView(mess, pointSize) {
	this._pointSize = pointSize;
	this._height = mess.getHeight();
	this._mess = mess;
	this._htmlParent = undefined;
	this._pointCluster = new PointClusterView(pointSize, mess.getPoints());
}

MessView.prototype.update = function(){
	var newCluster = new PointClusterView(this._pointSize, this._mess.getPoints());
	newCluster.showOn(this._htmlParent);
	this.remove();
	this._pointCluster = newCluster;
};
MessView.prototype.remove = function () {
	this._pointCluster.remove();
};
MessView.prototype.showOn = function (htmlParent) {
	this._pointCluster.showOn(htmlParent);
	this._htmlParent = htmlParent;
};