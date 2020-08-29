//@depends ./BaseEntity.js

class Entity extends BaseEntity {
  constructor(name, real_name, type, sub_type, mods = [], args = []) {
    super(name, real_name, type, sub_type, mods, args);
  }
  canHold() {
    return true;
  }

  canUse() {
    return true;
  }

  use() {
    this.onUse();
    return true;
  }

  added(owner) {
    this.onAdded(owner);
    return true;
  }
  removed(owner) {
    return this.onRemoved(owner);
  }
  used(owner, target = null) {
    this.onUsed(owner, target);
    return { val: true };
  }
  canDrop(owner) {
    return this.onCanDrop();
  }
  onCanDrop() {
    return true;
  }
  onAdded(owner) {
    return { val: true };
  }
  onRemoved(owner) {
    return true;
  }
  onUse(owner, target) {
    return true;
  }

  reqUse(owner, target = null) {
    return this.onReqUse(owner, target);
  }
  reqAdd(owner) {
    return this.onReqAdd(owner);
  }

  onReqUse(owner, target = null) {
    return { val: true };
  }
  onReqUse(owner) {
    return { val: true };
  }
}
