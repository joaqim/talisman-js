class Map {
  constructor() {
    const MAP_RATIO = 1.5138797091870455;
    this.state = {
      image: Loader.getImage("talisman_board"),
      width: 640 * MAP_RATIO,
      height: 640,
      tsize: 640 / 7,
      cols: 7,
      rows: 7,
    };
  }
}
