function drawSpell(character) {
  if (!character.hasMaxSpells()) {
    character.addSpell("a new spell");
  } else
    console.log(`${character.state.name} cannot draw a Spell: has max spells!`);
}

function castSpell(character, spellName, target = null) {
  character.state.spells.pop();
  console.log(`${character.state.name} casts spell: ${spellName}!`);
  return true;
}
