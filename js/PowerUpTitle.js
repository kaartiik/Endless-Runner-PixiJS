import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class PowerUpTitle {
  constructor(player) {
    this.puTextures = {};
    this.puTextures["alicia"] = [];
    this.puTextures["bakar"] = [];
    this.puTextures["comot"] = [];
    this.puTextures["jet"] = [];
    this.puTextures["zass"] = [];

    for (let i = 0; i <= 44; i++) {
      const texture1 = new PIXI.Texture.from(`Alicia_PU${i}.png`);
      const texture2 = new PIXI.Texture.from(`Bakar_PU${i}.png`);
      const texture3 = new PIXI.Texture.from(`Comot_PU${i}.png`);
      const texture4 = new PIXI.Texture.from(`Jet_PU${i}.png`);
      const texture5 = new PIXI.Texture.from(`Zass_PU${i}.png`);

      this.puTextures["alicia"].push(texture1);
      this.puTextures["bakar"].push(texture2);
      this.puTextures["comot"].push(texture3);
      this.puTextures["jet"].push(texture4);
      this.puTextures["zass"].push(texture5);
    }

    this.sprite = new PIXI.AnimatedSprite(this.puTextures["alicia"]);

    this.sprite.anchor.set(0.5);
    this.sprite.width = window.innerWidth;
    this.sprite.height = window.innerHeight;
    this.sprite.x = window.innerWidth / 2;
    this.sprite.y = window.innerHeight / 2;

    this.createTitle(player);
  }

  playTitle() {
    this.sprite.animationSpeed = 0.5;
    this.sprite.loop = false;
    this.sprite.play();
  }

  createTitle(player) {
    switch (player.character) {
      case CHARACTERS.ALICIA:
        this.sprite.textures = this.puTextures["alicia"];
        this.playTitle();
        break;
      case CHARACTERS.BAKAR:
        this.sprite.textures = this.puTextures["bakar"];
        this.playTitle();

        break;
      case CHARACTERS.COMOT:
        this.sprite.textures = this.puTextures["comot"];
        this.playTitle();

        break;
      case CHARACTERS.JET:
        this.sprite.textures = this.puTextures["jet"];
        this.playTitle();

        break;
      case CHARACTERS.ZASS:
        this.sprite.textures = this.puTextures["zass"];
        this.playTitle();

        break;
      default:
        this.sprite.textures = this.puTextures["alicia"];
        this.playTitle();

        break;
    }
  }
}
