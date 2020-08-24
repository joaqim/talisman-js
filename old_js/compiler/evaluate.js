function evaluate(exp, env, callback) {
  switch (exp.type) {
    case "scope":
      scope_name = exp.names[0] ? exp.names[0] : "character";
      scope_names = exp.names.length > 0 ? exp.names : "global";

      console.log("SCOPE", scope_name);
      var new_env = env.add_scope(scope_name);

      //console.log(JSON.stringify(exp, null, 2));
      //console.log(JSON.stringify(new_env,(key,value) => {if (/owner|scope_saved/.test(key))  return "[.]"; else return value;} ,2));

      (function loop(last, i) {
        if (i < exp.value.length) {
          console.log(exp.value[i]);
          evaluate(exp.value[i], new_env, function (val) {
            loop(val, i + 1);
          });
        } else {
          console.log("SCOPE_END", scope_name);
          console.log(
            JSON.stringify(
              new_env.vars,
              (key, value) => {
                if (/owner|scope_saved/.test(key)) return "[.]";
                else return value;
              },
              2
            )
          );
          console.log("Last", last);
          callback(last);
        }
        return;
      })(false, 0);
      //console.log("child", env.child.vars);

      //if (env.vars == env.child.vars)
      //throw new Error(`Assert child vars are unchanged after scope`);
      return;
    case "scope_kw":
      env.scope_saved = exp.vars.value;
      callback(env.set_scope(env.owner.get_scope(exp.vars.value)));
      return;
    case "limit":
      return;
    case "trigger":
      return;
    case "effect":
      return;
    case "allow":
      return;
    case "num":
    case "str":
    case "bool":
      callback(exp.value);
      return;
    case "var":
      //TODO: global should just be null
      if (exp.scope && exp.scope != "global") {
        callback(env.get_from_scope(exp.value, exp.scope));
      } else {
        callback(env.get(exp.value));
      }
      return;
    case "assign":
      //console.log(env);
      if (exp.left.type == "var") {
        evaluate(exp.right, env, function (right) {
          callback(env.set(exp.left.value, right));
        });
      } else if (exp.left.type == "var_sc") {
        if (env.child === undefined)
          throw new Error(`env.child is undefined for var ${exp.left.value}`);
        evaluate(exp.right, env.child, function (right) {
          callback(env.child.set(exp.left.value, right));
        });
      } else {
        throw new Error("Cannot assign to " + JSON.stringify(exp.left));
      }
      return;
    case "binary":
      evaluate(exp.left, env, function (left) {
        evaluate(exp.right, env, function (right) {
          callback(apply_op(exp.operator, left, right));
        });
      });
      return;
    case "let":
      (function loop(env, i) {
        if (i < exp.vars.length) {
          var v = exp.vars[i];
          if (v.def)
            evaluate(v.def, env, function (value) {
              var scope = env.extend();
              scope.def(v.name, value);
              loop(scope, i + 1);
            });
          else {
            var scope = env.extend();
            scope.def(v.name, false);
            loop(scope, i + 1);
          }
        } else {
          evaluate(exp.body, env, callback);
        }
      })(env, 0);
      return;
    case "lambda":
      callback(make_lambda(env, exp));
      return;
    case "if":
      evaluate(exp.cond, env, function (cond) {
        if (cond !== false) evaluate(exp.then, env, callback);
        else if (exp.else) evaluate(exp.else, env, callback);
        else callback(false);
      });
      return;
    case "prog":
      (function loop(last, i) {
        if (i < exp.prog.length)
          evaluate(exp.prog[i], env, function (val) {
            loop(val, i + 1);
          });
        else {
          callback(last);
        }
      })(false, 0);
      return;
    case "call":
      evaluate(exp.func, env, function (func) {
        (function loop(args, i) {
          if (i < exp.args.length)
            evaluate(exp.args[i], env, function (arg) {
              args[i + 1] = arg;
              loop(args, i + 1);
            });
          else {
            func.apply(null, args);
          }
        })([callback], 0);
      });
      return;
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
    var scope = env.extend();
    for (var i = 0; i < names.length; ++i)
      scope.def(names[i], i < arguments.length ? arguments[i] : false);
    return evaluate(exp.body, scope);
  }
  return lambda;
}
