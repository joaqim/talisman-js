function Environment(owner) {
  this.owner = owner;
  this.vars = Object.create(owner ? owner.vars : null);
  //this.vars = owner ? owner.vars : Object.create(null);
  //this.vars = owner ? owner.vars : new Map();

  this.scopes = new Map();
  this.scope_saved = null;
}

Environment.prototype = {
  extend: function () {
    return new Environment(this);
  },
  add_scope: function (name) {
    return (this.scopes[name] = this.extend());
  },
  set_scope: function (name, value) {
    return (this.scopes[name] = value);
  },
  get_scope: function (name) {
    return this.scopes[name] || null;
  },
  save_scope: function (name) {
    this.scope_saved = this.scopes[name];
  },
  lookup_scope: function (name) {
    var env = this;
    while (env) {
      if (Object.prototype.hasOwnProperty.call(env.scopes, name))
        return env.scopes;
      env = env.owner;
    }
  },
  lookup: function (name) {
    var scope = this;
    while (scope) {
      if (Object.prototype.hasOwnProperty.call(scope.vars, name)) return scope;
      scope = scope.owner;
    }
  },
  get_from_scope: function (name, scope_name) {
    //return this.lookup(name);
    if (scope_name in this.scopes) return this.scopes[scope_name].get(name);
    throw new Error("Scope not found for scope: " + scope_name + " : " + name);
  },
  get: function (name) {
    if (name in this.vars) return this.vars[name];
    throw new Error("Undefined variable " + name);
  },
  set: function (name, value) {
    var scope = this.lookup(name);
    if (!scope) return this.def(name, value);
    //throw new Error("Undefined variable " + name);
    return ((scope || this).vars[name] = value);
  },
  def: function (name, value) {
    return (this.vars[name] = value);
  },
};
