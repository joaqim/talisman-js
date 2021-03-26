//@depends ./+Game/Game.js
//@depends ./AssetsManager.js

//@depends ./+Game/game_cfg.js
//@depends ./assets_cfg.js

//@depends ./characters/characters.js

window.onload = function () {
  game = new Game(game_cfg, assets_cfg);
  game.testTurns();

  proph = new Prophetess();
  proph.onUpdate(game);
};
