// @depends ../Entity.js

const crystal_ball = () =>
  new Entity("crystal_ball", "magical_item", [
    may_discard_first_drawn_adventure_card,
  ]);

const spell_book = () =>
  new Entity("spell_book", "magical_item", [always_one_spell]);

const rune_sword = () =>
  new Entity(
    "rune_sword",
    "magical_weapon",
    [required_alignment_to_use, weapon_lifesteal],
    ["evil", 1]
  );

const holy_grail = () =>
  new Entity(
    "holy_grail",
    "magical_item",
    [required_alignment_to_use],
    ["good"]
  );
