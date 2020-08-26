Deck.prototype.draw = function (amount = 1) {
  return this.cards.splice(this.cards.length - amount, amount);
};
