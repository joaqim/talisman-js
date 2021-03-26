//@depends ../+Character/Character.js
// Name, Health, Strength, Craft, Fate, Alignment, Start, Gold=2?, [items] , [followers]

class Prophetess extends Character {
  constructor() {
    super("Prophetess", 4, 2, 4, 2, "good", "chapel");
    always_x_of_spells(this); // defaults to 1 spell
    may_mulligan_cards(this, { deckName: "adventure", amount: 1 });
  }
}
class Wizard extends Character {
  constructor() {
    super("Wizard", 4, 2, 5, 3, "evil", "graveyard");
    start_with_x_spells(this, { amount: 2 });
    always_x_of_spells(this);
    may_attack_with_psychic(this);
  }
}
