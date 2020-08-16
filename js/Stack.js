class Stack {
  constructor(memSize = 64) {
    this.memSize = memSize;
    //this.stack = new Uint16Array(memSize);
    this.stack = new Array(memSize);
    this.counter = 0;
  }

  validMemacc(address) {
    if (address >= this.memSize || address < 0)
      throw new Error(`Error: no valid memory access at address: ${address}`);
  }
  increment(value = 1) {
    this.counter += value;
  }
  decrease(value = 1) {
    this.counter -= value;
  }
  push(value) {
    this.validMemacc(this.counter + 1);
    this.increment();
    this.stack[this.counter] = value;
  }
  pop() {
    if (this.counter <= 0) throw new Error("Error: Stack under-flow");
    var val = this.stack[this.counter];
    this.decrease();
    return val;
  }
  peek(address) {
    return this.stack[address];
  }
  top() {
    return this.peek(this.counter);
  }
}
