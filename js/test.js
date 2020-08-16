//@depends ./Interpreter.js

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
