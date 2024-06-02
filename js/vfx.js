export default class Vfx {
    constructor(xpos, ypos) {
        this.textures = [];
        for (let i = 1; i <= 3; i++) {
            const vfxTextures = new PIXI.Texture.from(`alicia_smoke_0${i}.png`);
            this.textures.push(vfxTextures);
        }

        this.vfxSprite = new PIXI.AnimatedSprite(this.textures);

        this.vfxSprite.width = window.innerHeight / 8;
        this.vfxSprite.height = window.innerHeight / 8;
        this.vfxSprite.x = xpos;
        this.vfxSprite.y = ypos;

        this.triggerVfx();
    }

    triggerVfx() {
        this.vfxSprite.animationSpeed = 0.1;
        this.vfxSprite.loop = true;
        this.vfxSprite.play();
        this.addChild(this.vfxSprite);
    
        setTimeout(() => {
          this.removeChild(this.vfxSprite);
        }, 500);
      }
}