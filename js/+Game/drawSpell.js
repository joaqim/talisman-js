//@depends ./Game.js
Game.prototype.drawSpell = function (entity, amount) {
  if (entity.hasMaxSpells() || amount <= 0) {
    console.log(`${entity.state.name} did not draw a/any spell(s)`);
    return false;
  }
  console.log(`${entity.state.name} draws ${amount} spell(s)`);
  entity.addSpell({ name: "random" });
  return true;
};
