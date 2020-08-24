class Atom {
  constructor() {}

  init(game) {
    this.onInit(game);
  }

  update(game) {
    this.onUpdate(game);
  }

  onInit(game) {}
  onUpdate(game) {}
}
