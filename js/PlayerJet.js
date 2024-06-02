import { CHARACTERS } from "./constants.js";
import Floor from "./Floor.js";
import Globals from "./Globals.js";

export default class PlayerJet {
  constructor(floor) {
    this.toonTextures = {};
    this.toonTextures["running"] = [];
    this.toonTextures["jump"] = [];

    this.sfx = new Howl({
      src: ['../assets/sounds/jett_jetpack.mp3'],
      volume: 0.5
    });

    for (let i = 1; i <= 3; i++) {
      const texture = new PIXI.Texture.from(`jet_flying_${i}.png`);

      this.toonTextures["running"].push(texture);
    }

    for (let i = 1; i <= 3; i++) {
      const texture = new PIXI.Texture.from(`jet_flying_upsidedown_${i}.png`);

      this.toonTextures["jump"].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.running);

    this.startingPos = window.innerWidth / 4 - this.sprite.width;

    this.sprite.width = window.innerHeight / 10;
    this.sprite.height = window.innerHeight / 10;
    this.sprite.x = this.startingPos;
    this.sprite.y = Globals.TILE_SIZE;
    this.bottomY = floor.top - this.sprite.height * 1.2;

    this.dy = 0;
    this.jumpCount = 0;
    this.isDead = false;
    this.diamondsCollected = 0;
    this.character = CHARACTERS.JET;
    this.flyUp = true;

    this.ceiling = null;

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

  get nextTop() {
    return this.top - this.dy;
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

  startJump(e) {
    const canJump = !this.isDead && this.sprite.x >= this.startingPos;

    // Make player jump using spacebar
    if (canJump) {
      this.flyUp = !this.flyUp;
      this.dy = Globals.gameSpeed / 4;
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

    if (this.flyUp) {
      if (this.sprite.y > Globals.TILE_SIZE) {
        this.sprite.y -= this.dy * dt;
      }
    } else {
      if (this.sprite.y < this.bottomY) {
        this.sprite.y += this.dy * dt;
      }
    }
  }

  //ceiling
  stayOnTop(ceiling) {
    this.ceiling = ceiling;
    this.dy = 0;
    this.jumpCount = 0;
    this.sprite.y = Globals.TILE_SIZE;
  }

  collectDiamond() {
    this.diamondsCollected += 1;
  }
}
