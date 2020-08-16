//@depends ./Stack.js
//@depends ./constants.js

class VM extends Stack {
  constructor() {
    super(64);
    this.vars = [];
  }

  store(variable) {
    this.vars[variable] = this.pop();
  }

  load(variable) {
    this.push(this.vars[variable]);
  }

  execute(code) {
    for (let i in code) {
      const op = code[i];
      console.log(op);
      if (typeof op == "number") {
        this.push(op);
        continue;
      }
      var a, b;
      switch (op) {
        case "+":
          a = this.pop();
          b = this.pop();
          this.push(a + b);
          break;
        case "*":
          a = this.pop();
          b = this.pop();
          this.push(a * b);
          break;
        case "print":
          console.log(this.pop());
          break;
      }
    }
    return this.top();
  }

  interpret(bytecode, size = null) {
    if (size === null) size = bytecode.length;
    for (var i = 0; i < size; i++) {
      let instruction = bytecode[i];
      console.log(`${instruction}`);
      let a, b, target;
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
