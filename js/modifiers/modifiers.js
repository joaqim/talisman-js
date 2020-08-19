//@depends ../Character.js

function add_mod(entity, func_name, callback, replace = false) {
  let Fn = entity[func_name].bind(entity);
  entity[func_name] = (target) => {
    if (!replace) Fn();
    callback(target);
  };
}
function always_x_of_spells(entity, amount = 1) {
  add_mod(entity, "onUpdate", () => {
    if (entity.spellCount() < 1) entity.drawSpell(amount);
  });
}

// max signifies the amount of cards you can mulligan per draw
// not used until I up the draw for drawMulligan($1)
function may_mulligan_card(entity, deck = "adventure", max = 1) {
  add_mod(entity, "onDrawCard", (deck_name, amount = 1) => {
    //TODO: amount is undefined as default
    if (deck_name == deck)
      for (let i = 0; i < amount; i++) entity.drawMulligan(1, deck_name, max);
  });
}
