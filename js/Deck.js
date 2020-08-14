class Deck {
  constructor() {}

  shuffle() {
    const { deck } = this;
    let m = deck.length;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }
    return this;
  }

  draw() {
    return this.deck.pop();
  }
}
