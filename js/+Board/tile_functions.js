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
  this.moveToTileAtPos(el, this.tiles[id].center.x, this.tiles[id].center.y);
};
Board.prototype.walkToTileID = async function (el, id) {
  this.moveToTileAtPos(el, this.tiles[id].center.x, this.tiles[id].center.y);
  await this._timeout(500);
};
Board.prototype.walkToTile = async function (el, tile) {
  this.moveToTileAtPos(el, tile.center.x, tile.center.y);
  await this._timeout(500);
};
Board.prototype.moveToTile = function (el, tile) {
  this.moveToTileAtPos(el, tile.center.x, tile.center.y);
};

Board.prototype.walkPath = async function (el, id, parents) {
  if (id == null) return;
  await this.walkToTileID(el, id + 1);
  this.walkPath(el, parents[id], parents);
};

/*
Board.prototype.walkPath = async function (el, path, end = null) {
  for (const index of path) {
    this.moveToTileID(el, index + 1);
    if (index == end) return;
    await this._timeout(500);
  }
  /*
  while(tile.children !== undefined && tile.children.length > 0) {
    this._timeout(500);
    this.walkRoute(el, tile.children[0].id);
  }
};
*/

Board.prototype._tilePressed = function (index) {
  console.log(index);
  if (this.currentPlayerMove) this.moveToTileID(this.currentPlayerMove, index);
};

Board.prototype._timeout = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
