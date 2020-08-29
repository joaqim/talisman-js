//@depends ./Atom.js
class BaseEntity extends Atom {
  constructor(name, real_name, type, sub_type, mods = [], args = []) {
    super();
    this.state = { name, real_name, type, sub_type };
    for (let i in mods) mods[i](this, args[i]);
  }
}
