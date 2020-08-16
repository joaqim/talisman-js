class Stack {
  constructor(memSize = 64) {
    this.memSize = memSize;
    this.stack = new Uint16Array(memSize);
    this.counter = 0;
  }

  validMemacc(address) {
    if (address >= this.memSize)
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
    this.stack[this.counter] = value;
    this.increment();
  }
  pop() {
    if (this.counter <= 0) throw new Error("Error: Stack under-flow");
    this.decrease();
    var val = this.stack[this.counter];
    return val;
  }
}
