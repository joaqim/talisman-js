//@depends ./BaseEntity.js

class Enemy extends BaseEntity {
  constructor(
    name,
    real_name,
    type,
    sub_type,
    encounter,
    val = { strength: null, craft: null },
    mods = [],
    args = []
  ) {
    super(name, real_name, type, sub_type, mods, args);
    this.state.encounter = encounter;
    this.state.val = val;
  }
}
