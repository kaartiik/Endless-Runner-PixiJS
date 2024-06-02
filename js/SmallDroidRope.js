import Floor from "./Floor.js";
import Globals from "./Globals.js";

export default class SmallDroidRope {
  constructor(posX, removeChild) {
    const DOWN = "down";
    const FALL = "fall";

    this.toonTextures = {};
    this.toonTextures[DOWN] = [];
    this.toonTextures[FALL] = [];

    this.sfx = new Howl({
      src: ['../assets/sounds/henchmen.mp3'],
    });

    for (let i = 1; i <= 8; i++) {
      const texture = new PIXI.Texture.from(`droid_small_rope_${i}.png`);

      this.toonTextures[DOWN].push(texture);
    }

    for (let i = 9; i <= 13; i++) {
      const texture = new PIXI.Texture.from(`droid_small_rope_${i}.png`);

      this.toonTextures[FALL].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.down);

    this.sprite.width = window.innerHeight / 3;
    this.sprite.height = window.innerHeight / 3;
    this.sprite.x = posX;
    this.sprite.y = 0;

    this.scored = false;

    this.startingPos = window.innerWidth / 4 - this.sprite.width;

    this.dy = 0;
    this.floor = new Floor();

    this.dx = Globals.gameSpeed;

    this.removeChild = removeChild;

    this.down();
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

  get nextBottom() {
    return this.bottom + this.dy;
  }

  down() {
    this.sprite.animationSpeed = 0.1;
    this.sprite.textures = this.toonTextures.down;
    this.sprite.loop = false;
    this.sprite.play();
  }

  fall() {
    this.sprite.animationSpeed = 1;
    this.sprite.textures = this.toonTextures.fall;
    this.sprite.loop = false;
    this.sprite.play();
  }

  move() {
    if (!this.sprite) return;

    this.sprite.x -= this.dx;

    if (this.sprite.x <= -500) {
      //to hide the sprite
      this.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
      // this.sprite.emit('hidden');
    }
  }

  checkCollision(player, obstacleScore) {
    if (!this.sprite) return;

    if (this.isOverlap(player)) {
      if (!this.scored) {
        obstacleScore.updateScore();
        this.scored = true;
        if(!Globals.isMuted && !this.sfx.isPlaying)this.sfx.play();
      }
      this.fall();
      this.floor = null;
      this.dy = this.sprite.y;
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

  update(dt) {
    this.move();

    // Rope droid falls to the ground if there is no floor
    if (!this.floor && this.sprite) {
      this.dy += 0.2;
      this.sprite.y += this.dy;
    }
  }

  stayOnFloor(floor) {
    this.floor = floor;
    this.dy = 0;
    this.sprite.y = floor.top - this.sprite.height;
  }
}
