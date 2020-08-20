//@depends ../Character.js

function add_mod(entity, func_name, callback, replace = false) {
  let Fn = entity[func_name].bind(entity);
  entity[func_name] = (target) => {
    callback(target);
    if (!replace) Fn();
  };
}

function add_mod2(entity, mod) {
  let Fn = entity[mod.when].bind(entity);
  entity[mod.when] = (target) => {
    mod.callback(target);
    if (mod.replace == false) Fn();
  };
}

// TODO: Make sure all conditionals are accounted for, maybe do an array instead of callbacks?
function add_mod2_cond(entity, mod) {
  let Fn = entity[mod.when].bind(entity);
  entity[mod.when] = (target) => {
    let val = mod.callback(target);
    if (!Fn)
      return {
        val: false,
        txt: `${target.state.real_name} cannot use ${entity.state.real_name}.`,
      };
    // && mod.replace == false ? Fn() : true;
    return val;
  };
}

function always_x_of_spells(entity, args) {
  add_mod2(entity, {
    when: "onUpdate",
    callback: (game) => {
      if (entity.spellCount() < args.amount) {
        game.drawSpell(entity, args.amount - entity.spellCount());
      }
    },
  });
}

// max signifies the amount of cards you can mulligan per draw
// not used until I up the draw for drawMulligan($1)
function may_mulligan_cards(entity, args_m) {
  if (entity.type == undefined) {
    add_mod2(entity, {
      when: "onDrawCard",
      callback: (args) => {
        console.log(args.deck);
        if (args.deck == args_m.deck) {
          // Math.Max is used to make sure that mulligans don't stack; only keep the highest
          // amount of mulligans
          // Math.Min makes sure that you don't have more mulligans than cards drawn
          game.turn.mulligans = Math.max(
            Math.min(args.amount, args_m.amount),
            game.turn.mulligans
          );
          console.log("Added mulligans ", game.turn.mulligans);
        }
      },
      replace: false,
    });
  } else {
    event = {
      event: EVENT.DRAW_CARD,
      action: (by) => {
        by.turn.mulligans = Math.max(by.turn.mulligans, 1);
      },
    };
    PubSub.enable(entity);
    entity.subscribe(event.event, action.action);
  }
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

function carry_limit_increase(entity, args) {
  add_mod(entity, "onAdded", (owner) => {
    change_inventory_size(owner, args.change);
  });

  add_mod(entity, "onRemoved", (owner) => {
    change_inventory_size(owner, -args.change);
  });
}

/*
function discard_on_remove(entity) {
  add_mod(entity, "onRemoved", (owner) => {
    //return false;
  });
}
*/

function discard_on_remove(entity) {
  add_mod2_cond(entity, {
    when: "onRemoved",
    callback: () => {
      return { val: false, text: `${entity.state.real_name} was discarded.` };
    },
    replace: true,
  });
  cant_be_dropped(entity);
}

function cant_be_dropped(entity) {
  add_mod2_cond(entity, {
    when: "onCanDrop",
    callback: () => {
      return {
        val: false,
        text: `${entity.state.real_name} can't be dropped.`,
      };
    },
    replace: true,
  });
}

function required_alignment_to_use(entity, args) {
  add_mod2_cond(entity, {
    when: "onReqUse",
    callback: (owner, target) => {
      if ((owner.state.alignment === args.alignment) !== (args.NOT === false)) {
        return {
          val: true,
          text: `${entity.state.real_name} CAN be used by ${args.alignment} characters`,
        };
      } else {
        return {
          val: false,
          text: `${entity.state.real_name} can ONLY be used by ${args.alignment} characters`,
        };
      }
    },
  });
  /*
  let reqFn = entity.requirementUse.bind(entity);
  entity.state.requirement_text.use = `no ${alignment} characters can use this ${entity.state.type}`;
  entity.requirementUse = (owner) => {
    return (owner.state.alignment === alignment) !== NOT && reqFn();
  };
  return entity;
  */
}

function required_alignment_to_pickup(entity, alignment, NOT = false) {
  /*
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
  */
}

function weapon_lifesteal(entity, amount = 1) {
  /*
  let eqFn = entity.equipped.bind(entity);
  entity.equipped = (owner) => {
    return eqFn(owner);
  };
  */
  /*
  let btlSucFn = entity.onBattleSuccess.bind(entity);
  entity.onBattleSuccess = (owner, target) => {
    btlSucFn(owner, target);
    console.log(
      `${owner.state.name} used ${entity.state.name} to steal ${amount} life(s) from ${target.state.name}`
    );
    owner.changeLife(+amount);
  };
  */
}
/*
function can_steal_follower(entity, followers = ["any"], follower_not = []) {}
//TODO: requriments for checking aligment i.e can't steal from "good"/"evil"
function can_steal_follower_same_space(
  entity,
  followers = ["any"],
  follower_not = []
) {}
function can_take_follower_after_battle(
  entity,
  followers = ["any"],
  follower_not = []
) {}
*/
