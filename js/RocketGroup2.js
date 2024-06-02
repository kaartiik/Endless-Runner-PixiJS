import Globals from "./Globals.js";
import Rocket from "./Rocket.js";

export default class RocketGroup2 {
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
    const texture = new PIXI.Texture(
      Globals.resources.rocket.texture,
      new PIXI.Rectangle(0, 0, 256, 116)
    );

    this.rocket1 = new Rocket(
      window.innerWidth + Globals.TILE_SIZE * 6,
      Globals.TILE_SIZE / 2
    );
    this.rocket2 = new Rocket(
      window.innerWidth + Globals.TILE_SIZE * 4,
      (1 / 2) * window.innerHeight
    );
    this.rocket3 = new Rocket(
      window.innerWidth,
      window.innerHeight - Globals.TILE_SIZE * 3
    );

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
