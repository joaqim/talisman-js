function Board(asm) {
  this.asm = asm;
  this.el = document.getElementById("board-wrapper");
  this.ctx = document.getElementById("board").getContext("2d");
  this.width = 969;
  this.height = 640;
  this.tiles = talisman.talisman_board;
  this.dirty_frames = [{ x: 0, y: 0, width: this.width, height: this.height }];
}
