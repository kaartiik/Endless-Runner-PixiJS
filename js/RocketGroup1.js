import Globals from "./Globals.js";
import Rocket from "./Rocket.js";

export default class RocketGroup1 {
  constructor() {
    this.createContainer();
    this.createRockets();

    this.dx = 15;
    // this.playSfx();
  }

  createContainer() {
    this.container = new PIXI.Container();
    this.container.x = 50;
    this.container.y = 50;
  }

  createRockets() {
    this.rocket1 = new Rocket(window.innerWidth, Globals.TILE_SIZE / 2);
    this.rocket2 = new Rocket(
      window.innerWidth + Globals.TILE_SIZE * 6,
      (1 / 2) * window.innerHeight
    );
    this.rocket3 = new Rocket(
      window.innerWidth,
      window.innerHeight - Globals.TILE_SIZE * 3
    );

    // var bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    // bg.width = 800;
    // bg.height = 500;
    // bg.tint = 0xff0000;

    // this.container.addChild(bg);
    this.container.addChild(this.rocket1.sprite);
    this.container.addChild(this.rocket2.sprite);
    this.container.addChild(this.rocket3.sprite);
  }

  move() {
    this.rocket1.move();
    this.rocket2.move();
    this.rocket3.move();
  }

  checkCollision(player) {
    this.rocket1.checkCollision(player);
    this.rocket2.checkCollision(player);
    this.rocket3.checkCollision(player);
  }

  update(dt) {
    this.move();
  }

  playSfx() {
    Globals.resources.watchOut.sound.play({
      vol: 0.05,
    });
  }
}
