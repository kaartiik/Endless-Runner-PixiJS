import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class PlayerAliBeam {
  constructor(removeChild) {
    this.sfx = new Howl({
      src: ['../assets/sounds/ali_jump.mp3'],
      volume: 0.5
    });
    this.toonTextures = {};
    this.toonTextures["beam"] = [];

    for (let i = 1; i <= 5; i++) {
      const texture = new PIXI.Texture.from(`beam_0${i}.png`);

      this.toonTextures["beam"].push(texture);
    }

    this.sprite = new PIXI.AnimatedSprite(this.toonTextures.beam);

    this.sprite.width = window.innerHeight / 2;
    this.sprite.height = window.innerHeight - Globals.TILE_SIZE;
    this.sprite.x = window.innerWidth / 2 - this.sprite.width;
    this.sprite.y = Globals.TILE_SIZE;

    this.startingPos = window.innerWidth / 4 - this.sprite.width;

    this.dy = 0;
    this.floor = null;
    this.jumpCount = 0;
    this.isDead = false;
    this.diamondsCollected = 0;
    this.isPowerUp = false;
    this.character = CHARACTERS.ALI;
    this.isImmune = true;
    this.beamDuration = 1000;

    this.removeChild = removeChild;

    setTimeout(() => {
      this.isImmune = false;
    }, this.beamDuration);

    this.beam();
  }

  beam() {
    this.sprite.animationSpeed = 0.1;
    this.sprite.textures = this.toonTextures.beam;
    this.sprite.loop = false;
    this.sprite.play();
    this.sfx.play();
    setTimeout(() => {
      this.removeChild(this.sprite);
    }, this.beamDuration);
  }
}
