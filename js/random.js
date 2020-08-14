const SIDES = 6;

function rollDice(x, sides = SIDES) {
  var value = 0;
  for (i = 1; i <= x; i++) {
    value += Math.floor(Math.random() * sides + 1);
  }
  return value;
}
const d3d6 = () => rollDice(3, 6);

function skillCheck(skill, dice = 2) {
  return skill.value - rollDice(dice);
}
