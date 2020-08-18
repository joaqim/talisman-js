//@depends ./VM.js
//@depends ./Environment.js
//@depends ./evaluate.js

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

character = {
    c = 10;
    name = "Susy";
    print(name);
};

#character:name = character:c;
#print(character:name);

#cp = character:test;
:test = 5;
:test = :test * 10;
print(ROOT:test);
#c = hobo : name;
#print(1 + 3);
#:c = 5;
#print(character:test) ;

#character : c;

name = "Gerald";
i = 1;
hobo = {
    name = "hobo";
    print(name);
};
print(i);
print(name);
c = 5;
print(c);

`;
inp = `

a = 9;
character = {
  my_a = 3;
};
#print(character:my_a);
print(a == 9);
print(a == 3);
print(a);

#print(test:a == 1);

a = 5;
print(c:a);
print(a);
#name = "garbage";
#print(name);
#i = 1;

`;

inp = `
#c = { c:d = 3; c:k = 5; };
b = 1;
c = { b = 0; };
#print(b);
c:b = 3;
print(b);
d = 0;
a = 1;
b = 2;

q = { a = 0;};

print(b);
scope = owner;
limit = { print(a);};
effect = { print(a);};
test = t = { print(a); true; };
limit = { b == 2; };

board = { tiles_x = 6; };
`;
var input = InputStream(inp);
var tokens = TokenStream(input);
var ast = parse(tokens);
console.log(ast.prog);

/*
var globalEnv = new Environment();
// define the "print" primitive function
globalEnv.def("print", function (callback, txt) {
  console.log(txt);
  callback(false); // call the continuation with some return value
  // if we don't call it, the program would stop
  // abruptly after a print!
});
// run the evaluator
evaluate(ast, globalEnv, function (result) {
  // the result of the entire program is now in "result"
  console.log(result);
});
*/
