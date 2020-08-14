class Character {
  constructor(
    name,
    strength,
    craft,
    lives,
    fate,
    alignment = "neutral",
    items = []
  ) {
    this.state = {
      name: name,
      type: "character",
      alignment: alignment,

      strength: strength,
      craft: craft,
      lives: lives,
      fate: fate,

      strengthMin: strength,
      craftMin: craft,
      livesMax: lives,
      fateMax: fate,

      spells: [],
      items: items,
      followers: [],

      carryLimit: 4,
      cardDraw: 1,

      curTurn: {
        cards: [],
        spells: [],
        spellUsages: 1,
        changes: { strength: 0, craft: 0, lives: 0, fate: 0 },
      },
      outOfTurn: {
        spellUsages: 1,
      },
    };
  }

  update() {
    this.updateChanges();
    this.updateItems();
    //TODO: Check for changes in carryLimit ? Or deal with in in callback.
  }

  updateItems() {
    for (var i = 0; i < this.state.items.length; i++)
      this.state.items[i].update();
  }

  updateChanges() {
    // TODO: Let other players intervene with spells, i.e:
    // if this player is going to lose a life/die unless someone cast
    // a spell like 'intervention'
    this.changeLife(this.state.curTurn.changes.life);
  }

  changeLife(change) {
    this.state.lives += change;
  }

  startTurn() {
    this.state.curTurn.spellUsages = this.spellCount();
    this.update(); // Any spells drawn during the players turn don't count to available spellUsages
  }

  endTurn() {
    this.state.curTurn.spells = [];
    this.state.curTurn.cards = [];

    this.state.outOfTurn.spellUsages = this.spellCount();
  }

  drawCard(extra = 0) {
    const amount = extra + this.state.cardDraw;
    console.log(`${this.state.name} has drawn ${amount} card(s)`);
    for (var i = 0; i < amount; i++) {
      this.state.cardsDrawn.push(`Card #${i}`);
    }
  }

  discardCard(card) {
    card.decks.discard.push(card);
  }

  addFollower(follower) {
    follower.added(this);
    this.state.followers.push(follower);
  }

  /* if follower is required to be discarded, returns false */
  removeFollower(follower) {
    return follower.removed(this);
  }

  useItem(item) {
    if (!item.requirementUse(this)) {
      console.log(
        `${this.state.name} does not fulfill the requirements to use ${item.state.name}: ${item.state.requirement_text.use}`
      );
      return false;
    }
    item.use(this);
    return true;
  }

  addItem(item) {
    if (!item.requirementPickup(this)) {
      console.log(
        `${this.state.name} does not fulfill the requirements of ${item.state.name}: ${item.state.requirement_text.pickup}`
      );
      return false;
    } else if (this.hasMaxItems()) {
      console.log(
        `${this.state.name} has too many items (${this.state.carryLimit}/${this.state.carryLimit})`
      );
      return false;
    }

    console.log(`${this.state.name} picked up ${item.state.name}`);
    item.added(this);
    this.state.items.push(item);
    return true;
  }

  /* if item is demands to be discarded, it will return false */
  removeItem(item) {
    return item.removed(this);
  }

  drawSpells(amount = 1) {
    for (var i = 0; i < amount; i++) {
      if (this.hasMaxSpells()) return;
      var spellName = "a new Spell";
      this.state.spells.push(spellName);
      console.log(`${this.state.name} drew ${spellName}`);
    }
  }

  addSpell(spellName) {
    this.state.spells.push(spellName);
    console.log(`${this.state.name} drew ${spellName}`);
  }

  useSpell(spellName, target = null) {
    if (this.state.curTurn.spellUsages > 0) {
      this.state.spells = [];
      this.state.curTurn.spellUsages--;
      // True if the target is affected by the spell
      if (castSpell(this, spellName, target)) {
        return true;
      }
    }
    return false;
  }

  spellCount() {
    return this.state.spells.length;
  }

  hasMaxSpells() {
    return Math.floor(this.state.craft / 2) <= this.spellCount();
  }

  hasMaxItems() {
    return this.state.itemMax <= this.state.items.length;
  }
}
