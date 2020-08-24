Board.prototype.move = function (el, x, y) {
  el.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;
};

Board.prototype.moveBoard = function (x, y) {
  this.el.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;
};

Board.prototype.moveToTileAtPos = function (el, x, y) {
  this.move(el, x * (this.width / 4581), y * (this.height / 3026));
};
Board.prototype.moveToTile = function (el, index) {
  this.moveToTileAtPos(
    el,
    this.tiles[index].center.x,
    this.tiles[index].center.y
  );
};
Board.prototype.walkToTile = async function (el, index) {
  //for loop until reach target
  this.moveToTile(el, index);
  await this._timeout(500);
};
Board.prototype._tilePressed = function (index) {
  console.log(index);
  if (this.currentPlayerMove) this.moveToTile(this.currentPlayerMove, index);
};

Board.prototype._timeout = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

Board.prototype.getPossibleRoutes = function (
  startIndex,
  maxMoves = 0,
  minMoves = null
) {
  const queue = [];
  const list = [{ id: startIndex, moves: -1 }];
  minMoves = minMoves || maxMoves;

  const startTile = this.tiles[startIndex];
  queue.push({ neighbours: startTile.neighbours, moves: 1, id: startTile.id });
  /*
  if (startTile.conditional.use_raft != undefined) {
    console.log(startTile.conditional.use_raft);
    for (const i of startTile.conditional.use_raft) {
      list.push({ id: i, moves: 0, conditional: "use_raft" });
    }
  }
  */
  const makeRoute = (id, list, maxMoves = 1) =>
    list
      .filter(({ parent, moves }) => parent == id && moves <= maxMoves)
      .map(({ id, parent, ...rest }) => ({
        id,
        parent,
        ...rest,
        children: makeRoute(id, list, maxMoves),
      }));

  var parent = startTile.id;
  let item;
  while ((item = queue.shift())) {
    if (item.moves > maxMoves) {
      break;
    }
    //return list.splice(1); // Removes starting tile
    const { neighbours, moves } = item;
    for (const index of neighbours) {
      if (list.find((l) => l.id === index)) continue;
      const neighbour = this.tiles[index];
      var conditional = null;
      var parent = item.id;
      //console.log("From: ", item.id, "To: ", index);
      if (neighbour.conditional) {
        for (const cond in neighbour.conditional) {
          console.log(cond);
          if (cond == "portal_of_power") {
            queue.push({ neighbours: [], moves: moves + 1 });
            conditional = "portal_of_power";
          } else if (cond == "defeat_sentinel") {
            queue.push({
              neighbours: neighbour.neighbours,
              moves: moves + 1,
              id: neighbour.id,
            });
            console.log(index);
            if (index == 36) {
              conditional = "defeat_sentinel";
            }
          } else {
            queue.push({
              neighbours: neighbour.neighbours,
              moves: moves + 1,
              id: neighbour.id,
            });
          }
        }
      } else {
        queue.push({
          neighbours: neighbour.neighbours,
          moves: moves + 1,
          id: neighbour.id,
        });
      }
      if (moves < minMoves + 1)
        list.push({ id: index, moves, conditional, parent });
    }
  }

  return makeRoute(startTile.id, list, maxMoves);
  //  return getSimpleRouteTo(3, makeRoute(startTile.id, list, maxMoves));
};
