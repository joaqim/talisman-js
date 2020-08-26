//@depends ../PubSub.js
//@depends ../../node_modules/javascript-state-machine/dist/state-machine.js
//@depensd ./game_cfg.js

class Game extends StateMachine {
  constructor(cfg, asm) {
    console.log(cfg.state);
    super(cfg.state);
    this.asm = asm;
    PubSub.enable(this);
    for (let index in cfg.events) {
      this.subscribe(index, cfg.events[index].action);
    }
  }
}
