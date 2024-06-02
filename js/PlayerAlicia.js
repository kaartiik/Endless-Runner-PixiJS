import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class PlayerAlicia {
  constructor(addChild, removeChild) {
    this.toonTextures = {};
    this.toonTextures["flying"] = [];
    this.smokeTextures = [];
    this.sfx = new Howl({
      src: ['../assets/sounds/alicia_poof.mp3'],
      volume: 0.5
    });

    for (let i = 1; i <= 3; i++) {
      const texture = new PIXI.Texture.from(`alicia_flying_0${i}.png`);

      this.toonTextures["flying"].push(texture);

      //add poof smoke textures
      const smokeTextures = new PIXI.Texture.from(`alicia_smoke_0${i}.png`);

      this.smokeTextures.push(smokeTextures);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.flying);

    this.startingPos = window.innerWidth / 4 - this.sprite.width;

    this.sprite.width = window.innerHeight / 10;
    this.sprite.height = window.innerHeight / 10;
    this.sprite.x = this.startingPos;
    this.sprite.y = window.innerHeight - this.sprite.height - Globals.TILE_SIZE;

    const pointTexture = new PIXI.Texture.from(`alicia_flying_point.png`);
    this.pointSprite = new PIXI.Sprite(pointTexture);

    this.pointSprite.width = window.innerHeight / 8;
    this.pointSprite.height = window.innerHeight / 8;
    this.pointSprite.x = this.sprite.x + 0.4 * window.innerWidth;
    this.pointSprite.y =
      window.innerHeight - this.pointSprite.height - Globals.TILE_SIZE;

    //smoke textures animated sprite
    this.smokeSprite = new PIXI.AnimatedSprite(this.smokeTextures);

    this.smokeSprite.width = window.innerHeight / 8;
    this.smokeSprite.height = window.innerHeight / 8;
    this.smokeSprite.x = this.sprite.x + 0.4 * window.innerWidth;
    this.smokeSprite.y =
      window.innerHeight - this.smokeSprite.height - Globals.TILE_SIZE;

    this.dy = 0;
    this.pointDy = Globals.gameSpeed;
    this.floor = null;
    this.isPointMoveUp = true;
    this.isDead = false;
    this.diamondsCollected = 0;
    this.isPowerUp = true;
    this.character = CHARACTERS.ALICIA;

    this.addChild = addChild;
    this.removeChild = removeChild;

    this.flying();
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

  get pointLeft() {
    return this.pointSprite.x;
  }

  get pointRight() {
    return this.pointLeft + this.pointSprite.width;
  }

  get pointTop() {
    return this.pointSprite.y;
  }

  get pointBottom() {
    return this.pointTop + this.pointSprite.height;
  }

  flying() {
    this.sprite.animationSpeed = 0.1;
    this.sprite.textures = this.toonTextures.flying;
    this.sprite.loop = true;
    this.sprite.play();
  }

  poof() {
    this.smokeSprite.animationSpeed = 0.1;
    this.smokeSprite.loop = true;
    this.smokeSprite.play();
    this.smokeSprite.x = this.pointLeft;
    this.smokeSprite.y = this.pointTop;
    this.addChild(this.smokeSprite);

    setTimeout(() => {
      this.removeChild(this.smokeSprite);
    }, 500);
  }

  moveUp() {
    this.pointSprite.y -= this.pointDy;
  }

  moveDown() {
    this.pointSprite.y += this.pointDy;
  }

  startJump(e) {
    const canJump = !this.isDead;

    // Make player jump using spacebar
    if (canJump) {
      this.sprite.x = this.pointLeft;
      this.sprite.y = this.pointTop;
      this.poof();
      if(!Globals.isMuted)this.sfx.play();
      // Play jump sound
      // Globals.resources.jump.sound.play({
      // 	volume: 0.05
      // })
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
    if (this.isPointMoveUp) {
      this.moveUp();
    } else {
      this.moveDown();
    }
  }

  stayOnFloor(floor) {
    this.floor = floor;
    this.dy = 0;
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
