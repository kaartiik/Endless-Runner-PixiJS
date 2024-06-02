import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class PlayerZass {
  constructor(switchToNormalPlayer) {
    this.toonTextures = {};
    this.toonTextures["running"] = [];
    this.toonTextures["speed3"] = [];
    this.toonTextures["speed2"] = [];
    this.toonTextures["speed1"] = [];

    this.sfx = new Howl({
      src: ['../assets/sounds/zass.mp3'],
      volume: 0.5
    });

    for (let i = 1; i <= 2; i++) {
      const texture = new PIXI.Texture.from(`Zass_${i}.png`);

      this.toonTextures["running"].push(texture);
    }

    for (let i = 3; i <= 5; i++) {
      const texture = new PIXI.Texture.from(`Zass_${i}.png`);

      this.toonTextures["speed3"].push(texture);
    }

    for (let i = 6; i <= 7; i++) {
      const texture = new PIXI.Texture.from(`Zass_${i}.png`);

      this.toonTextures["speed2"].push(texture);
    }

    for (let i = 8; i <= 12; i++) {
      const texture = new PIXI.Texture.from(`Zass_${i}.png`);

      this.toonTextures["speed1"].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.running);

    this.startingPos = window.innerWidth / 4 - this.sprite.x;

    this.sprite.width = window.innerWidth / 2;
    this.sprite.height = window.innerHeight / 5.5;
    this.sprite.x = this.startingPos;
    this.sprite.y = (window.innerHeight / 2) - (this.sprite.height/2);

    this.dy = 0;
    this.floor = null;
    this.jumpCount = 0;
    this.isDead = false;
    this.diamondsCollected = 0;
    this.isPowerUp = true;
    this.character = CHARACTERS.ZASS;

    this.switchToNormalPlayer = switchToNormalPlayer;

    this.running();
    if(!Globals.isMuted)this.sfx.play();
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
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.running;
    this.sprite.loop = true;
    this.sprite.play();

    setTimeout(() => {
      this.speed3();
    }, 3000);
  }

  speed3() {
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.speed3;
    this.sprite.loop = true;
    this.sprite.play();

    setTimeout(() => {
      this.speed2();
    }, 3000);
  }

  speed2() {
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.speed2;
    this.sprite.loop = true;
    this.sprite.play();

    setTimeout(() => {
      this.speed1();
    }, 2000);
  }

  speed1() {
    this.sprite.animationSpeed = 0.05;
    this.sprite.textures = this.toonTextures.speed1;
    this.sprite.loop = false;
    this.sprite.play();

    this.sprite.onComplete = this.switchToNormalPlayer();
  }

  startJump(e) {
    const canJump =
      this.floor !== null &&
      this.jumpCount === 0 &&
      !this.isDead &&
      this.sprite.x >= this.startingPos &&
      this.character !== CHARACTERS.ZASS;

    // Make player jump using spacebar
    if (canJump) {
      ++this.jumpCount;
      this.floor = null;
      this.dy = -19;

      // Play jump sound
      // Globals.resources.jump.sound.play({
      // 	volume: 0.05
      // })
    }
  }

  update(dt) {
    if (this.sprite.x < this.startingPos) {
      this.sprite.x += 3;
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
      this.dy += 0.5;
    }
  }

  collectDiamond() {
    this.diamondsCollected += 1;
  }
}
