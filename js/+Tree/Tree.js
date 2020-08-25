const nodes = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [22, 23],
  [23, 0],

  [16, 35],

  [24, 25],
  [25, 26],
  [26, 27],
  [27, 28],
  [28, 29],
  [29, 30],
  [30, 31],
  [31, 32],
  [32, 33],
  [33, 34],
  [34, 35],
  [35, 36],
  [36, 37],
  [37, 38],
  [38, 39],
  [39, 24],

  [32, 40],

  [40, 41],
  [41, 42],
  [42, 43],
  [43, 47],

  [40, 44],
  [44, 45],
  [45, 46],
  [46, 47],

  [47, 48],
];

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

function Graph(nodes, edges) {
  list = null;
  matrix = null;
  createGraph(nodes, edges);

  return {
    addNode: addNode,
    addEdge: addEdge,
    createGraph: createGraph,
    shortestPath: shortestPath,
    dfs: dfs,
    dfs_path: dfs_path,
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
    //console.log(matrix);
  }
  function dj(start, end) {
    path = [];
    adj_node = {};
    queue = [];
    for (let node in graph) {
      path[node] = Number.MAX_VALUE;
    }
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

      /*
      console.log(
        "Visiting node " +
          shortestDistance +
          " with current distance " +
          shortestDistance
      );
      */

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
      //console.log("Visited nodes: " + visited);
      //console.log("Currently lowest distances: " + distances);
    }
    return [distances, parents];
  }

  function dfs(start, target) {
    console.log("Visiting Node " + start.id);
    if (start.id === target.id) {
      // We have found the goal node we we're searching for
      console.log("Found the node we're looking for!");
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
    console.log(
      "Went through all children of " +
        start.value +
        ", returning to it's parent."
    );
    return null;
  }
  function shortestPath() {}

  function shortestPathO(start, end) {
    var dist = new Array(list.size);
    for (var i = 0; i < list.size; i++) dist[i] = Number.MAX_VALUE;
    dist[end] = 0;

    //var queue = [[0, start]];
    var st = new Set();
    st.add([0, start]);

    var visited = new Set();
    var count = 0;
    while (st.size > 0 && count < 4) {
      count++;
      now = st.values().next();
      const i = now.value[1];
      const d = now.value[0];
      st.delete(now.value);

      console.log("edge index:", i);
      let edge = list.get(i);
      console.log("edge", edge);
      var shortestDistance = Number.MAX_VALUE;
      var shortestIndex = -1;
      if (dist[i] < shortestDistance && !visited[i]) {
        shortestDistance = dist[i];
        shortestIndex = i;
      }
      visited.add(i);
      //console.log(w + edge[1], dist[edge[0]]);
      /*
      if (w + edge[1] < dist[edge[0]]) {
        //[...st].filter((edge) => {if(item[0] == dist[edge[0]] && item[1] == edge[0])});
        st.delete([dist[edge[0]], edge[0]]);
        dist[edge[0]] = w + edge[1];
        st.add([dist[edge[0]], edge[0]]);
        /*
        queue.splice(dist[edge[0]], 1);
        dist[edge[0]] = w + edge[1];
        queue[dist[edge[0]]] = edge[0];
        console.log("queue", queue);
        }
        */
    }
    return dist;
  }
  function shortestPathB(start, end) {
    console.log(list);
    var distances = [];
    for (var i = 0; i < list.size; i++) distances[i] = Number.MAX_VALUE;
    distances[start] = 0;
    var visited = [];

    while (true) {
      var shortestDistance = Number.MAX_VALUE;
      var shortestIndex = -1;
      for (let i = 0; i < list.size; i++) {
        //console.log(distances[i]);
        if (distances[i] < shortestDistance && !visited[i]) {
          shortestDistance = distances[i];
          shortestIndex = i;
        }
      }
      console.log(
        "Visiting node " +
          shortestDistance +
          " with current distance " +
          shortestDistance
      );

      if (shortestIndex == -1) {
        return distances;
      }

      // iterate edges
      for (var i = 0; i < list.get(shortestIndex + 1).length; i++) {
        console.log("Edge:", list.get(shortestIndex + 1)[i]);
      }

      visited[shortestIndex] = true;
      console.log("Visited nodes: " + visited.length);
      //console.log("Currently lowest distances: " + distances);
    }
  }
}
const Tree = {
  findSubNode(node, id) {
    if (node.id && node.id == id) {
      return node;
    } else if (node.children != null) {
      var result = null;
      for (let i = 0; result == null && i < node.children.length; i++) {
        result = this.findSubNode(node.children[i], id);
      }
      return result;
    }
    return null;
  },
  findNode(tree, id) {
    var result = null;
    let i = 0;
    for (; result == null && i < tree.length; i++) {
      result = this.findSubNode(tree[i], id);
    }
    return [result, tree[i - 1]];
  },
  flattenNodes(node, flat = []) {
    flat.push(node);
    if (node.children)
      for (let i = 0; i < node.children.length; i++) {
        flat.concat(this.flattenNodes(node.children[i], flat));
      }
    flat.forEach((item) => {
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          item.children = [];
        }
      }
    });

    return flat;
  },
  flatten(treeConst) {
    var flat = [];
    var tree = [...treeConst];
    tree.forEach((item) => {
      if (Array.isArray(item)) {
        flat.push(...flatten(item));
      } else {
        //flat.push(item);
        if (item.children)
          for (let i = 0; i < item.children.length; i++) {
            flat.concat(...this.flattenNodes(item.children[i], flat));
          }
      }
    });

    flat.forEach((item) => {
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          item.children = [];
        }
      }
    });

    flat.map(({ id, parent, moves, conditionals }) => ({
      id,
      parent,
      moves,
      conditionals,
      children: [],
    }));

    return flat;
  },
  findPathToNode(tree, end) {
    let queue = [end];
    let visitedNodes = new Set();
    let path = [];
    while (queue.length > 0) {
      path = queue.shift();
      let currentNode = path;
      if (currentNode === undefined) {
        return null;
      } else if (currentNode.id == end.id) {
        return path;
      } else if (!visitedNodes.has(currentNode)) {
        visitedNodes.add(currentNode);
        //route.push(currentNode.id);
      }
    }
  },
};
