//@depends ./VM.js

let vm = new VM();

var cmds = new Stack(16);
function parse(txt) {
  const obj = txt.split(" ").filter((a) => a !== "");
  for (token in obj) {
    switch (token) {
      default:
        console.log(token, obj[token]);
        break;
    }
  }
}

/* Works
let tokens = [1, "+", 2];
tokens = [1, "+", 2, "*", 3];
let cmdss = shunting_yard(tokens).toArray();
console.log(vm.execute(cmdss.concat(["print"])));
*/


/* Works
const hello_world = [104, ".", 101, ".", 108, ".", 108, ".", 111, ".", 44, ".", 32, ".", 119, ".", 111, ".", 114, ".", 108, ".", 100, ".", 10, "."]
vm.execute(hello_world);
*/
var code ="label(main)\n1 2 +\njmp(skip)\n104 .\nlabel(skip)\n 2 +";
vm.preprocess(code)
var code =["label(main)",1, 2, "+","jmp(skip)", 104, ".","label(skip)", 2, "+"];
vm.execute(code)

//vm.interpret([INST.LITERAL, 0, INST.LITERAL, 1, INST.LESS_THAN, INST.PRINT]);

//const full_health = 'set_variable = { which = health value = { get_variable = {which = health_max }}}'
// or:

//const full_health = "set_variable = {  .health = .health_max }";
//parse(full_health);

/*
.health //  get address of .health var
.health_max // address used by set_variable
get_variable  // turns address into value
set_variable // sets value in address of health to health_max value
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
