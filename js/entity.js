class Entity {
  constructor(name, type, owner = null) {
    this.state = {
      name: name,
      type: type,
      owner: owner,
      requirement_text: { use: "", pickup: "" },
    };
  }
  update() {}
  added(owner) {
    this.state.owner = owner;
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
