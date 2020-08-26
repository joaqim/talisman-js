//@depends ./graph_cfg.js

function Graph(graph_cfg) {
  list = null;
  matrix = null;
  createGraph(graph_cfg.nodes, graph_cfg.edges);

  return {
    addNode: addNode,
    addEdge: addEdge,
    createGraph: createGraph,
    dfs: dfs,
    dijkstra: dijkstra,
  };

  function addNode(node) {
    list.set(node, []);
    for (let i = 0; i < matrix.length; i++) {
      const col = matrix[i];
      col.push(0);
    }
    matrix.push(new Array(matrix.length).fill(0));
  }
  function addEdge(start, end) {
    list.get(start).push(end);
    list.get(end).push(start);
    matrix[start][end] = 1;
    matrix[end][start] = 1;
  }

  function createGraph(nodes, edges) {
    list = new Map();
    matrix = new Array();

    nodes.forEach((node) => addNode(node));
    edges.forEach((edge) => addEdge(edge[0], edge[1]));
  }
  function dfs_path(start, target) {
    let stack = [start];
    visited = new Set();
    visited.add(start);
    let path = [];
    while (stack.length > 0) {
      let curr = stack.pop();
      if (curr !== start) path.push(curr);
      for (let neigh of list.get(curr)) {
        if (!visited.has(neigh)) {
          visited.add(neigh);
          stack.push(neigh);
          if (neigh == target) {
            console.log("found:", neigh);
            path.push(neigh);
            return path;
          }
        }
      }
    }
  }
  function dijkstra(start) {
    //This contains the distances from the start node to all other nodes
    var distances = [];
    //Initializing with a distance of "Infinity"
    for (var i = 0; i < matrix.length; i++) distances[i] = Number.MAX_VALUE;
    //The distance from the start node to itself is of course 0
    distances[start] = 0;

    //This contains whether a node was already visited
    var visited = [];

    // path tree
    var parents = new Array(matrix.length);

    // The starting vertex does not
    // have a parent
    parents[start] = null;

    //While there are nodes left to visit...
    while (true) {
      // ... find the node with the currently shortest distance from the start node...
      var shortestDistance = Number.MAX_VALUE;
      var shortestIndex = -1;
      for (var i = 0; i < matrix.length; i++) {
        //... by going through all nodes that haven't been visited yet
        if (distances[i] < shortestDistance && !visited[i]) {
          shortestDistance = distances[i];
          shortestIndex = i;
        }
      }

      if (shortestIndex === -1) {
        // There was no node not yet visited --> We are done
        break;
        //return distances;
      }

      //...then, for all neighboring nodes....
      for (var i = 0; i < matrix[shortestIndex].length; i++) {
        //...if the path over this edge is shorter...
        if (
          matrix[shortestIndex][i] !== 0 &&
          distances[i] > distances[shortestIndex] + matrix[shortestIndex][i]
        ) {
          //...Save this path as new shortest path.
          parents[i] = shortestIndex;
          distances[i] = distances[shortestIndex] + matrix[shortestIndex][i];
          //console.log("Updating distance of node " + i + " to " + distances[i]);
        }
      }
      // Lastly, note that we are finished with this node.
      visited[shortestIndex] = true;
    }
    return [distances, parents];
  }

  function dfs(start, target) {
    if (start.id === target.id) {
      return start;
    }

    len = new Map();
    // Recurse with all children
    for (var i = 0; i < start.children.length; i++) {
      result = dfs(start.children[i], target);
      if (result != null) {
        // We've found the goal node while going down that child
        return result;
      }
    }

    // We've gone through all children and not found the goal node
    return null;
  }
}
