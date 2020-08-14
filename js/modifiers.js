// @depends ./spells.js

function always_one_spell(entity) {
  let updateFn = entity.update.bind(entity);
  entity.update = () => {
    updateFn();
    if (entity.state.type == "character") {
      if (entity.state.spells.length == 0) entity.drawSpell();
    } else if (entity.state.owner.state.spells.length == 0)
      entity.state.owner(drawSpell);
  };
  return entity;
}

function may_discard_first_drawn_adventure_card(entity) {
  entity.drawFn = entity.drawCard.bind(entity);
  entity.drawCard = (extra = 0) => {
    const amount = extra + entity.state.cardDraw;
    for (var i = 1; i < amount + 1; i++) {
      // Draw card:
      console.log(`${entity.state.name} has drawn ${i}/${amount} card(s)`);
      //const card = `Card #${i}`;
      // Ask if character wants to keep the card:
      //      this.state.cardsDrawn.push(card);
      // If not:
      //      card.discard;
      //      //Draw another card and keep it.
    }
  };
}

function draw_extra_cards(entity, amount = 1) {
  entity.added = (owner) => {
    addFn(owner);
    owner.state.cardDraw += amount;
  };
  let rmFn = entity.removed.bind(entity);
  entity.removed = (owner) => {
    owner.state.carryLimit -= amount;
    rmFn();
  };
}

function carry_limit_increase(entity, change = 4) {
  let addFn = entity.added.bind(entity);
  entity.added = (owner) => {
    addFn(owner);

    var table = document
      .getElementById("inventory")
      .getElementsByTagName("tbody")[0];

    var tr = document.createElement("tr");
    //for (var i = owner.state.carryLimit + 0; i <= owner.carryLimit; i++) {
    for (
      var i = owner.state.carryLimit + 1;
      i - 1 < owner.state.carryLimit + change;
      i++
    ) {
      var td = document.createElement("td");
      td.id = `i${i}`;
      td.setAttribute("class", "slot");
      tr.appendChild(td);
      if (i % 4 === 0) {
        table.appendChild(tr);
        tr = document.createElement("tr");
      }
    }

    owner.state.carryLimit += change;
  };

  let rmFn = entity.removed.bind(entity);
  entity.removed = (owner) => {
    var table = document
      .getElementById("inventory")
      .getElementsByTagName("tbody")[0];
    for (var i = 0; i < change / 4; i++) table.deleteRow(table.rows - i);
    owner.state.carryLimit -= change;
    rmFn();
  };
  return entity;
}

function discard_on_remove(entity) {
  let rmFn = entity.removed.bind(entity);
  entity.removed = () => {
    rmFn();
    return false;
  };
  return entity;
}

function required_alignment_to_use(entity, alignment, NOT = false) {
  let reqFn = entity.requirementUse.bind(entity);
  entity.state.requirement_text.use = `no ${alignment} characters can use this ${entity.state.type}`;
  entity.requirementUse = (owner) => {
    return (owner.state.alignment === alignment) !== NOT && reqFn();
  };
  return entity;
}

function required_alignment_to_pickup(entity, alignment, NOT = false) {
  let reqFn = entity.requirementPickup.bind(entity);
  entity.state.requirement_text.pickup = `no ${alignment} characters can have this ${entity.state.type}`;
  entity.requirementPickup = (owner) => {
    return (owner.state.alignment === alignment) !== NOT && reqFn();
  };
  return entity;
}
const required_alignment_to_pickup_NOT = (entity, alignment) =>
  required_alignment_to_pickup(entity, alignment, true);
const required_alignment_to_use_NOT = (entity, alignment) =>
  required_alignment_to_use(entity, alignment, true);
