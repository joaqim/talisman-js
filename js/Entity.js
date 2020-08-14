class Entity {
  constructor(name, type, modifiers = [], modArgs = []) {
    this.state = {
      name: name,
      type: type,
      requirement_text: { use: "", pickup: "" },
      modifiers: modifiers,
      modArgs: modArgs,
    };
  }

  update() {}
  equipped(owner) {
    console.log(
      `${owner.state.name} equipped ${this.state.name} for the current battle.`
    );
    return true;
  }

  onBattleSuccess(owner, target) {
    console.log(
      `${owner.state.name} used ${this.state.name} against ${target.state.name} in battle and won`
    );
  }

  added(owner) {
    this.state.owner = owner;
    this.state.modifiers.forEach((modFn, i) => {
      if (this.state.modArgs.length >= i) {
        modFn(this, this.state.modArgs[i]);
      } else modFn(this);
    });
  }
  removed() {
    this.state.owner = null;
  }
  use(owner, target = null) {
    console.log`${owner.state.name} used ${this.state.name}`;
  }

  requirementUse(owner) {
    return true;
  }
  requirementPickup(owner) {
    return true;
  }
}
