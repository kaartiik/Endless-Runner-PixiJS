import Globals from "./Globals.js";
import SpriteSpeed from "./SpriteSpeed.js";

export default class Background extends SpriteSpeed {
  constructor() {
    super();

    this.speed = this.defaultSpeed;
    this.container = new PIXI.Container();
    this.createSprites();
  }

  createSprites() {
    this.sprites = [];

    this.nextSpriteX = 0;
    for (let i = 0; i <= 16; i++) {
      let texture = PIXI.Texture.from(
        `../assets/images/background/game_bg_${i}.png`
      );
      this.nextSpriteX = this.createSprite(this.nextSpriteX, texture);
    }
  }

  createSprite(xPos, texture) {
    const sprite = new PIXI.Sprite(texture);
    sprite.width = window.innerHeight * 5;
    sprite.height = window.innerHeight;
    sprite.x = xPos;
    sprite.y = 0;
    this.container.addChild(sprite);
    this.sprites.push(sprite);
    return sprite.x + sprite.width;
  }

  move(sprite, idx, offset) {
    const spriteRightX = sprite.x + sprite.width;

    const screenLeftX = 0;

    sprite.x -= offset;

    if (spriteRightX <= screenLeftX) {
      //console.log("before adding idxs", this.nextSpriteX);
      //places sprite bg at the back of the list once it is displayed
      sprite.x = this.nextSpriteX - sprite.width;
    }
  }

  update(dt, spriteSpeed) {
    this.speed = spriteSpeed;
    const offset = this.speed * dt;

    this.sprites.forEach((sprite, idx) => {
      this.move(sprite, idx, offset);
    });
  }
}
