export default class ImageSprite extends PIXI.Sprite {
  constructor(texture, x, y, width, height) {
    super(texture);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.left + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.top + this.height;
  }
}
