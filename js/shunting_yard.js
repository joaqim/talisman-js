// @depends ./Stack.js
// @depends ./Queue.js

function has_operator(stack, operators) {
  //if (stack.counter <= 0) return false;
  return operators.hasOwnProperty(stack.top());
}

function has_lower_precedence(o1, o2, operators) {
  op1 = operators[o1];
  op2 = operators[o2];
  return (
    (op1.associativity == "left" && op1.precedence == op2.precedence) ||
    op1.precedence < op2.precedence
  );
}

function shunting_yard(tokens) {
  let stack = new Stack(16);
  let output = new Queue();

  const operators = {
    "+": { precedence: 0, associativity: "left" },
    "-": { precedence: 0, associativity: "left" },
    "*": { precedence: 1, associativity: "left" },
    "/": { precedence: 1, associativity: "left" },
    "%": { precedence: 1, associativity: "left" },
  };

  tokens.forEach((token) => {
    if (typeof token == "number") {
      output.enqueue(token);
    } else if (operators.hasOwnProperty(token)) {
      let o1 = token;
      let o2;
      while (
        has_operator(stack, operators) &&
        (o2 = stack.top()) &&
        has_lower_precedence(o1, o2, operators)
      ) {
        output.enqueue(stack.pop());
      }
      stack.push(o1);
    } else if ("(" == token) {
      stack.push(token);
    } else if (")" == token) {
      while (stack.counter > 0 && "(" != stack.top()) {
        output.enqueue(stack.pop());
      }
      if (stack.counter == 0)
        throw new Error(`Missmatched parenthesis in input: ${tokens}`);

      // pop off '('
      stack.pop();
    } else throw new Error(`Invalid token: ${token}`);
  });

  while (has_operator(stack, operators)) output.enqueue(stack.pop());

  //console.log(output.toArray());
  if (stack.counter > 0)
    throw new Error(
      `Mismatched parenthesis or misplaced number in input: ${tokens}`
    );

  return output;
}

//console.log(stack.stack);
//

