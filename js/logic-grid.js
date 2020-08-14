// @depends ./asset_loader.js
// @depends ./keyboard_handler.js
// @depends ./game.js
// @depends ./camera.js

/*
var map = {
  cols: 7,
  rows: 7,
  tsize: 64,
  layers: [[1, 2, 1, 1, 2, 1, 1, 2, 1]],
  getTile: function (layer, col, row) {
    return this.layers[layer][row * map.cols + col];
  },
  getCol: function (x) {
    return Math.floor(x / this.tsize);
  },
  getRow: function (y) {
    return Math.floor(y / this.tsize);
  },
  getX: function (col) {
    return col * this.tsize;
  },
  getY: function (row) {
    return row * this.tsize;
  },
};
*/
class Map {
  constructor() {
    const MAP_RATIO = 1.5138797091870455;
    this.state = {
      image: Loader.getImage("talisman_board"),
      width: 640 * MAP_RATIO,
      height: 640,
      tsize: 640 / 7,
      cols: 7,
      rows: 7,
    };
  }
}

function Hero(map, x, y) {
  this.map = map;
  this.x = x;
  this.y = y;
  this.width = map.state.tsize;
  this.height = map.state.tsize;

  this.image = Loader.getImage("hero");
}

Hero.SPEED = 256; // pixels per second

Hero.prototype.move = function (delta, dirx, diry) {
  // move hero
  this.x += dirx * Hero.SPEED * delta;
  this.y += diry * Hero.SPEED * delta;

  // clamp values
  var maxX = this.map.state.width;
  var maxY = this.map.state.height;
  this.x = Math.max(0, Math.min(this.x, maxX));
  this.y = Math.max(0, Math.min(this.y, maxY));
};

Game.load = function () {
  return [
    Loader.loadImage("tiles", "assets/tiles.png"),
    Loader.loadImage("hero", "assets/prophetess.png", {
      width: 96,
      height: 96,
    }),
    Loader.loadImage("talisman_board", "assets/talisman_board_hr.jpg"),
  ];
};

Game.init = function () {
  Keyboard.listenForEvents([
    Keyboard.LEFT,
    Keyboard.RIGHT,
    Keyboard.UP,
    Keyboard.DOWN,
  ]);
  this.tileAtlas = Loader.getImage("tiles");

  this.map = new Map();
  this.hero = new Hero(this.map, 96, 96);
  const SCALE = 1.0;
  this.camera = new Camera(
    this.map,
    this.map.state.width * SCALE,
    this.map.state.height * SCALE
  );
  this.camera.follow(this.hero);
};

Game.update = function (delta) {
  // handle hero movement with arrow keys
  var dirx = 0;
  var diry = 0;
  if (Keyboard.isDown(Keyboard.LEFT)) {
    dirx = -1;
  } else if (Keyboard.isDown(Keyboard.RIGHT)) {
    dirx = 1;
  } else if (Keyboard.isDown(Keyboard.UP)) {
    diry = -1;
  } else if (Keyboard.isDown(Keyboard.DOWN)) {
    diry = 1;
  }

  this.hero.move(delta, dirx, diry);
  this.camera.update();
};

Game._drawLayer = function (layer) {
  var startCol = Math.floor(this.camera.x / map.tsize);
  var endCol = startCol + this.camera.width / map.tsize;
  var startRow = Math.floor(this.camera.y / map.tsize);
  var endRow = startRow + this.camera.height / map.tsize;
  var offsetX = -this.camera.x + startCol * map.tsize;
  var offsetY = -this.camera.y + startRow * map.tsize;

  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = map.getTile(layer, c, r);
      var x = (c - startCol) * map.tsize + offsetX;
      var y = (r - startRow) * map.tsize + offsetY;
      if (tile !== 0) {
        // 0 => empty tile
        this.ctx.drawImage(
          this.tileAtlas, // image
          (tile - 1) * map.tsize, // source x
          0, // source y
          map.tsize, // source width
          map.tsize, // source height
          Math.round(x), // target x
          Math.round(y), // target y
          map.tsize, // target width
          map.tsize // target height
        );
      }
    }
  }
};

Game._drawMap = function () {
  this.ctx.drawImage(
    this.map.state.image,
    -this.camera.x,
    -this.camera.y,
    this.map.state.width,
    this.map.state.height
  );
};

Game.render = function () {
  // draw map background layer
  //  this._drawLayer(0);

  this._drawMap();

  // draw main character
  this.ctx.drawImage(
    this.hero.image,
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2,
    this.hero.image.width,
    this.hero.image.height
  );
};
