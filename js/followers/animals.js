// @depends ../+Entities/Follower.js
const Mule = () =>
  new Follower(
    "mule",
    "Mule",
    "follower",
    "Animal",
    [carry_limit_increase],
    [{ change: 4 }]
  );
const HorseAndCart = () =>
  new Follower(
    "horse_and_cart",
    "follower",
    [carry_limit_increase],
    [{ change: 8 }]
  );

