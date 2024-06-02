export default class Grid {
  constructor() {
    this.rows = 16;
    this.columns = 20;
    this.tileWidth = window.innerWidth / this.columns;
    this.tileHeight = window.innerHeight / this.rows;
    this.startX = window.innerWidth;
    this.startY = 0;
    //Each array within represents a row. Items within an array represents a column
    this.matrix = []; //{ type, numberTile, shift row, col, x, y};
    this.init();
  }

  init() {
    let yOffset = this.startY;
    // Initialize the two-dimensional tile array
    for (var row = 0; row < this.rows; row++) {
      if (row > 0) {
        yOffset += this.tileHeight;
      }

      this.matrix[row] = [];
      let xOffset = this.startX;
      for (var col = 0; col < this.columns; col++) {
        if (col > 0) {
          xOffset += this.tileWidth;
        }
        // Define a tile type and a shift parameter for animation
        this.matrix[row][col] = {
          row,
          col,
          x: xOffset,
          y: yOffset,
        };
      }
    }
  }
}
