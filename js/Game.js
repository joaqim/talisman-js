// @depends ./AssetLoader.js
// @depends ./Keyboard.js
// @depends ./Camera
// @depends ./Map.js
// @depends ./Hero.js

class Game {
  constructor() {}

  run(context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(
      function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
      }.bind(this)
    );
  }

  tick = (elapsed) => {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
  };

  load() {
    return [
      Loader.loadImage("tiles", "assets/tiles.png"),
      Loader.loadImage("hero", "assets/prophetess.png", {
        width: 96,
        height: 96,
      }),
      Loader.loadImage("talisman_board", "assets/talisman_board_hr.jpg"),
    ];
  }

  init() {
    this.keyboard = new Keyboard();

    this.keyboard.listenForEvents([
      keycodes.LEFT,
      keycodes.RIGHT,
      keycodes.UP,
      keycodes.DOWN,
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
  }

  update(delta) {
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (this.keyboard.isDown(keycodes.LEFT)) {
      dirx = -1;
    } else if (this.keyboard.isDown(keycodes.RIGHT)) {
      dirx = 1;
    } else if (this.keyboard.isDown(keycodes.UP)) {
      diry = -1;
    } else if (this.keyboard.isDown(keycodes.DOWN)) {
      diry = 1;
    }

    this.hero.move(delta, dirx, diry);
    this.camera.update();
  }

  _drawLayer(layer) {
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
  }

  _drawMap() {
    this.ctx.drawImage(
      this.map.state.image,
      -this.camera.x,
      -this.camera.y,
      this.map.state.width,
      this.map.state.height
    );
  }

  render() {
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
  }
}
