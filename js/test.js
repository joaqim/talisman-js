//@depends ./Character.js

/*
 *
 *board { tiles = []; getTiles() }
*/

function update_function(entity, callback) {
	let updateFn = entity.update.bind(entity);
	entity.update = (owner) => {
		updateFn();
		callback(owner);
	};
}

function draw_spell_mod (entity) {
	update_function(entity, () => console.log("Draw Spell"))
}

//const Character = (name) => {
class Character {
	constructor(name) {
	this.state = {
		name,
		health: 4,
		strength: 3,
		craft: 3
		}
		draw_spell_mod(this);
	}

//	update: function 
	update() { console.log("Name: ", this.state.name) }
//	return Object.assign(state, draw_spell_mod(this));
}

p = new Character("Prophetess");
p.update();
