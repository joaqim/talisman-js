// @depends ../Entity.js
const Mule = () =>
  new Entity("mule", "follower", [carry_limit_increase], [{ change: 4 }]);
const HorseAndCart = () =>
  new Entity(
    "horse_and_cart",
    "follower",
    [carry_limit_increase],
    [{ change: 8 }]
  );

//var horse_and_carts = new Entity("horse_and_carts", "follower");
//carry_limit_increase(horse_and_carts, 8);
