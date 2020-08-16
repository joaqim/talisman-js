// @depends ../Character.js

class Prophetess extends Character {
  constructor() {
    super("Prophetess", 2, 4, 4, 2, "good");
    always_one_spell(this);
    may_discard_first_drawn_adventure_card(this);
  }
}
