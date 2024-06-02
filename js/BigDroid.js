import Globals from "./Globals.js";

export default class BigDroid {
  constructor(posX, removeChild) {
    const WALK = "walk";
    const FALL = "fall";

    this.toonTextures = {};
    this.toonTextures[WALK] = [];
    this.toonTextures[FALL] = [];

    this.sfx = new Howl({
      src: ['../assets/sounds/bump.mp3'],
    });

    for (let i = 1; i <= 4; i++) {
      const texture = new PIXI.Texture.from(`droid_big_walking_${i}.png`);

      this.toonTextures[WALK].push(texture);
    }

    for (let i = 1; i <= 8; i++) {
      const texture = new PIXI.Texture.from(`droid_big_fall_${i}.png`);

      this.toonTextures[FALL].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.walk);

    this.sprite.width = window.innerHeight / 5;
    this.sprite.height = window.innerHeight / 5;
    this.sprite.x = posX;
    this.sprite.y = window.innerHeight - this.sprite.height - Globals.TILE_SIZE;

    this.isSpriteFlipped = Math.random() < 0.5 ? true : false;

    this.sprite.scale.x = this.isSpriteFlipped ? -1 : 1;

    this.startingPos = window.innerWidth / 4 - this.sprite.width;

    this.dy = 0;
    this.floor = null;
    this.jumpCount = 0;
    this.isDead = false;
    this.diamondsCollected = 0;

    this.scored = false;

    this.dx = this.isSpriteFlipped ? Globals.gameSpeed + 1 : Globals.gameSpeed - 2;

    this.removeChild = removeChild;

    this.walk();
    console.log(this.sprite.width,this.sprite.height)
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

  walk() {
    this.sprite.animationSpeed = 0.1;
    this.sprite.textures = this.toonTextures.walk;
    this.sprite.loop = true;
    this.sprite.play();
  }

  fall() {
    this.sprite.animationSpeed = 1.5;
    this.sprite.textures = this.toonTextures.fall;
    this.sprite.loop = false;
    this.sprite.play();
  }

  move() {
    if (!this.sprite) return;
    this.sprite.width = window.innerHeight / 5;
    this.sprite.x -= this.dx;

    if (this.sprite.x <= -this.sprite.width) {
      this.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
      // this.sprite.emit('hidden');
    }
  }

  checkCollision(player, obstacleScore) {
    if (!this.sprite) return;

    if (this.isOverlap(player)) {
      this.fall();
      if (!this.scored) {
        obstacleScore.updateScore();
        this.scored = true;
        if(!Globals.isMuted && !this.sfx.isPlaying)this.sfx.play();
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

  update(dt) {
    this.move();
  }
}
