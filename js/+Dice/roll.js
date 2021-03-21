Dice.prototype.roll = function (numDice = 1) {
  var result = numDice;
  for (let i = 0; i < numDice; i++) result += Math.floor(Math.random() * 5) + 1;
  return result;
};

Dice.prototype.playAnimation = async function (dice_result = 0) {
  //console.log(talisman["export"][0]);
  //a = anim[0];

  //a = talisman.export[0];
  //console.log(JSON.stringify(a, null, 2));

  let anim_index = Math.floor(Math.random() * 4) + 1;
  anim_index = 2;
  console.log(anim_index, dice_result);
  let anim = talisman[`dice_animation_${anim_index}`];
  let frameCount = anim.frame_count;
  for (let frame = 0; frame < frameCount; frame++) {
    a = anim.data[frame];
    //console.log(JSON.stringify(a, null, 2));

    //dice_result = 5;
    result = [
      `rotateY(270deg)`, // 1
      `rotateY(180deg)`, // 2
      `rotateX(270deg)`, // 3
      `rotateX(90deg)`, // 4
      ``, // 5
      `rotateY(90deg)`, // 6
    ];

    //rotateX(0deg) rotateZ(90deg) rotateY(0deg) translateZ(-800px)
    webkit = `
    translateZ(-800px)
    rotateX(35deg)
    translate3d(${a[4][0] * 40}px,${a[4][1] * 40}px,${a[4][2] * 40}px)
    ${result[dice_result - 1]}
    matrix3d(
    ${a[0][0]},${a[0][1]},${a[0][2]},${a[0][3]},
    ${a[1][0]},${a[1][1]},${a[1][2]},${a[1][3]},
    ${a[2][0]},${a[2][1]},${a[2][2]},${a[2][3]},
    ${a[3][0]},${a[3][1]},${a[3][2]},${a[3][3]})`;
    //console.log(webkit);

    el.style.WebkitTransform = webkit;

    await this._timeout(25);
  }
};

Dice.prototype.spinDice = async function (times = Number.MAX_VALUE) {
  let z = 0;
  let x = 0;
  let y = 117;
  for (let frame = 0; frame < times; frame++) {
    x += 86;
    z += 36;
    /*
    x += 2.6;
    z += 1.6;
    */
    z = z % 360;
    y = y % 117;
    el.style = "transition: 0.5s linear";
    el.style.WebkitTransform = `rotateX(${x}deg)rotateZ(${z}deg)`;
    await this._timeout(500);
  }
};

Dice.prototype._timeout = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
