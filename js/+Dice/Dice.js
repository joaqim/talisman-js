function Dice() {
  el = document.getElementById("dice");

  return { spinDice: spinDice };

  async function spinDice() {
    let z = 0;
    let x = 0;
    let y = 117;
    while (true) {
      x += 86;
      z += 36;
      y += 10;
      z = z % 360;
      x = x % 360;
      y = y % 117;
      el.style.WebkitTransform = `rotateX(${x}deg)rotateZ(${z}deg) translateZ(${y}px)`;
      await _timeout(1500);
    }
  }
  function _timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
