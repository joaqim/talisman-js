// @depends ./entity.js;
// @depends ./character.js;
// @depends ./spells.js;
// @depends ./modifiers.js
// @depends ./logic-grid.js

window.onload = function () {
  var context = document.getElementById("demo").getContext("2d");
  Game.run(context);
};

class Prophetess extends Character {
  constructor() {
    super("Prophetess", 2, 4, 4, 2, "good");
    always_one_spell(this);
    may_discard_first_drawn_adventure_card(this);
  }
}

var p = new Prophetess();
p.update();

var crystal_ball = new Entity("crystal_ball", "magical_item");
always_one_spell(crystal_ball);

var mule = new Entity("mule", "follower");
carry_limit_increase(mule, 4);

var horse_and_carts = new Entity("horse_and_carts", "follower");
carry_limit_increase(horse_and_carts, 8);

var holy_grail = new Entity("holy_grail", "magical_item");
required_alignment_to_pickup(holy_grail, "good");

var rune_sword = new Entity("rune_sword", "magical_weapon");
required_alignment_to_use_NOT(rune_sword, "good");

p.useSpell("Random");
p.update();
p.addItem(holy_grail);

p.addItem(rune_sword);
p.useItem(rune_sword);

p.addItem(crystal_ball);
p.update();
p.addItem(mule);
//p.removeItem(mule);
//p.addItem(horse_and_carts);
//p.removeItem(horse_and_carts);

p.update();

p.drawCard();

console.log(p.state.carryLimit);
