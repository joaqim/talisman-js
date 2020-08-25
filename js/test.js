//@depends ./+Board/Board.js
//@depends ./AssetsManager.js

window.onload = function () {
  asm = new this.AssetsManager(cfg);

  Promise.all(asm.loadAssets()).then(function (_loaded) {
    var board = new Board(asm);
    board.initialize();
    board.render();

    var img = this.asm.get("prophetess");
    img.id = "character-token";
    // Important to do for centering? voodoo magic
    img.style.left = `${-img.width * 2.5 * (board.width / 4581)}px`; // -63.5px
    img.style.top = `${img.height * 4 * (board.height / 3026)}px`; // 100px
    //console.log(img.style.left, img.style.top);

    document.getElementById("board-wrapper").appendChild(img);
    board.currentPlayerMove = img;

    var start = 0;
    var moves = 270;
    var endIndex = 34;
    var graph = Graph(nodes, edges);
    /*
    board.walkToTileID(img, start);

    //let path = graph.shortestPath(1, 13);

    //console.log(JSON.stringify(path, null, 1));
    const routes = board.getPossibleRoutes(start, moves);
    //console.log(JSON.stringify(routes, null, 1));

    let path = null;
    // finds node and with route/branch has it
    for (var i in routes) {
      // Both works
      end = board.searchTree(routes[i], endIndex);
      //end = graph.dfs(routes[i], board.tiles[endIndex]);
      if (end !== null) {
        console.log(end);
        path = routes[i];
        break;
      }
    }
    */

    printPath = (id, parents) => {
      if (id === null) {
        return;
      }
      printPath(parents[id], parents);
      console.log(id);
    };

    let [paths, parents] = graph.dijkstra(endIndex);
    // Paths show which nodes you can move to, (i.e max move is usually dice roll)
    console.log(JSON.stringify(paths, null, 1));

    console.log(JSON.stringify(parents, null, 1));
    board.walkPath(img, 0, parents);
    printPath(10, parents);
    //board.walkPath(img, paths, 13);
    //path = board.shortestPath(path, end);
    //console.log(JSON.stringify(path, null, 1));
    //console.log(JSON.stringify(path, null, 1));

    //var flat = Tree.flatten([path]);
    //console.log(JSON.stringify(flat, null, 1));

    //[end, path] = Tree.findNode(routes, endIndex);
    //path = Tree.findPathToNode(path, end);
    /*

    if (path && end) {
      path = Tree.flattenNodes(path);
      console.log(JSON.stringify(path, null, 1));
      board.walkPath(img, path, end);
    }

    //path = Tree.findPathToNode(routes, board.tiles[1], end);
    //console.log(JSON.stringify(path, null, 2));

    /*
    var end = null;
    var path = null;

    end = board.searchTree(routes[0], 37);
    console.log(end);
    */
    /*
    for (var i in routes) {
      end = board.searchTree(routes[i], 37);
      if (end !== null) {
        path = board.shortestPath(routes[i], end[0]);
        console.log(JSON.stringify(path, null, 2));
        break;
      }
    }
    console.log(end[0]);
    console.log(JSON.stringify(path, null, 2));
    if (path !== null) board.walkRoute(img, path);
    */
  });
};

