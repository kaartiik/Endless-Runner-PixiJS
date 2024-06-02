export default class SpriteSpeed {
  constructor() {
    this.dx = 10;
  }

  get defaultSpeed() {
    return this.dx;
  }

  set defaultSpeed(value) {
    this.dx += value;
  }

  set definiteSpeed(value) {
    this.dx = value;
  }
}
