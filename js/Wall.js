import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";
import SpriteSpeed from "./SpriteSpeed.js";

export default class Wall extends SpriteSpeed {
  constructor(posX, type, height, isBottom, removeChild) {
    super();
    
    this.sfx = new Howl({
      src: ['../assets/sounds/bump.mp3'],
    });

    const texture = new PIXI.Texture.from(`obstacles_${type}.png`);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.width = Globals.TILE_SIZE * 3;
    this.sprite.height = height;
    // this.sprite.tint = 0xff0000;

    this.sprite.x = window.innerWidth + posX;
    this.sprite.y = isBottom ? window.innerHeight - this.sprite.height : -10;

    if (this.sprite.y === -10) this.sprite.anchor.set(1, 1);

    this.sprite.angle = this.sprite.y === -10 ? 180 : 0;

    this.dx = this.defaultSpeed;

    this.removeChild = removeChild;
  }

  get left() {
    return this.sprite.x + 10;
  }

  get right() {
    return this.sprite.x + this.sprite.width - 10;
  }

  get top() {
    return this.sprite.y + 50;
  }

  get bottom() {
    return this.sprite.y + this.sprite.height - 50;
  }

  move(spriteSpeed) {
    if (!this.sprite) return;

    this.dx = spriteSpeed;

    this.sprite.x -= this.dx;

    if (this.sprite.x <= -this.sprite.width) {
      this.destroySprite();
      // this.sprite.emit('hidden');
    }
  }

  destroySprite() {
    this.removeChild(this.sprite);
    this.sprite.destroy();
    this.sprite = null;
  }

  checkCollision(player, switchToNormalPlayer, clearSprites) {
    if (!this.sprite) return;

    if (this.isOverlap(player) && !player.isImmune) {
      this.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
      if(!Globals.isMuted)this.sfx.play();
      if (player.character === CHARACTERS.ALI) {
        clearSprites();
        player.sprite.emit("die");
        player.isDead = true;
      } else if (player.character !== CHARACTERS.ZASS) {
        switchToNormalPlayer();
      }
    }
  }

  isOverlap(player) {
    return (
      player.bottom >= this.top &&
      player.top <= this.bottom &&
      player.right >= this.left &&
      player.left <= this.right
    );
  }

  update(dt, spriteSpeed) {
    this.move(spriteSpeed);
  }
}
