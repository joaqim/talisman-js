//@depends ../Character.js

class Prophetess extends Character {
  constructor() {
    super("Prophetess", 2, 4, 4, 2, "good");
    always_x_of_spells(this);
    may_mulligan_card(this);
  }
}
