import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class Player {
  constructor(posX = 0) {
    this.sfx = new Howl({
      src: ['../assets/sounds/ali_jump.mp3'],
      volume: 0.5
    });
    this.toonTextures = {};
    this.toonTextures["running"] = [];
    this.toonTextures["down"] = [];
    this.toonTextures["jump"] = [];
    this.toonTextures["up"] = [];
    this.toonTextures["fall"] = [];

    for (let i = 1; i <= 4; i++) {
      const texture = new PIXI.Texture.from(`ali_running_${i}.png`);

      this.toonTextures["running"].push(texture);
    }

    for (let i = 1; i <= 2; i++) {
      const texture = new PIXI.Texture.from(`ali_down_${i}.png`);

      this.toonTextures["down"].push(texture);
    }

    const texture = new PIXI.Texture.from(`ali_up_${1}.png`);

    this.toonTextures["jump"].push(texture);

    for (let i = 2; i <= 4; i++) {
      const texture = new PIXI.Texture.from(`ali_up_${i}.png`);

      this.toonTextures["up"].push(texture);
    }

    for (let i = 1; i <= 14; i++) {
      const texture = new PIXI.Texture.from(`ali_end_${i}.png`);

      this.toonTextures["fall"].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.running);

    this.sprite.width = window.innerHeight / 8;
    this.sprite.height = window.innerHeight / 8;
    this.sprite.x = posX === 0 ? -this.sprite.width : posX * 1.4;
    this.sprite.y = window.innerHeight - this.sprite.height - Globals.TILE_SIZE;

    this.startingPos = window.innerWidth / 4 - this.sprite.width;

    this.dy = 0;
    this.floor = null;
    this.jumpCount = 0;
    this.isDead = false;
    this.diamondsCollected = 0;
    this.isPowerUp = false;
    this.character = CHARACTERS.ALI;
    this.isImmune = true;

    setTimeout(() => {
      this.isImmune = false;
    }, 2000);

    this.running();
    this.animatePlayerFlicker();
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
    if (this.isDead) {
      //if player hits any floating obstacle
      this.fall();
      return;
    }

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

  up() {
    this.sprite.animationSpeed = 1;
    this.sprite.textures = this.toonTextures.up;
    this.sprite.loop = true;
    this.sprite.play();
  }

  down() {
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.down;
    this.sprite.loop = true;
    this.sprite.play();
  }

  fall() {
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.fall;
    this.sprite.loop = false;
    this.sprite.play();
  }

  startJump(e) {
    const canJump =
      (this.floor !== null || this.jumpCount >= 1) &&
      !this.isDead;

    // Make player jump using spacebar
    if (canJump) {
      ++this.jumpCount;
      this.floor = null;
      this.dy = -Globals.gameSpeed;

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
    
    // Player falls to the ground if there is no floor
    if (!this.floor) {
      if (this.dy <= 10) {
        if (this.jumpCount === 1) {
          //only show jump animation
          this.jump();
        } else if (this.jumpCount > 1) {
          this.up();
        }
      } else if (this.dy > 10) {
        this.down();
      }

      this.dy += Globals.gameSpeed / 15;
        
      this.sprite.y += this.dy;

      //to change to running animation when character lands
      setTimeout(() => {
        this.running();
      }, 150);
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

  //animation played when player is immune
  animatePlayerFlicker() {
    let fadeOut = true;

    const interval = setInterval(() => {
      if (fadeOut) {
        this.sprite.alpha -= 0.05;
      } else {
        this.sprite.alpha += 0.05;
      }

      if (this.sprite.alpha <= 0.2) {
        fadeOut = false;
      } else if (this.sprite.alpha >= 1) {
        fadeOut = true;
      }

      if (this.isImmune === false) {
        this.sprite.alpha = 1;
        clearInterval(interval);
      }
    }, 10);
  }
}
