class Character {
  constructor(name, strength, craft, lives, fate, alignment = "neutral") {
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
      items: [],
      followers: [],

      carryLimit: 4,
      cardDraw: 1,

      curCard: null,
      cardsDrawn: [],
    };
  }

  update() {
    for (var i = 0; i < this.state.items.length; i++)
      this.state.items[i].update();
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

  drawSpell() {
    var spellName = "a new Spell";
    this.state.spells.push(spellName);
    console.log(`${this.state.name} drew ${spellName}`);
  }
  addSpell(spellName) {
    this.state.spells.push(spellName);
    console.log(`${this.state.name} drew ${spellName}`);
  }

  useSpell(spellName, target = null) {
    this.state.spells = [];
    if (castSpell(this, spellName, target)) {
      return true;
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
