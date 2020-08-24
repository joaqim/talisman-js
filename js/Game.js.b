//@depends ./PubSub.js
//@depends ../node_modules/javascript-state-machine/dist/state-machine.js
//@depensd ./AssetsManager.js

class GameState extends StateMachine {
  turn = {
    mulligans: 0,
  };

  players = [p];
  player = p;
  ctx = document.getElementById("canvas").getContext("2d");
  am = new AssetsManager(cfg);

  constructor(cfg) {
    super(cfg.state);
    PubSub.enable(this);
    for (let index in cfg.events) {
      this.subscribe(index, cfg.events[index].action);
    }
  }

  testTurns() {
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
  }

  testPlayer() {
    this.startTurn();
    this.player.update(this);
    /*
    this.player.update(this);
    this.player.addEntity(Mule());
    this.player.addEntity(HorseAndCart());
    console.log(this.player.state.followers);
    console.log(this.player.state.carryLimit);
    this.player.discardEntity("mule", "follower");
    let dropped_horse = this.player.dropEntity("horse_and_cart", "follower");
    console.log(this.player.state.followers);
    console.log(this.player.state.carryLimit);
    this.player.addEntity(dropped_horse);
    console.log(this.player.state.followers);
    console.log(this.player.state.carryLimit);
    this.player.discardEntity("horse_and_cart", "follower");
    console.log(this.player.state.followers);
    console.log(this.player.state.carryLimit);
    */

    this.player.addEntity(RuneSword());
    let req = this.player.canUse("rune_sword", "item");
    console.log(req.val, req.text);
    let val = this.player.dropEntity("rune_sword", "item");
    if (val.val == false) console.log(val.text);

    this.player.addEntity(CrystalBall(this.player));
    this.player.drawCard({ game: this, deck: "adventure", amount: 1 });
  }
  testBattle() {
    this.player.battleWon(Wolf());
    console.log(this.player.state.trophies);
  }

  drawSpell(entity, amount) {
    if (!entity.hasMaxSpells()) {
      console.log(`${entity.state.name} draws ${amount} spell(s)`);
      entity.addSpell({ name: "random" });
    }
  }

  drawImage(name, x, y, opts = {}) {
    const img = this.am.get(name);
    if (opts.x) this.ctx.drawImage(img, x, y, opts.x, opts.y);
    else if (opts.scale)
      this.ctx.drawImage(
        img,
        x,
        y,
        img.width * opts.scale,
        img.height * opts.scale
      );
    else this.ctx.drawImage(img, x, y);
  }

  start() {
    console.log();
    this.drawImage("board", 0, 0, { scale: 0.2 });
  }
}

//game = new Game(cfg);
//game.testPlayer();
//game.testBattle();
/*
var timer = setInterval(function () {
  game.update();
}, 1000 / 3);
*/

//window.onload = function () {
//game = new GameState(cfg);
//game = new Game();
//game.start();
//};
