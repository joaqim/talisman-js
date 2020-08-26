Board.prototype.move = function (el, x, y) {
  el.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;
};

Board.prototype.moveBoard = function (x, y) {
  this.el.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;
};

Board.prototype.moveToTileAtPos = function (el, x, y) {
  this.move(el, x * (this.width / 4581), y * (this.height / 3026));
};
Board.prototype.moveToTileID = function (el, id) {
  //console.log("moving to: ", id);
  this.moveToTileAtPos(el, this.tiles[id].center.x, this.tiles[id].center.y);
};
Board.prototype.walkToTileID = async function (el, id) {
  this.moveToTileAtPos(el, this.tiles[id].center.x, this.tiles[id].center.y);
  this.currentIndex = id;
  await this._timeout(this.walkDelayMS);
};
Board.prototype.walkToTile = async function (el, tile) {
  this.moveToTileAtPos(el, tile.center.x, tile.center.y);
  await this._timeout(this.walkDelayMS);
};
Board.prototype.moveToTile = function (el, tile) {
  this.moveToTileAtPos(el, tile.center.x, tile.center.y);
};

Board.prototype.walkPath = async function (el, id, parents) {
  if (id == null) return;
  this.moveToTileID(el, id);
  console.log(id);
  await this._timeout(this.walkDelayMS);
  this.currentIndex = id;
  this.walkPath(el, parents[id], parents);
};

Board.prototype._tilePressed = function (index) {
  console.log(index);
  if (this.currentPlayerMove) {
    this.moveToTileID(this.currentPlayerMove, index + 1);
    let [paths, parents] = this.graph.dijkstra(index);
    this.walkPath(this.currentPlayerMove, this.currentIndex, parents);
  }
};

Board.prototype._timeout = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
