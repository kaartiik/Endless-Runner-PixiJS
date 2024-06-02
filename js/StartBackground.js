import Globals from "./Globals.js";

export default class StartBackground {
  constructor() {
    this.speed = 10;
    this.container = new PIXI.Container();
    this.createSprite();
  }

  createSprite() {
    const texture = PIXI.Texture.from(`title_bg.png`);
    const sprite = new PIXI.Sprite(texture);
    sprite.width = window.innerWidth;
    sprite.height = window.innerHeight;
    sprite.x = 0;
    sprite.y = 0;
    this.container.addChild(sprite);
  }

  move(sprite, offset) {
    const spriteRightX = sprite.x + sprite.width;

    const screenLeftX = 0;

    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }

    sprite.x -= offset;
  }

  update(dt) {
    const offset = this.speed * dt;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }
}
