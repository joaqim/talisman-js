Game.prototype.onInit = function () {
  console.log("init");

  // Return false, otherwise onInit get's called twice
  return false;
};
