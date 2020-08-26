EVENT = {
  CREATURE_DEFEATED: 0,
  CREATURE_KILLED: 1,
  CREATURE_STALEMATE: 2,
  PLAYER_DEFATED: 3,
  PLAYER_KILLED: 4,
  PLAYER_STALEMATE: 5,
  SPELL_CAST: 6,
};

const game_cfg = {
  state: {
    init: "init",
    transitions: [
      { name: "startTurn", from: ["init", "end_turn"], to: "start_turn" },
      {
        name: "movement",
        from: [
          "entity_effect",
          "card_effect",
          "tile_effect",
          "spell_effect",
          "dice_result",
          "start_turn",
          "use_entity",
        ],
        to: "move",
      },
      {
        name: "last_turn",
        from: ["battle_won", "encounter_end"],
        to: "end_turn",
      },

      // Accept dice result
      { name: "diceResult", from: "roll_dice", to: "dice_result" },
      // Reroll dice and accept result
      { name: "useFate", from: ["roll_dice"], to: "dice_result" },

      {
        // Either Item or Follower
        name: "useEntity",
        from: ["start_turn", "roll_dice", "encounter"],
        to: "use_entity",
      },
      { name: "encounter", from: "move", to: "encounter" },
      {
        name: "encounterTile",
        from: ["encounter", "defeat_creature", "evade_creature", "movement"],
        to: "tile_effect",
      },
      {
        name: "encounterDrawTile",
        from: "encounter",
        to: "encounter_draw_tile",
      },
      {
        name: "encounterCharacter",
        from: "encounter",
        to: "encounter_character",
      },
      {
        name: "engageBattle", // Start battle
        from: [
          "encounter_character",
          "encounter_creature",
          "card_effect",
          "tile_effect",
          "spell_effect",
        ],
        to: "engage_battle",
      },
      { name: "battleLost", from: "engage_battle", to: "battle_lost" },
      { name: "battleWon", from: "engage_battle", to: "battle_won" },
      {
        name: "battleStalemate",
        from: "engage_battle",
        to: "end_turn",
      },
      {
        name: "specialAbility",
        from: [
          "encounter",
          "encounter_character",
          "encounter_creature",
          "encounter_card",
          "engage_creature",
          "engage_character",
          "roll_dice",
        ],
      },
      { name: "applyChanges", from: "encounter_end" },
      {
        name: "missTurn",
        from: ["start_turn", "tile_effect", "spell_effect", "card_effect"],
        to: "end_turn",
      },
      {
        name: "drawCard",
        from: ["encounter_draw_tile", "card_effect", "tile_effect"],
        to: "draw_card",
      },
      { name: "mulliganCard", from: "draw_card", to: "mulligan_card" },
      {
        name: "encounterCard",
        from: ["encounter", "tile_effect", "encounter_draw_tile", "draw_card"],
        to: "card_effect",
      },
      {
        name: "rollDice",
        from: [
          "start_turn",
          "entity_effect",
          "card_effect",
          "tile_effect",
          "spell_effect",
          "movement",
        ],
        to: "roll_dice",
      },

      {
        name: "endTurn",
        from: ["encounter_end", "battle_stalemate", "battle_end"],
      },
      //{ name: "drawCard", from: "card_event",to: "" },
    ],
  },
  events: [
    // Defeated -> [killed, stalemate -> turn end] ( you can be force to stalemate by spells )
    {
      event: EVENT.CREATURE_DEFEATED,
      action: function (creature, by) {
        this.onCreatureWon(creature, by);
      },
    },
    {
      event: EVENT.CREATURE_KILLED,
      action: function (creature, by) {
        this.onCreatureKilled(creature, by);
      },
    },
    {
      event: EVENT.CREATURE_STALEMATE,
      action: function (creature, by) {
        this.onCreatureStalemate(creature, by);
      },
    },
    {
      event: EVENT.PLAYER_DEFEATED,
      action: function (creature, by) {
        this.onPlayerDefeated(character, by);
      },
    },
    {
      event: EVENT.PLAYER_KILLED,
      action: function (creature, by) {
        this.onPlayerKilled(character, by);
      },
    },
    {
      event: EVENT.PLAYER_STALEMATE,
      action: function (creature, by) {
        this.onPlayerStalemate(character, by);
      },
    },
    {
      event: EVENT.SPELL_CAST,
      action: function (character, by, target = null) {
        this.onSpellCast(character, by, target);
      },
    },
    {
      event: EVENT.ENTITY_USED,
      action: function (character, by, target = null) {
        this.onEntityUsed(character, by, target);
      },
    },

    // can be affected by spells
    {
      event: EVENT.ROLL_DIE,
      action: function (by) {
        this.onRollDie(by);
      },
    },
    {
      event: EVENT.PLAYER_ROLL_DIE,
      action: function (by) {
        this.onPlayerRollDie(by);
      },
    },
    {
      // Maybe superflous
      event: EVENT.PLAYER_DICE_RESULT,
      action: function (by) {
        this.onPlayerRollDie(by);
      },
    },
    {
      event: EVENT.PLAYER_MOVE,
      action: function (by) {
        this.onPlayerMove(by);
      },
    },

    {
      event: EVENT.PLAYER_DRAW_CARD,
      action: function (by) {
        this.onPlayerDrawCard(by);
      },
    },
    {
      event: EVENT.PLAYER_DRAW_SPELL,
      action: function (by) {
        this.onPlayerDrawSpell(by);
      },
    },
  ],
};
