import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class Rocket {
  constructor(rocketPos, removeChild) {
    this.toonTextures = {};
    this.toonTextures["fly"] = [];

    this.sfx = new Howl({
      src: ['../assets/sounds/rocket.mp3'],
    });

    for (let i = 1; i <= 2; i++) {
      const texture = new PIXI.Texture.from(`Rocket_${i}.png`);

      this.toonTextures["fly"].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.fly);
    this.sprite.width = Globals.TILE_SIZE + 30;
    this.sprite.height = Globals.TILE_SIZE;

    this.sprite.x = window.innerWidth + rocketPos.x;
    this.sprite.y = rocketPos.y;

    this.sprite.animationSpeed = 1;
    this.sprite.loop = true;
    this.sprite.play();

    this.dx = Globals.gameSpeed * 1.5;
    // this.playSfx()

    this.removeChild = removeChild;
  }

  get left() {
    return this.sprite.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }

  move(dt) {
    if (!this.sprite) return;

    let offset = Globals.isMobile() ? this.dx * dt : this.dx;
    this.sprite.x -= offset;

    if (this.sprite.x <= -this.sprite.width) {
      this.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
      // this.sprite.emit('hidden');
    }
  }

  checkCollision(player, switchPlayer, clearSprites) {
    if (!this.sprite) return;

    if (this.isOverlap(player) && !player.isImmune) {
      this.destroySprite();
      if(!Globals.isMuted && !this.sfx.isPlaying)this.sfx.play();
      if (player.character === CHARACTERS.ALI) {
        clearSprites();
        player.sprite.emit("die");
        player.isDead = true;
      } else if (player.character !== CHARACTERS.ZASS) {
        switchPlayer();
      }
    }
  }

  destroySprite() {
    this.removeChild(this.sprite);
    this.sprite.destroy();
    this.sprite = null;
  }

  isOverlap(player) {
    return (
      player.bottom >= this.top &&
      player.top <= this.bottom &&
      player.right >= this.left &&
      player.left <= this.right
    );
  }

  update(dt) {
    this.move(dt);
  }

  playSfx() {
    Globals.resources.watchOut.sound.play({
      vol: 0.05,
    });
  }
}
