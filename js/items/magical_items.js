// @depends ../+Entities/Object.js
const RuneSword = () =>
  new Object(
    "rune_sword",
    "Rune sword",
    "item",
    "Magical Item",
    [required_alignment_to_use],
    [{ alignment: "evil" }]
  );

//TODO: Can be used onCardDraw for owner
const CrystalBall = () =>
  new Object(
    "crystal_ball",
    "Crystal Ball",
    "item",
    "Magical Item"
    /*
    [may_mulligan_cards],
    [{ deck: "adventure", amount: 1 }]
    */
  );
/*
class CrystalBall extends Entity {
  constructor(owner) {
    //super("crystal_ball", "Crystal Ball", "item", "Magical Item");
    //may_mulligan_cards(owner, { amount: 1 });
  }
}
*/

const spell_book = () =>
  new Object("spell_book", "magical_item", [always_one_spell]);

const rune_sword = () =>
  new Object(
    "rune_sword",
    "magical_weapon",
    [required_alignment_to_use, weapon_lifesteal],
    [{ alignment: "evil" }, { amount: 1 }]
  );

const holy_grail = () =>
  new Object(
    "holy_grail",
    "magical_item",
    [required_alignment_to_use],
    [{ alignment: "good" }]
  );
