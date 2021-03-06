// @depends ./Entity.js;
// @depends ./Character.js;
// @depends ./Game.js

window.onload = function () {
  var context = document.getElementById("demo").getContext("2d");
  var game = new Game();
  game.run(context);
};

var p = new Prophetess();

var hobo = new Character("Hobo", 0, 10, 0, 0, "evil");
//hobo.addItem(spell_book());
//hobo.drawSpells(9);
//hobo.update();

p.update();
p.addItem(crystal_ball());
p.update();
var rune = rune_sword();
hobo.addItem(rune);
hobo.equip(rune);
hobo.onBattleSuccess(p);

/*
var hobo2 = new Character("Hobo2", 0, 10, 0, 0, "evil");
var sw = rune_sword();

weapon_lifesteal(sw, 1);
required_alignment_to_use(sw, "evil");

hobo2.equip(sw);
hobo2.onBattleSuccess(p);
*/

/*

var spell_book = new Entity("spell_book", "magical_item");
always_one_spell(spell_book);

var spell_book = new Entity("spell_book", "magical_item");
always_one_spell(spell_book);

var crystal_ball = new Entity("crystal_ball", "magical_item");
may_discard_first_drawn_adventure_card(crystal_ball);

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
if (!p.useSpell("Random")) console.log("can't cast another spell this turn");
p.endTurn();
p.update();
p.startTurn();
p.addItem(holy_grail);

p.addItem(rune_sword);
p.useItem(rune_sword);

p.addItem(crystal_ball);
p.update();
//p.addItem(mule);
//p.removeItem(mule);
//p.addItem(horse_and_carts);
//p.removeItem(horse_and_carts);

p.update();

p.drawCard();

console.log(p.state.carryLimit);
*/
