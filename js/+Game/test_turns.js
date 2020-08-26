Game.prototype.testTurns = function () {
  console.log(this.allStates());
  console.log(this.transitions());
  let turn_test1 = [
    "startTurn",
    "rollDice",
    "diceResult",
    "movement",
    "encounter",
    "encounterDrawTile",
    "drawCard",
    "encounterCard",
    "missTurn",
  ];
  let turn_test2 = [
    "startTurn",
    "useEntity",
    "movement",
    "encounter",
    "encounterCharacter",
    "engageBattle",
    "battleWon",
    "lastTurn",
  ];

  let turns = turn_test2;
  for (let i in turns) {
    console.log(this.transitions());
    this[turns[i]]();
    console.log(this.state);
  }
};
