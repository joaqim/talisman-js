Board.prototype.getRoute = async function (graph, start, end) {
  let queue = [[start]];
  let visitedNodes = new Set();

  while (queue.length > 0) {
    let path = queue.shift();
    console.log(path);
    let currentNode = path[path.length - 1];
    if (currentNode === end) {
      return path;
    } else if (
      currentNode === null ||
      currentNode === undefined ||
      currentNode.children.length == 0
    ) {
      return path;
    } else if (!visitedNodes.has(currentNode)) {
      let children = currentNode.children;
      for (let i in children) queue.push(children[i]);
      visitedNodes.add(currentNode);
    }
  }
};

Board.prototype.makeRoutes = function (id, list, maxMoves = 1) {
  return list
    .filter(({ parent, moves }) => parent == id && moves <= maxMoves)
    .map(({ id, parent, ...rest }) => ({
      id,
      parent,
      ...rest,
      children: this.makeRoutes(id, list, maxMoves),
    }));
};

Board.prototype.searchTree = function (element, id) {
  if (element.id && element.id == id) {
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = this.searchTree(element.children[i], id);
    }
    return result;
  }
  return null;
};

Board.prototype.shortestPath = function (start, end) {
  let queue = [start];
  let visitedNodes = new Set();
  let route = [];
  let previousNode = null;
  while (queue.length > 0) {
    let path = queue.shift();
    //console.log(JSON.stringify(path, null, 2));
    let currentNode = path;
    if (currentNode === undefined) {
      return null;
      //return visitedNodes;
    } else if (currentNode.id == end.id) {
      route.push(currentNode.id);
      return route;
    } else if (!visitedNodes.has(currentNode)) {
      for (let i in currentNode.children) {
        // Don't add ALL children to path if anyone of them is end
        if (currentNode.children[i].id === end.id) {
          // Remove any added children
          if (i > 0) {
            route.splice(route.length, i);
          }
          route.push(currentNode.id);
          route.push(currentNode.children[i].id);
          console.log(visitedNodes);
          return route;
        }
        queue.push(currentNode.children[i]);
      }
      //if (previousNode.children.length > 1) {
      // remove previous obsolete child
      //}
      visitedNodes.add(currentNode);
      previousNode = currentNode;
      route.push(currentNode.id);
    }
  }
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

  var routes = this.makeRoutes(startTile.id, list, maxMoves);
  return routes;

  var end = this.searchTree(routes[0], 6);

  return this.shortestPath(routes[0], end[0]);
  console.log("end", end[0].id);
  //return shortestPath(list, routes[0], end[0]);
};
