//@depends ./AssetLoader.js

function BoardManager() {
  const board = talisman.talisman_board;
  return {
    //selectTile: selectTile,
    getTile: getTile,

    //putEntity: putEntity,
    //getEntity: getEntity,

    //pickupEntity: pickupEntity,

    //getTileContent: getTileContent,
    //getTileEffect: getTileEffect,

    draw: draw,
    test: test,
    init: init,
  };
  function init() {}
  function getTile(index) {
    return board[index];
  }
  function test_1() {
    let i = 0;
    let y = 1;
    for (var x = 1; x < 7; x++) {
      i++;
      console.log(x, y, " : ", i);
      if (x == 6) {
        x++;
        for (; y < 8; y++) {
          i++;
          console.log(x, y, " : ", i);
        }
      }
    }
    y = 7;
    for (let x = 6; x > 1; x--) {
      i++;
      console.log(x, y, " : ", i);
      if (x == 2) {
        x--;
        for (; y > 1; y--) {
          i++;
          console.log(x, y, " : ", i);
        }
      }
    }
    console.log(i);
  }
  function test() {
    var x = 1;
    var y = 1;
    var delta = { x: 1, y: 0 };
    var w = 7;
    var d = 1;
    const m = Math.pow(w, 2);

    deviations = new Map([
      [40, { x: 5, y: 5, delta: { x: -1, y: 0 } }],
      [44, { x: 5, y: 4, delta: { x: 0, y: -1 } }],
      [46, { x: 4, y: 3, delta: { x: -1, y: 0 } }],
      [48, { x: 4, y: 4, delta: { x: 0, y: 0 } }],
    ]);
    let dv = {};

    for (var i = 1; i < m + 1; i++) {
      console.log(x, y, " : ", i);

      board[i].col = x;
      board[i].row = y;
      x += delta.x;
      y += delta.y;

      if ((dv = deviations.get(i))) {
        [x, y, delta] = [dv.x, dv.y, dv.delta];
        d++;
        w--;
      } else if (x == w && y == d) delta = { x: 0, y: 1 };
      else if (x == w && y == w) delta = { x: -1, y: 0 };
      else if (x == d && y == w) delta = { x: 0, y: -1 };
      else if (i == (w - d) * 4) {
        w--;
        d++;
        x++;
        y = d;
        delta = { x: 1, y: 0 };
      }
    }
    //console.log(JSON.stringify(board, null, 0));
  }
  function draw(ctx) {
    m = Math.pow(7, 2);
    //ctx.drawImage(Loader.getImage("board"), 0, 0);
    for (var i = 1; i < m + 1; i++) {
      drawTile(ctx, getTile(i));
    }
  }
  function drawTile(ctx, tile) {
    ctx.beginPath();
    tx = 65.5;
    ty = 43;
    ctx.rect((tile.col - 1) * tx, (tile.row - 1) * ty, tx, ty);
    ctx.stroke();

    ctx.beginPath();

    let c = tile.center;
    ctx.arc(c.x / 10, c.y / 10, 5, 0, 2 * Math.PI);

    ctx.fill();

    x = tile.x;
    y = tile.y;
  }
}

//let board = new BoardManager();
//var ctx = document.getElementById("canvas").getContext("2d");

//board.test();

