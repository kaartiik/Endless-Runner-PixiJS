import Globals from "./Globals.js";
import SpriteSpeed from "./SpriteSpeed.js";

export default class PowerUp extends SpriteSpeed {
  constructor(posX, posY, type, transform, randomizePowerups, removeChild) {
    super();

    this.sfx = new Howl({
      src: ['../assets/sounds/powerup.mp3'],
      volume: 0.5
    });

    const coinTexture = new PIXI.Texture.from(`${type}.png`);
    this.sprite = new PIXI.Sprite(coinTexture);
    this.sprite.width = 0.1 * window.innerWidth;
    this.sprite.height = 0.1 * window.innerWidth;

    this.sprite.x = posX;
    this.sprite.y = posY;

    this.dx = this.defaultSpeed;

    this.transform = transform;
    this.randomizePowerups = randomizePowerups;
    this.removeChild = removeChild;
  }

  checkCollision(player) {
    if (!this.sprite) {
      return;
    }

    if (this.isOverlap(player)) {
      this.transform();
      this.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
      if(!Globals.isMuted)this.sfx.play();
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

  move(spriteSpeed) {
    if (!this.sprite) return;

    this.dx = spriteSpeed;

    this.sprite.x -= this.dx;

    if (this.sprite.x <= -this.sprite.width) {
      this.removeChild(this.sprite);
      this.sprite.destroy(); //to hide the diamond from scene
      this.sprite = null;
      this.randomizePowerups();
      // this.sprite.emit('hidden');
    }
  }

  update(dt, spriteSpeed) {
    this.move(spriteSpeed);
  }
}
