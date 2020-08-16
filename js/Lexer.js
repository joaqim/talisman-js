// @depends ./Stack.js
//
const i = {
	SCOPE: 0x30,
	LIMIT: 0x31,
	
	LABEL: 0x38,
	VARIABLE: 0x39,
	ENDSCOPE: 0x40,
}
class Lexer {
	constructor() {
		this.code = [];
		this.nextAddress = 0;
		this.variables = []
	}

	process(string) {
		//var tokens = [];
		var tokens = new Stack();
		for (let i in string) {
			let t = string[i]
			switch(t) {
				case (" "):
					break;
				case ("scope"):
					tokens.push(i.SCOPE);
					break;
				case ("limit"):
					tokens.push(i.LIMIT);
					break;
				case ("{"):
					tokens.push(i.LABEL);
					break;
				case ("="):
					tokens.push(i.VARIABLE);
					break;
				default:
					//tokens.push(t);
					break;
			}
		}
		return tokens;
	}
}

//l = new Lexer();
//var r = l.process('ball = { scope = character limit = {}}}');
//console.log(r.stack)
/*
 * var ball 
 * scope character
 * label(limit)
 * 	
 * end(limit)
 */
