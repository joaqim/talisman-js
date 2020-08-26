//@depends ./AssetsManager.js
//@depends ./game_cfg.js

class GameOld {
  constructor() {
    this.boardEl = document.getElementById("board-wrapper");
    this.ctx = document.getElementById("board").getContext("2d");
    this.asm = new AssetsManager(cfg);
    this.width = 969;
    this.height = 640;
    //    this.width = 4581;
    //this.height = 3026;
    this.dirty_frames = [
      { x: 0, y: 0, width: this.width, height: this.height },
    ];
    this.mousedown = false;

    //document.addEventListener("mousedown", this.initMouseMove);
    //document.addEventListener("mousemove", this.mouseMove);
    //document.addEventListener("mouseup", this.stopMouseMove);
  }
  // Initialize the movement
  //
  initMouseMove(evt) {
    this.mousedown = true;
    this.mx = evt.clientX;
    this.my = evt.clientY;
  }
  rotate(M, center, theta, phi) {
    // Rotation matrix coefficients
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var cp = Math.cos(phi);
    var sp = Math.sin(phi);

    // Rotation
    var x = M.x - center.x;
    var y = M.y - center.y;
    var z = M.z - center.z;

    M.x = ct * x - st * cp * y + st * sp * z + center.x;
    M.y = st * x + ct * cp * y - ct * sp * z + center.y;
    M.z = sp * y + cp * z + center.z;
  }
  mouseMove(evt) {
    if (this.mousedown) {
      console.log(dx, dy);
      var dx = ((evt.clientX / 1000) * 180) / Math.PI;
      var dy = ((evt.clientY / 1000) * 180) / Math.PI;

      console.log(dx, dy);
      /*
      var theta = ((evt.clientX - this.mx) * Math.PI) / 360;
      var phi = ((evt.clientY - this.my) * Math.PI) / 180;

      var ct = Math.cos(theta);
      var st = Math.sin(theta);
      var cp = Math.cos(phi);
      var sp = Math.sin(phi);

      console.log(ct, st, cp, sp);
      let box..x = ct - st * cp + st * sp;
      */

      document.getElementById("board-wrapper").style.WebkitTransform = `
    perspective(2040px)
    rotateX(${dx}deg)
    rotateY(${dx}deg)
    translateZ(217px)
    `;

      //this.boardEl.WebkitTransform = "rotateX(-20deg)";
      this.mx = evt.clientX;
      this.my = evt.clientY;
    }
  }

  stopMouseMove() {
    this.mousedown = false;
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
    //this.transformBoard(35, 120);
    /*
    this.transformBoard(5, 0, 0, -20, {
      x: (-this.width / 2) * 2.3,
      y: (-this.height / 2) * 4.3,
    });
    */
    var img = this.asm.get("prophetess");
    img.id = "character-token";
    // Important to do for centering? voodoo magic
    img.style.left = `${-img.width * 2.5 * (this.width / 4581)}px`; // -63.5px
    img.style.top = `${img.height * 4 * (this.height / 3026)}px`; // 100px
    //console.log(img.style.left, img.style.top);

    document.getElementById("board-wrapper").appendChild(img);
    this.loopTiles(img);

    img = this.asm.get("100x100");
    img.id = "character-token";
    img.style.left = `${-img.width * 2.5 * (this.width / 4581)}px`; // -63.5px
    img.style.top = `${img.height * 4 * (this.height / 3026)}px`; // 100px

    for (var i = 1; i < 50; i++) {
      let tileBtn = document.createElement("img");
      tileBtn.src = img.src;
      tileBtn.id = "tile-button";
      tileBtn.style.left = "-50px"; //`${-img.width * 2.5 * (this.width / 4581)}px`; // -63.5px
      tileBtn.style.top = "+150px"; // `${img.height * 4 * (this.height / 3026)}px`; // 100px
      this.boardEl.appendChild(tileBtn);
      this.moveToTile(tileBtn, i);
    }

    var dice = document.getElementById("dice");
    this.spinDice(dice);
  }

  async spinDice(dice) {
    let z = 0;
    let x = 0;
    let y = 117;
    while (true) {
      x += 86;
      z += 36;
      y += 10;
      z = z % 360;
      x = x % 360;
      y = y % 117;
      dice.style.WebkitTransform = `rotateX(${x}deg)rotateZ(${z}deg) translateZ(${y}px)`;
      await this.timeout(1500);
    }
  }

  async loopTiles(el) {
    for (var i = 1; i < 50; i++) {
      this.moveToTile(el, i);
      //this.zoomToTile(el, i);
      await this.timeout(500);
    }
  }

  moveToTile(el, index) {
    this.moveToTileAtPos(
      el,
      talisman.talisman_board[index].center.x,
      talisman.talisman_board[index].center.y
    );
  }

  zoomToTile(el, index) {
    let rot = 90;
    if (index < 7 || (index > 25 && index < 29) || (index > 45 && index < 48)) {
      rot = 180;
    } else if (index < 13 || (index < 33 && index > 29)) {
      rot = 90;
    } else if (index < 19 || (index < 37 && index > 33)) {
      rot = 0;
    } else if (index < 24 || (index < 40 && index > 36)) {
      rot = -90;
    }
    this.transformBoard(35, rot, 0, 0);
  }

  moveToTileAtPos(el, x, y) {
    //this.move(el, -el.width / 2, el.height * 1.115);
    this.move(el, x * (this.width / 4581), y * (this.height / 3026));
    //el.style.left = `${x * (969 / 4581)}px`;
    //el.style.top = `${(y - 30) * (640 / 3026)}px`;
  }

  transform(elem, x, z, move = { x: 0, y: 0 }) {
    var rotate = -90;

    elem.style.WebkitTransform = `
    perspective(2040px)
    rotateX(${x}deg)
    rotateZ(${z}deg)
    rotate(${rotate}deg)
    translateZ(217px)
    translate3d(${move.x}px, ${move.y}px, 10px)
    `;
  }

  move(elem, x, y) {
    //elem.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;
    elem.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;

    elem.style.WebkitTransform += `rotateX(5deg)`;
  }
  /*
  transform(elem, x, z) {
    elem.style.WebkitTransform = `perspective(2040px) rotateX(${x}deg) rotateZ(${z}deg) translateZ(217px) `;
  }
  */

  moveBoard(x, y) {
    this.boardEl.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0px)`;
  }
  update(delta) {}

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  transformBoard(x, z, y, zoom = 1.0, move = { x: 0, y: 0 }) {
    this.boardEl.style.WebkitTransform = `perspective(2040px) rotateX(${x}deg) rotateZ(${z}deg) rotateY(${y}deg) translateZ(${
      217 * zoom
    }px) `;
    this.boardEl.style.WebkitTransform += `translate3d(${move.x}px, ${
      move.y
    }px, ${0}px)`;
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
