// @depends ./spells.js

function always_one_spell(entity) {
  let updateFn = entity.update.bind(entity);
  if (entity.state.type == "character") {
    entity.update = () => {
      updateFn();
      if (entity.state.spells == 0) entity.drawSpells();
    };
  } else {
    entity.update = () => {
      updateFn();
      if (entity.state.owner.spells == 0) entity.state.owner.drawSpells();
    };
  }
  return entity;
}

function may_discard_first_drawn_adventure_card(entity) {
  //entity.drawFn = entity.drawCard.bind(entity);
  entity.drawCard = (extra = 0) => {
    const amount = entity.state.cardDraw + extra;
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
  /*
  if (entity.state.type !== "character") {
    let addFn = entity.added.bind(entity);
    entity.added = (owner) => {
      owner.state.drawCard_call.push(this);
    };
    let rmFn = entity.removed.bind(entity);
    entity.removed = (owner) => {
      owner.state.drawCard_call.remove(this);
    };
  }
  */
}

function draw_extra_cards(entity, amount = 1) {
  entity.added = (owner) => {
    addFn(owner);
    owner.state.cardDraw += amount;
  };
  let rmFn = entity.removed.bind(entity);
  entity.removed = (owner) => {
    owner.state.cardDraw -= amount;
    rmFn();
  };
}

function change_inventory_size(entity, change = 4) {
  var table = document
    .getElementById("inventory")
    .getElementsByTagName("tbody")[0];

  if (change > 0) {
    var tr = document.createElement("tr");
    for (
      var i = entity.state.carryLimit + 1;
      i - 1 < entity.state.carryLimit + change;
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
  } else {
    for (var i = 0; i < -change / 4; i++) table.deleteRow(table.rows - i);
  }
  entity.state.carryLimit += change;
}

function carry_limit_increase(entity, change = 4) {
  let addFn = entity.added.bind(entity);
  entity.added = (owner) => {
    addFn(owner);
    change_inventory_size(owner, change);
  };

  let rmFn = entity.removed.bind(entity);
  entity.removed = (owner) => {
    change_inventory_size(owner, -change);
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
