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

    var routes = board.getPossibleRoutes(1, 6);
    console.log(JSON.stringify(routes, null, 2));
    board.walkToTile(img, 33);
  });
};
