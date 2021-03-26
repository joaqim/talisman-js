//@depends ../+Entities/Entity.js
// Name, Health, Strength, Craft, Fate, Alignment, Start, Gold=2?, [items] , [followers]

class Character extends Entity {
  constructor(
    name,
    health,
    strength,
    craft,
    fate,
    alignment,
    start,
    gold,

    //TODO: needs to be arrays to allow duplicate entries
    items = new Map(),
    followers = new Map(),
    spells = new Map(),

    trophies = new Array()
  ) {
    super();
    this.state = {
      name,
      health,
      strength,
      craft,
      fate,
      alignment,
      start,
      gold,
      carryLimit: 4,

      items,
      followers,
      spells,
      trophies,
    };

    // Gets applied on apply_changes state after
    // battle/entity_effect/spell_effect/card_effect/tile_effect
    // this is so effects like the spell "Preservation" can
    // be used to prevent life lost
    // Rune_sword for example doesn't use this, since it's effect
    // can't be prevented.
    this.changes = {
      lives: 0,
      strength: 0,
      craft: 0,
      fate: 0,
    };
  }

  get(index) {}
  add(entity) {
    // item(s), trophies, follower(s), spell(s)
    let arr = this.state[`${entity.state.type}s`];
  }
  remove(entity) {}

  addEntity(entity) {
    this.state[`${entity.state.type}s`][entity.state.name] = entity;
    entity.added(this);
    console.log(
      `${this.state.name} added ${entity.state.type}:  ${entity.state.name}`
    );
  }

  discardEntity(entity_name, type) {
    let map = this.state[`${type}s`];
    map[entity_name].removed(this);
    map.delete(entity_name);
  }
  dropEntity(entity_name, type) {
    let map = this.state[`${type}s`];

    // Check if entity can be dropped
    let val = map[entity_name].canDrop(this);
    if (val.val == false) return val;

    map[entity_name].removed(this);
    let entity = Object.create(map[entity_name]);
    map.delete(entity_name);
    return { val: entity };
  }
  useEntity(entity_name, type, target = null) {
    let map = this.state[`${type}s`];
    return map[entity_name].use(this, target);
  }
  canUse(entity_name, type, target = null) {
    let map = this.state[`${type}s`];
    return map[entity_name].reqUse(this, target);
  }
  drawCard(args) {
    args = {
      game: args.game,
      deck: args.deck ? args.deck : "adventure",
      amount: args.amount ? args.amount : 1,
    };
    this.onDrawCard(args);
  }
  //onDrawCard(game, deck_name, amount) {}
  onDrawCard() {}

  /*
  drawCard(game, deck_name = "adventure", amount = 1) {
    this.onDrawCard(game, deck_name, amount);
  }
//onDrawCard(game, deck_name, amount) {}
  onDrawCard(game, deck_name, amount) {
    if (game === undefined) throw new Error("onDrawCard(): game is undefined");
  }
  */

  // Battle
  battleWon(target) {
    this.onBattleWon(target);
  }

  onBattleWon(target) {
    console.log(target);
    if (target.state.type == "creature") {
      target.defeated(this);
    }
  }
  addTrophy(trophy) {
    console.log(
      `${this.state.name} gained a trophy: ${trophy.state.real_name} with ${
        trophy.value.value + " " + trophy.value.type
      } .`
    );
    this.state.trophies.push(trophy);
  }
  // Items
  /*
  useItem(game,item) {}
  addItem(game,item) {}
  discardItem(game,item) {}
  dropItem(game,item)
  // Followers
  useFollower(game,follower) {}
  addFollower(game,follower) {}
  discardFollower(game,follower) {}
  dropFollower(game,follower) {}
  */

  // Spells
  useSpell() {
    this.onUseSpell();
    // onUseSpellSucess
    // onUseSpellFailure
  }

  addSpell(spell) {
    this.state.spells[spell.name] = spell;
  }
  hasMaxSpells() {
    return this.spellCount() < this.maxSpells();
  }
  maxSpells() {
    return Math.min(0, Math.floor(this.state.craft / 2));
  }
  spellCount() {
    return this.state.spells.size;
  }
}
