Board.prototype.render = function () {
  this.dirty_frames.forEach((frame) => {
    this.ctx.clearRect(frame.x, frame.y, frame.width, frame.height);
    this._drawBoard(frame);
  });
  this.dirty_frames = [];
};

Board.prototype._drawImage = function(name, x, y, opts = { width: null, width: null }) {
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
};

Board.prototype._drawBoard = function(frame = null) {
  this._drawImage("board", 0, 0, {
    width: this.width,
    height: this.height,
    frame: frame,
  });
};
