//@depends Entity.js

gamestate = {
  decks: { adventure: [("Ogre", "Wolf")], spells: ["Random", "Destruction"] },
};

class Character extends Entity {
  constructor(name, health, strength, craft, fate, gold, items = []) {
    super();
    this.state = {
      name,
      health,
      strength,
      craft,
      fate,
      gold,

      items: items || new Array(),
      spells: new Array(),
      followers: new Array(),
    };
  }

  init() {
    this.onInit();
  }

  update() {
    this.onUpdate();
  }

  onInit() {}
  onUpdate() {
    console.log("Name: ", this.state.name);
  }

  drawCard(deck_name = "adventure", amount = 1) {
    this.onDrawCard(deck_name, amount);
  }

  drawMulligan(amount, deck_name, max = 1) {
    console.log(`Mulligan ${amount - 1}/${max}`);
  }

  drawSpell(deck_name) {
    this.onDrawSpell(deck_name);
  }

  onDrawCard(deck_name, amount) {}
  onDrawSpell() {}

  useSpell() {
    this.onUseSpell();
    // onUseSpellSucess
    // onUseSpellFailure
  }

  onCombat() {}
  onLoss() {}
  onWin() {}
  onTakeLife() {}

  drawSpell(amount = 1) {
    console.log("draw spell", amount);
    this.state.spells.push("Random");
  }
  spellCount() {
    return this.state.spells.length;
  }
}
