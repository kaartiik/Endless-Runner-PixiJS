import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";
import SpriteSpeed from "./SpriteSpeed.js";

export default class Coin extends SpriteSpeed {
  constructor(posX, posY, floor, removeChild) {
    super();

    const coinTexture = new PIXI.Texture.from(
      `../assets/images/coins/coin.png`
    );
    this.sfx= new Howl({
      src: ['../assets/sounds/coins.mp3'],
      volume: 0.3
    });
    this.sprite = new PIXI.Sprite(coinTexture);
    this.sprite.width = Globals.TILE_SIZE;
    this.sprite.height = Globals.TILE_SIZE;

    this.sprite.x = posX;
    this.sprite.y = posY;

    this.dx = this.defaultSpeed;
    this.dy = 9;

    this.player = null;
    this.floor = floor;

    this.removeChild = removeChild;
  }

  checkCollision(player, coinsScore) {
    if (!this.sprite) {
      return;
    }

    if (this.isOverlap(player)) {
      player.collectDiamond();
      coinsScore.updateScore();
      if(!Globals.isMuted)this.sfx.play();
      this.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
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

    //coins float towards comot
    if (this.player.character === CHARACTERS.COMOT) {
      let a = this.sprite.x - this.player.sprite.x;
      let b = this.sprite.y - this.player.sprite.y;
      let c = Math.sqrt(a * a + b * b);
      if (c < Globals.TILE_SIZE * 7) {
        if (this.sprite.x > this.player.sprite.x) {
          this.sprite.x -= 13;
        } else {
          this.sprite.x = this.player.sprite.x;
        }

        if (
          this.sprite.y >= this.player.sprite.y &&
          this.sprite.y >= Globals.TILE_SIZE
        ) {
          this.sprite.y -= this.dy;
        } else if (
          this.sprite.y < this.player.sprite.y &&
          this.sprite.y <= this.floor.top
        ) {
          this.sprite.y += this.dy;
        }
      }
    }

    if (this.sprite.x <= -this.sprite.width) {
      this.removeChild(this.sprite);
      this.sprite.destroy(); //to hide the diamond from scene
      this.sprite = null;
      // this.sprite.emit('hidden');
    }
  }

  update(dt, spriteSpeed, player) {
    this.player = player;
    this.move(spriteSpeed);
  }
}
