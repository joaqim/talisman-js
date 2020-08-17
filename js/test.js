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

// Works
//const hello_world = "104 . 101 . 108 . 108 . 111 . 44 . 32 . 119 . 111 . 114 . 108 . 100 . 10 .";
//vm.execute(vm.preprocess(hello_world));

var code;
/*
code = "label(main) 1 2 + jmp(skip) 104 . label(skip) 2 +";
code = vm.preprocess(code);
console.log(code);
vm.execute(code);
*/

/*
code =
  "0 10 108 114 111 119 32 44 111 108 108 101 104 label(loop) dup jz(end) . jmp(loop) label(end)";
code = "label(loop) 119 1 + .num jmp(loop) label(end)";
code = vm.preprocess(code);
console.log(code);
console.log(vm.stack);
vm.execute(code);
*/

/*
code =
  "0 !var(i) 0 !var(p) 1 !var(n) 0 !var(tmp)  var(i) .num 32 .  var(p) .num 10 .   var(i) .num 32 .  var(n) .num 10 .  label(next) var(p) var(n) + !var(tmp) var(n) !var(p) var(tmp) !var(n)  var(i) .num 32 .  var(n) .num 10 .   var(i) 1 + !var(i) jmp(next)";
*/

//vm.execute(vm.preprocess(code));

/*
code =
  "97 !var(i) label(loop) var(i) .  var(i) 1 + !var(i) var(i) 123 - jnz(loop) 10 .";
  */

code = `
jmp(main)
label(printstr)
  label(loop)
    dup jz(end)
      .
    jmp(loop)
  label(end)
    ret
label(main)
0 10 100 108 114 111 119 32 44 111 108 108 101 104 call(printstr)`;

//code = (" jmp(main) label(printstr) label(loop) dup jz(end) .  jmp(loop) label(end) ret label(main) 0 10 100 108 114 111 119 32 44 111 108 108 101 104 call(printstr)");

function testCode(txt) {
  code = vm.preprocess(txt);
  console.log(code);
  vm.execute(code);
}

/*
code = vm.preprocess(code);
console.log(code);
vm.execute(code);
*/

var inp = `
hobo = {
  lives = 4
  strength = 2
  craft = 2
}
smh = {
  lives = 0
}
main = {
  scope = hobo
  print = lives
}
`;

//# scope = 0 is equivalent to scope = ROOT, scope = hobo
// #  scope:lives = 4
//#  scope:strength = 2
//#  scope:craft = 2

var out = `
jmp(main)
label(hobo) {
  scope(hobo)
  4 !var(lives)
  2 !var(strength)
  2 !var(craft)
} ret

label(smh)
  0 !var(lives)
  ret
label(main)
  call(hobo)
`;

testCode(out);

//console.log(vm.preprocess(out));
//console.log(shunting_yard(vm.preprocess(out)).toArray());
//vm.execute(shunting_yard(vm.preprocess(out)).toArray().concat());

var equal_to = "hobo = { scope = ROOT ...}";
equal_to = "hobo = { scope = hobo ...}";
equal_to = "hobo = { hobo:lives = 4 ...}";
equal_to = "hobo = { root:lives = 4 ...}";
equal_to = "hobo = { lives = 4 ...}";
equal_to = "hobo:lives = 4";

raw = `{ hobo = { lives = 4 } }`;

exp = `
(

0 !var(hobo)
*(hobo) !var(ROOT)
var(ROOT) !var(scope)

( var(scope) = ( 1 + 6 * 3 ) )

:get_var(strength)
.num

( 2 * :get_var(strength) ) :set_var(str)

:get_var(str)
.num
var(hobo)
.num
)

`;

//console.log(vm.preprocess(exp));
//console.log(shunting_yard(vm.preprocess(exp)).toArray());

//vm.execute(shunting_yard(vm.preprocess(exp)).toArray().concat());

//vm.execute(vm.preprocess(raw));
//vm.compile(raw);

/*
code =
  "jmp(main) label(hobo)  4 !var(lives) 2 !var(strength) 2 !var(craft) ret label(main) call(hobo) var(lives) .num";

code =
  "jmp(main) label(spells) 69 !var(i) ret label(main) 0 !var(i) call(spells) var(i) .num";
//code += "\n!scope(spells) spells:draw_spell";
vm.execute(vm.preprocess(code));
*/

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
