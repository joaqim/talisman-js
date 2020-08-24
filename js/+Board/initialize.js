Board.prototype.initialize = function () {
  let img = this.asm.get("100x100");

  img.id = "character-token";
  img.style.left = `${-img.width * 2.5 * (this.width / 4581)}px`; // -63.5px
  img.style.top = `${img.height * 4 * (this.height / 3026)}px`; // 100px

  //for (i in this.tiles) this.tiles[i].id = Number(i);
  //console.log(JSON.stringify(this.tiles));

  for (var i = 1; i < 50; i++) {
    let tileBtn = document.createElement("img");
    tileBtn.src = img.src;
    tileBtn.index = i;
    tileBtn.id = "tile-button";
    tileBtn.style.left = "-50px"; //`${-img.width * 2.5 * (this.width / 4581)}px`; // -63.5px
    tileBtn.style.top = "+150px"; // `${img.height * 4 * (this.height / 3026)}px`; // 100px
    this.el.appendChild(tileBtn);
    this.moveToTile(tileBtn, i);
    tileBtn.onclick = () => this._tilePressed(tileBtn.index);
    this.tiles[i].el = tileBtn;
  }
};
