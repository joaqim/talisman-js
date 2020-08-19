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
inp = `
#a = 1;
b = 2;


faith = { val = 3; };

c = character = {
  saved_scopes = { faith };

  :a = 3;

  print(:val);

  b = character:a;
};

print(faith:val);

#print(b)
b = 5
#print(b);
#print(c:a);
`;
inp = `
A = 1;
B = 2;
D = 9;

c = {
  a = 2;
  b = 3;
  d = 10;
};

is_ten = {
	true;
};

is_true = lambda(val) if val == true { print(true); } else { print(false); };

board = {
	tiles = 9;
};

print(board:tiles);

char = {
	name = "name";
	scope = board;
	print(board:tiles);
	print(:tiles);
};

print(char:name);

print(c:d == 10);
print(A == 1);
print(board:tiles == 9);

print("\tend");
true;

`;
inp4 = `
board = {
  scope = c;
  tiles = 1;
};

`;

inp = `
trigger = { 
	a = 3;
	true;
};

`;

var input = InputStream(inp);
var tokens = TokenStream(input);
var ast = parse(tokens);
//console.log(JSON.stringify(ast.prog, null, 2));
/*
// works
var g = new Environment(null);
//global
g.set("test", 1);

//scope 1
sc1 = g.add_scope("sc1");
sc1.def("var", 10);

//scope 2
sc2 = g.add_scope("sc2");
sc2.set_scope("sc1", sc1);
console.log(sc2.get_from_scope("var", "sc1")) //prints 10, as expected
*/

console.log(
  JSON.stringify(
    ast,
    (key, value) => {
      if (/owner|scope_saved/.test(key)) return "[.]";
      else return value;
    },
    2
  )
);

var globalEnv = new Environment(null);
console.log(globalEnv);
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
