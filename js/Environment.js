function Environment(parent) {
  this.vars = Object.create(parent ? parent.vars : null);
  this.parent = parent;
}
Environment.prototype = {
  extend: function () {
    return new Environment(this);
  },
  lookup: function (name) {
    var prog = this;
    while (prog) {
      if (Object.prototype.hasOwnProperty.call(prog.vars, name)) return prog;
      prog = prog.parent;
    }
  },
  get: function (name) {
    if (name in this.vars) return this.vars[name];
    throw new Error("Undefined variable " + name);
  },
  set: function (name, value) {
    var prog = this.lookup(name);
    // let's not allow defining globals from a nested environment
    if (!prog && this.parent) throw new Error("Undefined variable " + name);
    return ((prog || this).vars[name] = value);
  },
  def: function (name, value) {
    return (this.vars[name] = value);
  },
};

function evaluate(exp, env) {
  switch (exp.type) {
    case "num":
    case "str":
    case "bool":
      return exp.value;

    case "var":
      return env.get(exp.value);

    case "assign":
      if (exp.left.type != "var")
        throw new Error("Cannot assign to " + JSON.stringify(exp.left));
      return env.set(exp.left.value, evaluate(exp.right, env));

    case "binary":
      return apply_op(
        exp.operator,
        evaluate(exp.left, env),
        evaluate(exp.right, env)
      );

    case "lambda":
      return make_lambda(env, exp);

    case "if":
      var cond = evaluate(exp.cond, env);
      if (cond !== false) return evaluate(exp.then, env);
      return exp.else ? evaluate(exp.else, env) : false;

    case "scope":
      var val = false;
      exp.scope.forEach(function (exp) {
        val = evaluate(exp, env);
      });
      return val;

    case "prog":
      var val = false;
      exp.prog.forEach(function (exp) {
        val = evaluate(exp, env);
      });
      return val;

    case "call":
      var func = evaluate(exp.func, env);
      return func.apply(
        null,
        exp.args.map(function (arg) {
          return evaluate(arg, env);
        })
      );

    default:
      throw new Error("I don't know how to evaluate " + exp.type);
  }
}

function apply_op(op, a, b) {
  function num(x) {
    if (typeof x != "number") throw new Error("Expected number but got " + x);
    return x;
  }
  function div(x) {
    if (num(x) == 0) throw new Error("Divide by zero");
    return x;
  }
  switch (op) {
    case "+":
      return num(a) + num(b);
    case "-":
      return num(a) - num(b);
    case "*":
      return num(a) * num(b);
    case "/":
      return num(a) / div(b);
    case "%":
      return num(a) % div(b);
    case "&&":
      return a !== false && b;
    case "||":
      return a !== false ? a : b;
    case "<":
      return num(a) < num(b);
    case ">":
      return num(a) > num(b);
    case "<=":
      return num(a) <= num(b);
    case ">=":
      return num(a) >= num(b);
    case "==":
      return a === b;
    case "!=":
      return a !== b;
  }
  throw new Error("Can't apply operator " + op);
}

function make_lambda(env, exp) {
  function lambda() {
    var names = exp.vars;
    var prog = env.extend();
    for (var i = 0; i < names.length; ++i)
      prog.def(names[i], i < arguments.length ? arguments[i] : false);
    return evaluate(exp.body, prog);
  }
  return lambda;
}
