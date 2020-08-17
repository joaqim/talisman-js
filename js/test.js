//@depends ./VM.js

/*
let vm = new VM();
function testCode(txt) {
  code = vm.preprocess(txt);
  console.log(code);
  vm.execute(code);
}
vm.execute(
  vm.preprocess(`

store 1 0
store 8 1
add 0 1 2
print_num 2
add 2 0 3
print_num 3

`)
);
*/

var inp = `
always_one_spell = {
  scope = "owner;
  #saved_scopes = { spells };
}`;
/*
  limit = {
    OR = {
      on_start_of_first_turn;
      on_spell_count_changed;
    }
  }
  trigger = {
    has_spell_count = 0;
    has_max_spells = false;
    NOT = { has_max_spells };
    check_variable = { which = "spell_count"; value = 0 };
  }
  effect = {
    spells:draw_spell;
  }
}
`;
*/

//inp = "character = { scope = ROOT }";
//inp = "{character = 1;}";
//inp = `println("test");`;
inp2 = `
character = {
  lives = 4;
  strength = 5;
  wisdom = 5;
};

hobo = { lives = 1 };
print(character)
`;
inp = `
a = p = {
  c = 1;
  print(c);
};
print(c);
`;

var input = InputStream(inp);
var tokens = TokenStream(input);
var ast = parse(tokens);
console.log(ast.prog);
var globalEnv = new Environment();
globalEnv.def("print", (txt) => console.log(txt));
evaluate(ast, globalEnv);
