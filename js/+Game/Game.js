//@depends ../PubSub.js
//@depends ../node_modules/javascript-state-machine/dist/state-machine.js
//@depensd ../AssetsManager.js

class GameState extends StateMachine {
  ctx = document.getElementById("canvas").getContext("2d");
  am = new AssetsManager(cfg);

  constructor(cfg) {
    super(cfg.state);
    PubSub.enable(this);
    for (let index in cfg.events) {
      this.subscribe(index, cfg.events[index].action);
    }
  }
}

window.onload = function () {};
