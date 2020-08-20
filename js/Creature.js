// @depends ./BaseEntity.js

class Creature extends BaseEntity {
  constructor(name, real_name, type, category, strength, craft, mods = [], args = []) {
    super(name, real_name, type, category, mods, args)
    this.value = {
      type: strength ? "strength" : "craft",
      value: strength ? strength : craft,
    }
  }
  defeated(by) {
    by.addTrophy(this);
    this.onDefeated(by)
  }
  onDefeated(by) {
  }
}
