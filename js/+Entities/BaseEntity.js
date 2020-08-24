//@depends ./Atom.js
class BaseEntity extends Atom {
  constructor(name, real_name, type, category, mods = [], args = []) {
    super();
    this.state = { name, real_name, type, category };
    for (let i in mods) mods[i](this, args[i]);
  }
}
