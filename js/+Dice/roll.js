Dice.prototype.roll = function (numDice = 1) {
  var result = numDice;
  for (let i = 0; i < numDic; i++) result += Math.floor(Math.random() * 6);
  return result;
};
