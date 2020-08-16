//@depends ./Interpreter.js

let vm = new VM();

var cmds = new Stack(16);
function parse(obj) {
  for (token in obj) {
    switch (token) {
      case "trigger":
        cmds.push(INST.SET_TRIGGER);
        parse(obj[token]);
        break;
      case "bytecode":
        console.log("Code: ");
        obj[token].split(" ").forEach((t) => cmds.push(Number(t)));
        break;
    }
  }
}

vm.interpret([INST.LITERAL, 0, INST.LITERAL, 1, INST.LESS_THAN, INST.PRINT]);



/*
set_target root
var health
push 0
set_variable // Set's the ROOT.health to 0
*/

//const full_health = 'set_variable = { which = health value = { get_variable = {which = health_max }}}'
// or:
//const full_health = 'set_variable = {  .health =  .health_max }'

/*
.health //  get address of .health var
.health_max // address used by set_variable
get_variable  // turns address into value
set_variable // sets vaule in address of health to health_max value
*/

//  give full health
/*
var health
var health_max
get_variable
set_variable // Set's the ROOT.health to the health_max value
*/



//target default to ROOT in scope ( or previous target )
//const lose_all_lives_TXT = 'set_variable = { which = health, value = 0 }'
//
//const lose_all_lives_TXT = 'set_variable = { target = ROOT which = health, value = 0 }'
// or:
//const lose_all_lives_TXT = 'set_variable = { target = ROOT health = 0 }'
//const lose_all_lives_TXT = 'set_variable = { health = 0 }'


// Lose all lives
/*
vm.interpret([
  INST.LITERAL, 0, // player 0 ID


  INST.LITERAL, 0, // health id var?
  INST.SET_VARIABLE, //
//or
  INST.HEALTH //
  INST.SET_VARIABLE, //

]);
*/
