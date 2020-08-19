EVENT = {
  CREATURE_DEFEATED: 0,
  CREATURE_KILLED: 1,
  CREATURE_STALEMATE: 2,
  PLAYER_DEFATED: 3,
  PLAYER_KILLED: 4,
  PLAYER_STALEMATE: 5,
  SPELL_CAST: 6,
};

var cfg = {
	state: {
		initial: 'init',
	events: [
    { name: 'start turn', from: 'init', to: 'turn_start' },
    { name: 'roll dice',
        from: ['turn_start','entity_effect','card_effect','board_effect','spell_effect'],
        to: 'roll_die' },

    { name: 'move',
      from: ['entity_effect','card_effect','board_effect','spell_effect'],
      to: 'moving'
    },

    { name: 'end turn', from: 'combat'},
    { name: 'draw card', from: 'card_event'},
    { name: 'move', from: 'booting', to: 'moving' },
    { name: 'use_item', from: 'booting', to: 'moving' },
	]
	},
  pubsub: [
    // Defeated -> [killed, stalemate -> turn end] ( you can be force to stalemate by spells )
    { event: EVENT.CREATURE_DEFEATED, action: function(creature, by) {this.onCreatureWon(creature, by); }},
    { event: EVENT.CREATURE_KILLED, action: function(creature, by) {this.onCreatureKilled(creature, by); }},
    { event: EVENT.CREATURE_STALEMATE, action: function(creature, by) {this.onCreatureStalemate(creature, by); }},
    { event: EVENT.PLAYER_DEFEATED, action: function(creature, by) {this.onPlayerDefeated(character, by); }},
    { event: EVENT.PLAYER_KILLED, action: function(creature, by) {this.onPlayerKilled(character, by); }},
    { event: EVENT.PLAYER_STALEMATE, action: function(creature, by) {this.onPlayerStalemate(character, by); }},

    { event: EVENT.SPELL_CAST, action: function(character, by, target = null) {this.onSpellCast(character, by, target); }},
    { event: EVENT.ENTITY_USED, action: function(character, by, target = null) {this.onEntityUsed(character, by, target); }},

    // can be affected by spells
    { event: EVENT.ROLL_DIE, action: function(by) {this.onRollDie(by); }},
    { event: EVENT.PLAYER_ROLL_DIE, action: function(by) {this.onPlayerRollDie(by); }},
    { event: EVENT.PLAYER_MOVE, action: function(by) {this.onPlayerMove(by); }},

    { event: EVENT.PLAYER_DRAW_CARD,action: function(by) {this.onPlayerDrawCard(by); }},
    { event: EVENT.PLAYER_DRAW_SPELL,action: function(by) {this.onPlayerDrawSpell(by); }},
  ]
}

