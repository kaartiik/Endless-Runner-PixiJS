import { CHARACTERS } from "./constants.js";
import Globals from "./Globals.js";

export default class LaserDroids {
  constructor(posY, removeChild) {
    this.createContainer(posY);
    this.createDroids();
    this.createLasers();
    this.sfx = new Howl({
      src: ['../assets/sounds/lasers.mp3'],
      //volume: 0.3
    });
    this.shot = false;
    
    //this.playSfx();

    this.xOffset = 50;
    this.dx = 1;
    this.scale = 1;

    this.removeChild = removeChild;
  }

  //droid sprite getters
  get left() {
    return this.droid.x;
  }

  get right() {
    return this.left + this.droid.width;
  }

  get top() {
    return this.droid.y;
  }

  get bottom() {
    return this.top + this.droid.height;
  }

  //container getters
  get containerLeft() {
    return this.container.x;
  }

  get containerRight() {
    return this.containerLeft + this.container.width;
  }

  get containerTop() {
    return this.container.y + 18;
  }

  get containerBottom() {
    return this.container.y + this.container.height - 18;
  }

  createContainer(posY) {
    this.container = new PIXI.Container();
    this.container.x = 0;
    this.container.y = posY;
  }

  createDroids() {
    const texture = new PIXI.Texture(
      Globals.resources.laserDroid.texture,
      new PIXI.Rectangle(0, 0, 164, 171)
    );

    this.droid = new PIXI.Sprite(texture);
    this.flippedDroid = new PIXI.Sprite(texture);

    this.droid.width = this.flippedDroid.width = Globals.TILE_SIZE;
    this.droid.height = this.flippedDroid.height = Globals.TILE_SIZE;

    this.droid.x = -Globals.TILE_SIZE;
    this.flippedDroid.x = window.innerWidth + Globals.TILE_SIZE;
    this.droid.y = this.flippedDroid.y = 0;

    // Flip droid horizontally
    this.flippedDroid.scale.x *= -1;

    this.container.addChild(this.droid);
    this.container.addChild(this.flippedDroid);
  }

  createLasers() {
    const texture = new PIXI.Texture(
      Globals.resources.laserDroid.texture,
      new PIXI.Rectangle(170, 0, 362, 171)
    );

    this.lasers = new PIXI.Sprite(texture);

    this.lasers.width = window.innerWidth - 100 - Globals.TILE_SIZE * 2;
    this.lasers.height = Globals.TILE_SIZE;

    this.lasers.x = Globals.TILE_SIZE + 50;
    this.lasers.y = 0;

    this.lasers.alpha = 0;

    this.container.addChild(this.lasers);
  }

  move() {
    Globals.isMuted ? this.sfx.mute(true) : this.sfx.mute(false);
    if (!this.droid) return;

    if (this.droid.x < this.xOffset && !this.shot) {
      this.droid.x += this.dx;
      this.flippedDroid.x -= this.dx;
    } else {
      // Prepare lasers
      const speed = 0.1;

      if (this.scale > 0) {
        this.scale -= speed;
      } else {
        // Fire lasers
        this.lasers.alpha = 1;
        if(!this.shot){
          this.sfx.play();
          this.shot = true;
        } else {
          if (!this.sfx.isPlaying) {
            this.reset();
          }
        }
        // this.createLasers();
        
      }
    }
  }

  playSfx() {
    this.sfx = Globals.resources.laser.sound;

    this.sfx.play({
      volume: 0.01,
      speed: 4,
    });
  }

  reset() {
    this.lasers.alpha -= this.dx;
    this.droid.x -= this.dx;
    this.flippedDroid.x += this.dx;

    if (this.right < Globals.TILE_SIZE) {
      this.droid.x = -Globals.TILE_SIZE;
      this.flippedDroid.x = window.innerWidth + Globals.TILE_SIZE;

      this.destroyContainerAndSprites();
    }
  }

  destroyContainerAndSprites() {
    this.removeChild(this.container);

    this.container.destroy();

    this.container = null;

    this.droid.destroy();
    this.flippedDroid.destroy();

    this.droid = null;
    this.flippedDroid = null;

    this.sfx.stop();
  }

  update(dt) {
    this.move();
  }

  checkCollision(player, switchToNormalPlayer, clearSprites) {
    if (!this.container) {
      return;
    }

    if (this.isOverlap(player) && !player.isImmune) {
      this.destroyContainerAndSprites();
  
      if (player.character === CHARACTERS.ALI) {
        //Ali dies on collission
        clearSprites();
        player.sprite.emit("die");
        player.isDead = true;
      } else if (player.character !== CHARACTERS.ZASS) {
        //Other powerups switch to Ali on collision except Zass
        switchToNormalPlayer();
      }
    }
  }

  isOverlap(player) {
    if (this.lasers.alpha >= 1) {
      return (
        player.bottom >= this.containerTop &&
        player.top <= this.containerBottom &&
        player.right >= this.containerLeft &&
        player.left <= this.containerRight
      );
    }
  }
}
