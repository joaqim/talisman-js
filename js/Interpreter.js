//@depends ./Stack.js
//@depends ./constants.js

class VM {
  constructor() {
    this.stack = new Stack();
  }
  push(value) {
    this.stack.push(value);
  }
  pop() {
    return this.stack.pop();
  }

  interpret(bytecode, size = null) {
    if (size === null) size = bytecode.length;
    for (var i = 0; i < size; i++) {
      let instruction = bytecode[i];
      //console.log(`${instruction}`);
      let a, b, target;
      switch (instruction) {
        case INST.HAS_ARMOR:
          console.log(`Does ${party[this.pop()]} have armor?`);
          this.push(true);
          break;
        case INST.LITERAL:
          this.push(bytecode[++i]);
          break;
        case INST.ADD:
          a = this.pop();
          b = this.pop();
          sizethis.push(a + b);
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
        case INST.SET_TRIGGER:
          console.log(`Set trigger: `);
          console.log(bytecode[++i]);
        case INST.CHARACTER_SCOPE:
          this.scope = "character";
          break;
        case INST.LOSE_LIFE:
          a = this.pop();
          target = party[this.pop()];
          console.log(`${target} LOSE_LIFE: ${a}`);
          break;
        case INST.GET_WISDOM:
          target = party[this.pop()];
          console.log(`Returning ${target}'s wisdom (4)'`);
          this.push(4);
          break;
        case INST.GET_HEALTH:
          target = party[this.pop()];
          console.log(`Returning ${target}'s health (10)'`);
          this.push(10);
          break;
        case INST.GET_NUM_SPELLS:
          console.log(`Returning ${target}'s number of spells (0)'`);
          this.push(0);
          break;
        case INST.DRAW_SPELLS:
          target = party[this.pop()];
          console.log(`${target} draws spell(s)'`);
          break;
        default:
          console.log(`${this.pop()} is not implemented.`);
          break;
      }
    }
  }
}

