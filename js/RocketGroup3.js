import Globals from "./Globals.js";
import Rocket from "./Rocket.js";

export default class RocketGroup3 {
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
      window.innerWidth,
      this.rocket1.y + Globals.TILE_SIZE
    );
    this.rocket3 = new Rocket(
      window.innerWidth + Globals.TILE_SIZE * 6,
      (1.2 / 3) * window.innerHeight - Globals.TILE_SIZE
    );
    this.rocket4 = new Rocket(
      window.innerWidth + Globals.TILE_SIZE * 6,
      (1.2 / 3) * window.innerHeight
    );
    this.rocket5 = new Rocket(
      window.innerWidth + Globals.TILE_SIZE * 6,
      (1.2 / 3) * window.innerHeight + Globals.TILE_SIZE
    );
    this.rocket6 = new Rocket(
      window.innerWidth,
      window.innerHeight - Globals.TILE_SIZE * 4
    );
    this.rocket7 = new Rocket(
      window.innerWidth,
      this.rocket6.y + Globals.TILE_SIZE
    );

    this.container.addChild(this.rocket1.sprite);
    this.container.addChild(this.rocket2.sprite);
    this.container.addChild(this.rocket3.sprite);
    this.container.addChild(this.rocket4.sprite);
    this.container.addChild(this.rocket5.sprite);
    this.container.addChild(this.rocket6.sprite);
    this.container.addChild(this.rocket7.sprite);
  }

  move() {
    this.rocket1.move();
    this.rocket2.move();
    this.rocket3.move();
    this.rocket4.move();
    this.rocket5.move();
    this.rocket6.move();
    this.rocket7.move();
  }

  checkCollision(player) {
    this.rocket1.checkCollision(player);
    this.rocket2.checkCollision(player);
    this.rocket3.checkCollision(player);
    this.rocket4.checkCollision(player);
    this.rocket5.checkCollision(player);
    this.rocket6.checkCollision(player);
    this.rocket7.checkCollision(player);
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
