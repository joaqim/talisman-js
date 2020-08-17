//@depends ./Stack.js
//@depends ./constants.js
//@depends ./InputStream.js
//@depends ./TokenStream.js
//@depends ./parser.js
//@depends ./Environment.js

class GameDummy {
  constructor() {
    this.vars = {
      strength: 2,
    };
  }

  get_var(variable) {
    return this.vars[variable];
  }
  set_var(variable, value) {
    this.vars[variable] = value;
  }
}
game = new GameDummy();

class VM extends Stack {
  constructor() {
    super(1024);
    this.vars = [];
    this.labels = [];
    this.calls = new Stack(128);

    this.scopes = new Stack(128);

    this.heap = [];
  }

  compile(txt) {
    var inputStream = InputStream(txt);
    var tokenStream = TokenStream(inputStream);
    var ast = parse(tokenStream);
    console.log(ast.prog);
    return;
    var globalEnv = new Environment();
    globalEnv.def("print", (txt) => console.log(txt));
    evaluate(ast, globalEnv);
  }

  execute(ops) {
    //for (let i in ops) {
    var ip = 0;
    this.stack = new Stack(this.memSize);

    while (ip < ops.length) {
      var op_args = ops[ip++];
      const op = op_args.shift();
      const args = op_args[0];
      //op = ops[ip++];

      if (this.isNumeric(op)) {
        this.push(op);
        continue;
      }

      var match = null;

      match = op.match(/^jmp\((.+)\)$/);
      if (match) {
        ip = this.labels[match[1]];
        continue;
      }
      match = op.match(/^jump\((.+)\)$/);
      if (match) {
        ip = this.labels[match[1]];
        continue;
      }
      match = op.match(/^jz\((.+)\)$/);
      if (match) {
        if (this.pop() == 0) ip = this.labels[match[1]];
        continue;
      }

      match = op.match(/^call\((.+)\)$/);
      if (match) {
        this.calls.push(ip);
        this.calls.push(this.vars);
        this.vars = [];
        ip = this.labels[match[1]];
        continue;
      }

      match = op.match(/^!var\((.+)\)$/);
      if (match) {
        this.vars[match[1]] = this.pop();
        continue;
      }

      match = op.match(/^var\((.+)\)$/);
      if (match) {
        this.push(this.vars[match[1]]);
        continue;
      }

      match = op.match(/^label\((.+)\)$/);
      if (match) continue;

      match = op.match(/^\*\((.+)\)$/);
      if (match) {
        if (this.vars[match[1]] == undefined) {
          throw new Error(
            `Tried to get reference to a variable that doesn't exist: ${match[1]}`
          );
        }
        this.push(match[1]);
        continue;
      }

      match = op.match(/^"(.+)"$/);
      if (match) {
        continue;
      }

      /*
       * Game scripting specific:
       */

      match = op.match(/^limit\((.+)\)$/);
      if (match) {
        continue;
      }
      match = op.match(/^allow\((.+)\)$/);
      if (match) {
        continue;
      }
      match = op.match(/^effect\((.+)\)$/);
      if (match) {
        continue;
      }

      match = op.match(/^:get_var\((.+)\)$/);
      if (match) {
        this.push(game.get_var(match[1]));
        continue;
      }
      match = op.match(/^:set_var\((.+)\)$/);
      if (match) {
        game.set_var(match[1], this.pop());
        continue;
      }

      // Set current scope
      match = op.match(/^scope\((.+)\)$/);
      if (match) {
        this.scopes.push(match[1]);
        continue;
      }

      // Store scope
      match = op.match(/^!scope\((.+)\)$/);
      if (match) {
        this.scopes.push(match[1]);
        continue;
      }

      // Use stored scope
      match = op.match(/^(.+):(.+)$/);
      if (match) {
        console.log(`${match[1]}:${match[2]}`);
        this.scopes.push(match[1]);
        continue;
      }

      var a, b, c, val, addr;
      switch (op) {
        case "store":
          [val, addr] = args;
          console.log(val, addr);
          this.heap[addr] = val;
          break;
        case "load":
          [addr] = args;
          this.push(heap[addr]);
          break;
        case "add":
          [a, b, c] = args;
          this.heap[c] = +this.heap[a] + +this.heap[b];
          break;
        case "print_num":
          [addr] = args;
          console.log(this.heap[addr]);
          break;
        case "print_char":
          [addr] = args;
          console.log(args);
          console.log(String.fromCharCode(this.heap[addr]));
          break;
        case "jump":
          [ip] = args;
          break;
        case "jumpz":
          [cond_addr, op_addr] = args;
          if (this.heap[cond_addr] == 0) ip = op_addr;
          break;
        case "{":
          break;
        case "}":
          break;
        case "dup":
          break;
        case "ret":
          break;
        case ".num":
          break;
        case ".":
          break;
        default:
          throw new Error(`Invalid operation: ${op}`);
      }
    }

    return this.top();
  }

  preprocess(txt) {
    //txt = txt.trim(/^\n$/); // remove empty lines
    txt = txt.replace(/^(.*)#.*$/gm, "$1"); // remove comments
    txt = txt.replace(/([\S|.])([{|}])([\S]?)/g, "$1 $2 $3"); // add space after and before brackets
    txt = txt.replace(/([\S|.])([{|}])([\S]?)/g, "$1 $2 $3");

    txt = txt.trim(/^\n$/); // remove empty lines

    //let lines = txt.split(/^\n$|\n\r|\s+/);
    let lines = txt.split("\n");

    shunting_yard(lines).toArray();

    let instructions = [];
    let match = null;
    for (let i in lines) {
      let inst = lines[i].split(" ");
      let token = inst[0];

      if (this.isNumeric(token)) {
        instructions.push(parseInt(token, 10));
        continue;
      }
      match = token.match(/^label\((.+)\)$/);
      if (match) {
        this.labels[match[1]] = i;
        continue;
      }
      instructions.push([inst.shift(), inst]);
      //instructions[inst[0]] = inst[];
    }
    //console.log(this.labels);
    return instructions;
  }

  isNumeric(value) {
    //return /^\d+$/.test(value); // Any value that consists of only digits
    return /^\d+?$/.test(value); // Any value that begins with a digit
  }

  interpret(bytecode, size = null) {
    if (size === null) size = bytecode.length;
    for (var i = 0; i < size; i++) {
      let instruction = bytecode[i];
      console.log(`${instruction}`);
      let a, b;
      switch (instruction) {
        case INST.LITERAL:
          this.push(bytecode[++i]);
          break;
        case INST.ADD:
          a = this.pop();
          b = this.pop();
          this.push(a + b);
          break;
        case INST.DIVIDE:
          a = this.pop();
          b = this.pop();
          this.push(a / b);
          break;
        case INST.SUBTRACT:
          a = this.pop();
          b = this.pop();
          this.push(a - b);
          break;
        case INST.LESS_THAN:
          a = this.pop();
          b = this.pop();
          this.push(a < b ? 1 : 0);
          break;
        case INST.GT_THAN:
          a = this.pop();
          b = this.pop();
          this.push(a > b ? 1 : 0);
          break;
        case INST.IF_TRUE:
          if (this.pop() > 0) {
            console.log("true");
            //this.push(bytecode[++i]);
            break;
          }
          console.log("false");
          break;
        case INST.PRINT:
          console.log(this.pop());
          break;
        default:
          console.log(`${this.pop()} is not implemented.`);
          break;
      }
    }
  }
}
