//@depends ./AssetsManager.js
//@depends ./game_cfg.js

class Game {
  constructor() {
    this.boardEl = document.getElementById("board");
    this.ctx = this.boardEl.getContext("2d");
    this.asm = new AssetsManager(cfg);
    this.width = 969;
    this.height = 640;
    this.dirty_frames = [
      { x: 0, y: 0, width: this.width, height: this.height },
    ];
  }

  start() {
    this._previousElapsed = 0;

    Promise.all(this.asm.loadAssets()).then(
      function (_loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
      }.bind(this)
    );
  }

  init() {
    //this.boardEl.style.WebkitTransform = "rotateZ(20deg)";
    //
    //this.moveBoard(0, 0);
    //this.transformBoard(35, 120);
    var img = this.asm.get("prophetess");
    img.id = "character_token";
    document.getElementById("board-wrapper").appendChild(img);
    var bRect = this.boardEl.getBoundingClientRect();
    //img.style.WebkitTransform = "translateZ(1909px)"; //"translate3d(190px, 120px, 0px);rotateZ(90deg)";

    //this.transformBoard(x, z);
    //this.transform(img, x, z, { x: 0, y: -0 });
  }

  transform(elem, x, z, move = { x: 0, x: 0 }) {
    var rotate = -90;

    elem.style.WebkitTransform = `
    perspective(2040px)
    /*
    rotateX(${x}deg)
    rotateZ(${z}deg)
    rotate(${rotate}deg)
    translateZ(217px)
    translate3d(${move.x}px, ${move.y}px, 10px)
    */
    `;
  }
  /*
  move(elem, x, y) {
    elem.style.WebkitTransform = `translate3d(${x}px, ${y}0px, 0px)`;
  }
  transform(elem, x, z) {
    elem.style.WebkitTransform = `perspective(2040px) rotateX(${x}deg) rotateZ(${z}deg) translateZ(217px) `;
  }
  */

  moveBoard(x, y) {
    this.boardEl.style.WebkitTransform = `translate3d(${x}px, ${y}0px, 0px)`;
  }
  update(delta) {}

  transformBoard(x, z) {
    this.boardEl.style.WebkitTransform = `perspective(2040px) rotateX(${x}deg) rotateZ(${z}deg) translateZ(217px) `;
  }
  transform_() {
    var orient = camera.getOrientation();
    var pos = camera.getPosition();
    cameraElem.style.WebkitTransform =
      "rotateX(" +
      orient[0] +
      "deg) " +
      "rotateY(" +
      orient[1] +
      "deg) " +
      "rotateZ(" +
      orient[2] +
      "deg)";
    assemblyElem.style.WebkitTransform =
      "translate3d(" + -pos[0] + "px, " + -pos[1] + "px, " + -pos[2] + "px)";
  }

  render() {
    this.dirty_frames.forEach((frame) => {
      this.ctx.clearRect(frame.x, frame.y, frame.width, frame.height);
      this._drawBoard(frame);
    });
    this.dirty_frames = [];
    //this.dirty_frames = [{ x: 0, y: 0, width: 100, height: 100 }];
  }

  _drawImage(name, x, y, opts = { width: null, width: null }) {
    const img = this.asm.get(name);
    if (opts.frame) {
      const f = opts.frame;
      this.ctx.drawImage(
        img,
        f.x,
        f.y,
        f.width * (img.width / opts.width),
        f.height * (img.height / opts.height),
        f.x,
        f.y,
        f.width,
        f.height
      );
    } else {
      console.log(opts.width);
      this.ctx.drawImage(
        img,
        x,
        y,
        opts.width || img.width,
        opts.height || img.height
      );
    }
  }

  _drawBoard(frame = null) {
    this._drawImage("board", 0, 0, {
      width: this.width,
      height: this.height,
      frame: frame,
    });
  }

  tick = (elapsed) => {
    window.requestAnimationFrame(this.tick);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    if (this.dirty_frames.length) this.render();
  };
}

