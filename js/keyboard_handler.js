keycodes = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };

class Keyboard {
  constructor() {
    this.state = {
      _keys: {},
    };
  }
  listenForEvents(keys) {
    window.addEventListener("keydown", this._onKeyDown.bind(this));
    window.addEventListener("keyup", this._onKeyUp.bind(this));

    keys.forEach(
      function (key) {
        this.state._keys[key] = false;
      }.bind(this)
    );
  }
  _onKeyDown(event) {
    var keyCode = event.keyCode;
    if (keyCode in this.state._keys) {
      event.preventDefault();
      this.state._keys[keyCode] = true;
    }
  }

  _onKeyUp(event) {
    var keyCode = event.keyCode;
    if (keyCode in this.state._keys) {
      event.preventDefault();
      this.state._keys[keyCode] = false;
    }
  }

  isDown(keyCode) {
    if (!keyCode in this.state._keys) {
      throw new Error("Keycode " + keyCode + " is not being listened to");
    }
    return this.state._keys[keyCode];
  }
}
