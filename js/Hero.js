// @depends ./AssetLoader.js

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

