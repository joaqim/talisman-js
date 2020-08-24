//@depends ../+Character/Character.js

class Prophetess extends Character {
  constructor() {
    super("Prophetess", 2, 4, 4, 2, "good");
    always_x_of_spells(this, { amount: 1 });
    may_mulligan_cards(this, { deck: "adventure", amount: 1 });
  }
}
