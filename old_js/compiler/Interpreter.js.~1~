class NumberExpression {
  constructor(value) {
    this.value = value;
  }
  evaluate() {
    return this.value;
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  evaluate() {
    return this.left + this.right;
  }
}

const TYPES = {
  INT: 0x01,
  DOUBLE: 0x02,
  STRING: 0x03,
};

const INST = {
  ADD: 0x01,
  PRINT: 0x02,
  LITERAL: 0x03,

  EQUAL: 0x08,
  LESS_THAN: 0x09,
  LESS_THAN_OR_EQ: 0x10,
  GT_THAN: 0x11,
  GT_THAN_OR_EQ: 0x12,

  IF_TRUE: 0x20,
  IF_FALSE: 0x21,

  CODE: 0x50,

  HAS_ARMOR: 0x51,
  LOSE_LIFE: 0x52,
  GET_HEALTH: 0x53,
  GET_WISDOM: 0x54,

  GET_NUM_SPELLS: 0x70,
  DRAW_SPELLS: 0x71,

  SET_TRIGGER: 0x99,
  TRIGGER_ALWAYS: 0x100,
  TRIGGER_ONCE: 0x101,
  TRIGGER_USE: 0x102,
  CHARACTER_SCOPE: 0x111,
};

party = ["wizard"];

class Stack {
  constructor(memSize = 64) {
    this.memSize = memSize;
    this.stack = new Uint16Array(memSize);
    this.counter = 0;
  }

  validMemacc(address) {
    if (address >= this.memSize)
      throw new Error(`Error: no valid memory access at address: ${address}`);
  }
  increment(value = 1) {
    this.counter += value;
  }
  decrease(value = 1) {
    this.counter -= value;
  }
  push(value) {
    this.validMemacc(this.counter + 1);
    this.stack[this.counter] = value;
    this.increment();
  }
  pop() {
    if (this.counter <= 0) throw new Error("Error: Stack under-flow");
    this.decrease();
    var val = this.stack[this.counter];
    return val;
  }
}

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

var u16 = new Uint16Array();
let vm = new VM();

//always: { bytecode: `${INST.LITERAL} 0 ${INST.GET_HEALTH} ${INST.PRINT}` },

always_one_spell_obj = {
  scope: "character",
  trigger: {
    always: {
      //bytecode: `${INST.GET_NUM_SPELLS} ${INST.LITERAL} 1 ${INST.GT_THAN}`,
      if: {
        bytecode: `${INST.GET_NUM_SPELLS} ${INST.LITERAL} 1 ${INST.GT_THAN}`,
      },
      do: {
        bytecode: `${INST.LITERAL} 1 ${INST.DRAW_SPELLS}`,
      },
    },
  },
};

// 1 < 0 = false (prints 0)
vm.interpret([INST.LITERAL, 0, INST.LITERAL, 1, INST.LESS_THAN, INST.PRINT]);

var cmds = new Stack(16);
function parse(obj) {
  for (token in obj) {
    switch (token) {
      case "trigger":
        cmds.push(INST.SET_TRIGGER);
        parse(obj[token]);
        break;
      case "if":
        break;
      case "bytecode":
        console.log("Code: ");
        obj[token].split(" ").forEach((t) => cmds.push(Number(t)));
        break;
      case "always":
        cmds.push(INST.TRIGGER_ALWAYS);
        parse(obj[token]);
        break;
      case "scope":
        switch (obj[token]) {
          case "character":
            cmds.push(INST.CHARACTER_SCOPE);
            break;
          case "board":
            cmds.push(INST.BOARD_SCOPE);
            break;
          case "inner_region":
            cmds.push(INST.INNER_REGION_SCOPE);
            break;
          case "outer_region":
            cmds.push(INST.OUTER_REGION_SCOPE);
            break;
          case "center_region":
            cmds.push(INST.CENTER_REGION_SCOPE);
            break;
          default:
            throw new Error(`${obj[token]} is not a valid scope`);
        }
    }
  }
}

parse(always_one_spell_obj);
console.log(cmds.stack);
//vm.interpret([INST.SET_TRIGGER, INST.TRIGGER_ALWAYS]);
//vm.interpret([INST.LITERAL, 0, INST.GET_HEALTH, INST.PRINT]);
vm.interpret(cmds.stack, cmds.counter);

/*
cmds.push(INST.LITERAL);
cmds.push(1);
cmds.push(INST.LITERAL);
cmds.push(1);
cmds.push(INST.ADD);
console.log(cmds.stack);
*/
//cmds.push(INST.PRINT);

//cmds.push(INST.LITERAL);
//cmds.push(1);
//cmds.push(INST.ADD);
//cmds.push(INST.PRINT);

//console.log(cmds);

//vm.interpret(cmds.stack, cmds.counter);
//console.log(vm.stack);
//vm.interpret([INST.PRINT]);
/*
vm.interpret([INST.LITERAL, 0]);
vm.interpret([INST.HAS_ARMOR]);
vm.interpret([INST.PRINT]);

vm.push(5);
vm.push(7);
vm.interpret([INST.ADD]);
vm.interpret([INST.PRINT]);

vm.interpret([INST.LITERAL, 69, INST.PRINT]);

vm.interpret([INST.LITERAL, 0, INST.GET_HEALTH, INST.PRINT]);

vm.interpret([INST.LITERAL, 0, INST.LITERAL, 5, INST.LOSE_LIFE]);

// Lose all lives
vm.interpret([
  INST.LITERAL,
  0,
  INST.LITERAL,
  0,
  INST.GET_HEALTH,
  INST.LOSE_LIFE,
]);
*/
