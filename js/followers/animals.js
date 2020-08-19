// @depends ../Entity.js
const mule = () => new Entity("mule", "follower", [carry_limit_increase], [4]);
const horse_and_cart = () =>
  new Entity("horse_and_cart", "follower", [carry_limit_increase], [8]);

//var horse_and_carts = new Entity("horse_and_carts", "follower");
//carry_limit_increase(horse_and_carts, 8);
