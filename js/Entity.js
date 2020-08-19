//@depends ./Atom.js
// Object or Follower ( probably will extend )
class Entity extends Atom {
  constructor() {
    super();
  }

  init() {
    this.onInit();
  }

  update() {
    this.onUpdate();
  }

  canHold() {
    return true;
  }

  canUse() {
    return true;
  }

  use() {
    return this.onUse();
  }

  discard() {
    onDiscard();
  }
  onDiscard() {}

  onUseSpell() {}
  onUseSpellSuccess() {}
  onUseSpellFailure() {}

  onInit() {}
  onUpdate() {}
  onUse() {}
}
