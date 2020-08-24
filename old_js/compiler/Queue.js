class Node {
  constructor() {
    this.item;
    this.next;
  }
}
class Queue {
  constructor() {
    this.first = new Node();
    this.last = new Node();
    this._counter = 0;
  }

  toArray() {
    let firstNode = this.first;
    let oldFirst;

    return [...Array(this._counter)].map(() => {
      oldFirst = firstNode;
      firstNode = firstNode.next;
      return oldFirst.item;
    });
  }
  isEmpty() {
    return this._counter == 0;
  }

  size() {
    return this._counter;
  }

  enqueue(item) {
    let oldLast = this.last;
    this.last = new Node();
    this.last.item = item;

    if (this.isEmpty()) {
      this.first = this.last;
    } else oldLast.next = this.last;
    this._counter++;
  }

  dequeue() {
    const item = this.first.item;
    first = this.first.next;
    this._counter--;
    if (this.isEmpty()) this.last = null;
    return item;
  }

  front() {
    return this.first.item;
  }
}
