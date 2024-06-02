import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class PlayerBakar {
  constructor() {
    this.toonTextures = {};
    this.toonTextures["running"] = [];
    this.toonTextures["down"] = [];
    this.toonTextures["jump"] = [];

    this.sfx = new Howl({
      src: ['../assets/sounds/bakar_jump.mp3'],
      volume: 0.5
    });

    for (let i = 1; i <= 4; i++) {
      const texture = new PIXI.Texture.from(`bakar_running_${i}.png`);

      this.toonTextures["running"].push(texture);
    }

    for (let i = 1; i <= 3; i++) {
      const texture = new PIXI.Texture.from(`bakar_falling_${i}.png`);

      this.toonTextures["down"].push(texture);
    }

    for (let i = 1; i <= 3; i++) {
      const texture = new PIXI.Texture.from(`bakar_up_${1}.png`);

      this.toonTextures["jump"].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.running);

    this.startingPos = window.innerWidth / 4 - Globals.TILE_SIZE;

    this.sprite.width = window.innerHeight / 7;
    this.sprite.height = window.innerHeight / 7;
    this.sprite.x = this.startingPos;
    this.sprite.y = window.innerHeight - this.sprite.height - Globals.TILE_SIZE;

    this.dy = 0;
    this.floor = null;
    this.jumpCount = 0;
    this.isDead = false;
    this.diamondsCollected = 0;
    this.isPowerUp = true;
    this.character = CHARACTERS.BAKAR;

    this.running();
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

  running() {
    this.sprite.animationSpeed = 0.1;
    this.sprite.textures = this.toonTextures.running;
    this.sprite.loop = true;
    this.sprite.play();
  }

  jump() {
    this.sprite.animationSpeed = 1;
    this.sprite.textures = this.toonTextures.jump;
    this.sprite.loop = true;
    this.sprite.play();
  }

  down() {
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.down;
    this.sprite.loop = true;
    this.sprite.play();
  }

  startJump(e) {
    const canJump =
      this.floor !== null &&
      this.jumpCount === 0 &&
      !this.isDead &&
      this.sprite.x >= this.startingPos;

    // Make player jump using spacebar
    if (canJump) {
      ++this.jumpCount;
      this.floor = null;
      this.dy = -Globals.gameSpeed * 2.5;
      if(!Globals.isMuted)this.sfx.play();
    }
  }

  update(dt) {
    if(Math.abs(this.sprite.x - this.startingPos) < Globals.gameSpeed / 5){
      this.sprite.x = this.startingPos;
    } else {
      if (this.sprite.x < this.startingPos ) {
        this.sprite.x += Globals.gameSpeed / 5;
      } else if (this.sprite.x > this.startingPos) {
        this.sprite.x -= Globals.gameSpeed / 5;
      }
    }
    console.log(this.startingPos, this.sprite.x)

    // Player falls to the ground if there is no floor
    if (!this.floor) {
      if (this.dy <= 10) {
        //only show jump animation
        this.jump();
      } else if (this.dy > 10) {
        this.down();

        //to change to running animation when character lands
        setTimeout(() => {
          this.running();
        }, 150);
      }

      this.dy += Globals.gameSpeed / 15;
      this.sprite.y += this.dy;
    }
  }

  stayOnFloor(floor) {
    this.floor = floor;
    this.dy = 0;
    this.jumpCount = 0;
    this.sprite.y = floor.top - this.sprite.height;
  }

  bounceOffCeiling() {
    if (this.sprite.y < Globals.TILE_SIZE) {
      this.sprite.y = Globals.TILE_SIZE;
      this.dy += Globals.gameSpeed / 15;
    }
  }

  collectDiamond() {
    this.diamondsCollected += 1;
  }
}
