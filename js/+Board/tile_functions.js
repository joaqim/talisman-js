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
Board.prototype.getRoute = async function (graph,start,end) {
  let queue = [[start]];
  let visitedNodes = new Set();

  while(queue.length > 0) {
    let path = queue.shift()
    console.log(path);
    let currentNode = path[path.length-1]
    if(currentNode === end){
      return path
    } else if (  currentNode === null || currentNode === undefined || currentNode.children.length == 0) {
      return path
    } else if (!visitedNodes.has(currentNode)){
      let children = currentNode.children;
      for(let i in children) queue.push(children[i])
      visitedNodes.add(currentNode);
          }

  }
}

Board.prototype.walkRoute = async function (el, route) {
  let tile = route[0]
  console.log(tile)
  this.moveToTile(el, tile.id);
  /*
  while(tile.children !== undefined && tile.children.length > 0) {
    this._timeout(500);
    this.walkRoute(el, tile.children[0].id);
  }
  */
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

  const searchTree = (element, id, elements = []) => {
    elements.unshift(element);
    if(element.id && element.id == id){
      return elements;
    } else if (element.children != null){
      var i;
      var result = null;
      elements = [];
      for(i=0; result == null && i < element.children.length; i++){
        result = searchTree(element.children[i], id, elements);
      }
      return result;
    }
    return null;
  }

  const shortestPath = (graph, start, end) => {
    //let queue = new Array();
    //queue.push(start);
    let queue = [[start]];
    let visitedNodes = new Set();

    while(queue.length > 0) {
      let path = queue.shift()
      console.log(path);
      let currentNode = path[path.length-1]
      //let currentNode = path;
      //console.log(currentNode);
      if(currentNode === end){
        return path
      } else if (  currentNode === null || currentNode === undefined || currentNode.children.length == 0) {
        // return null;
        return path
      } else if (!visitedNodes.has(currentNode)){
        let children = currentNode.children;
        for(let i in children) queue.push(children[i])
        visitedNodes.add(currentNode);
      }
      /*
      let currentNode = path[path.length - 1]
      if (currentNode === end) {
        return path
      } else if (!visitedNodes.has(currentNode)) {
        let neighborNodes = graph[currentNode]
        queue.push(neighborNodes)
        visitedNodes.add(currentNode)
      }
      */
    }
  }

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

  //return makeRoute(startTile.id, list, maxMoves);
  //return getSimpleRouteTo(3, makeRoute(startTile.id, list, maxMoves));
  var routes = makeRoute(startTile.id, list, maxMoves);
  console.log(routes[0]);
  var end = searchTree(routes[0], 7)
  console.log("end",end[0].id)
  return shortestPath(list,routes[0],end[0]);
};
