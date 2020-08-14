var Loader = {
  images: {},
};

Loader.loadImage = function (key, src, size = null) {
  var img = new Image();

  var d = new Promise(
    function (resolve, reject) {
      img.onload = function () {
        this.images[key] = img;
        resolve(img);
      }.bind(this);

      img.onerror = function () {
        reject("Could not load image: " + src);
      };
    }.bind(this)
  );

  img.src = src;
  if (size !== null) {
    //img.style.width = `${size.width}px`;
    //img.style.height = `${size.height}px`;
    img.width = size.width;
    img.height = size.height;
  }
  return d;
};

Loader.getImage = function (key) {
  return key in this.images ? this.images[key] : null;
};
