//@depends ./Stack.js
//@depends ./constants.js

class VM extends Stack {
  constructor() {
    super(64);
    this.vars = [];
    this.labels = [];
  }

  store(variable) {
    this.vars[variable] = this.pop();
  }

  load(variable) {
    this.push(this.vars[variable]);
  }

  execute(ops) {
    for (let i in ops) {
      const op = ops[i];
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
       case "-":
          a = this.pop();
          b = this.pop();
	  this.push(a - b);
	  break;
	case "*":
          a = this.pop();
          b = this.pop();
          this.push(a * b);
          break;
      	case "/":
          a = this.pop();
          b = this.pop();
          this.push(a / b);
          break;
      	case "%":
          a = this.pop();
          b = this.pop();
          this.push(a % b);
          break;
        case ".":
          console.log(String.fromCharCode(this.pop()));
          break;
      }
      var match = null;
      match = op.match(/^jump\((.+)\)$/)
      if(match) console.log(match[1])

      match = op.match(/^label\((.+)\)$/)
      if(match) continue;

    }
    
    return this.top();
  }

  preprocess(txt) {
	  let lines = txt.split(/\r\n|\n|\n/)
	  console.log(lines)
	  for(let ip in lines) {
		  const match = lines[ip].match(/^label\((.+)\)$/);
		  if(match) this.labels[match[1]] = ip;
	  }
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
