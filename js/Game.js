//@depends PubSub.js

var Game = function() {
	gamestate = {

  };
	return {
		init: function(){
      PubSub(this);
    }
	};
}

game = Game();
