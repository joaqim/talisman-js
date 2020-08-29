Dice.prototype.roll = function (numDice = 1) {
  var result = numDice;
  for (let i = 0; i < numDice; i++) result += Math.floor(Math.random() * 6) + 1;
  return result;
};

Dice.prototype.castDice = async function (numDice = 1) {
  let anim = [
    // 1
    [
      { x: 60, z: 70, y: 170 },
      { x: 120, z: 130, y: 230 },
      { x: 180, z: 190, y: 290 },
      { x: 240, z: 250, y: 350 },
      { x: 300, z: 310, y: 410 },
      { x: 0, z: 10, y: 470 },
      { x: 60, z: 70, y: 530 },
      { x: 120, z: 130, y: 590 },
      { x: 180, z: 190, y: 650 },
      { x: 240, z: 250, y: 710 },
    ],
    // 2
    [{ x: 90, z: 90, y: 180 }],
    // 3
    [{ x: 90, z: 180, y: 0 }],
    // 4
    [{ x: 90, z: 0, y: 180 }],
    // 5
    [{ x: 90, z: 90, y: 0 }],
    // 6
    [{ x: 180, z: 0, y: 180 }],
    [],
  ];
  //await this.spinDice(1);

  let rots = [[270, 90, 0]];

  let x = 20;
  let z = 210;
  let y = 190;
  let roll = this.roll();
  roll = 1;

  // 6
  x += 60;
  z += 90;
  y += 30;

  //2
  //y += 90;
  //z += 90;

  let h = 117;
  let frameCount = 10;
  let animation = [[]];
  for (let frame = 0; frame < frameCount; frame++) {
    x += 190;
    z += 150;
    y += 140;

    h += 10;
    z = z % 360;
    x = x % 360;
    y = y % 360;
    h = h % 100;
    animation[0][frame] = { x, z, y, h };
    /*
    let a = anim[roll - 1][Math.min(frame, anim[roll - 1].length - 1)];

    x = a.x;
    y = a.y;
    z = a.z;
    h = a.h
    */

    el.style.WebkitTransform = `rotateX(${x}deg)rotateZ(${z}deg)rotateY(${y}deg)translateZ(${h}px)`;
    //await this._timeout(500);
  }
  console.log(JSON.stringify(animation[0]));
};

Dice.prototype.spinDice = async function (times = Number.MAX_VALUE) {
  let z = 0;
  let x = 0;
  let y = 117;
  for (let frame = 0; frame < times; frame++) {
    x += 86;
    z += 36;
    y += 10;
    z = z % 360;
    x = x % 360;
    y = y % 117;
    el.style.WebkitTransform = `rotateX(${x}deg)rotateZ(${z}deg) translateZ(${y}px)`;
    await this._timeout(500);
  }
};
Dice.prototype._timeout = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
