function AssetsManager(cfg) {
  images = {};

  return {
    loadAssets: loadAssets,
    getImage: getImage,
    get: getImage,
    loadImage: loadImage,
  };

  function getImage(key) {
    return key in images ? images[key] : null;
  }

  function loadImage(key, src, size = { x: null, y: null }) {
    var img = new Image();

    var d = new Promise(
      function (resolve, reject) {
        img.onload = function () {
          images[key] = img;
          resolve(img);
        }.bind(this);

        img.onerror = function () {
          reject("Could not load image: " + src);
        };
      }.bind(this)
    );

    img.src = src;
    img.width = size.x;
    img.height = size.y;
    img.style = `width: ${size.x}px; height: ${size.y}px;`;
    return d;
  }

  function loadAssets() {
    return _assets();
  }
  function _assets() {
    return Array.from({ length: cfg.assets.length }, (_v, i) =>
      loadImage(cfg.assets[i].id, cfg.assets[i].src, {
        x: cfg.assets[i].width,
        y: cfg.assets[i].height,
      })
    );
  }
}
