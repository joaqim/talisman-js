//@depends ./+Board/Board.js
//@depends ./AssetsManager.js
//@depends ./+Game/Game.js

window.onload = function () {
  asm = new this.AssetsManager(assets_cfg);

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

    board.currentIndex = 0;

    //let dice = new Dice();

    //dice.castDice();
    //dice.spinDice(1);
    //dice.playAnimation(dice.roll());

    let w = Wolf();

    //var game = new Game(game_cfg, this.asm);
    //game.testTurns();

    //var deck = new Deck(deck_cfg.adventure_deck);
    //deck.shuffle();
    //console.log(deck.draw(2));

    //var wolf = document.getElementById("card-container");
    //board.moveToTileID(wolf, 49);
    //wolf.style.WebkitTransform = `rotateX(-35deg)`;

    return;
    var start = 0;
    var maxMoves = 6;
    var moveTo = 6;

    var graph = Graph(graph_cfg);
    printPath = (id, parents) => {
      if (id === null) {
        return;
      }
      printPath(parents[id], parents);
      console.log(id);
    };

    let [paths, parents] = graph.dijkstra(moveTo);
    // Paths show which nodes you can move to, (i.e max move is usually dice roll)
    console.log(JSON.stringify(paths, null, 1));
    for (move of paths) {
      if (move == maxMoves) {
        // Move is valid
        console.log(move);
        board.walkPath(img, start, parents);
        break;
      }
    }

    //console.log(JSON.stringify(parents, null, 1));
    //printPath(10, parents);
  });
};
