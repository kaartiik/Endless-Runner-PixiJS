import Loader from "./Loader.js";
import Globals from "./Globals.js";
import SceneManager from "./SceneManager.js";
import StartScene from "./StartScene.js";

export let APP_TICKER;

export default class App {
  run() {
    // Create canvas
    this.app = new PIXI.Application({ resizeTo: window });
    if(Globals.isMobile) PIXI.settings.ROUND_PIXELS = true;
    PIXI.settings.RESOLUTION = window.devicePixelRatio;

    document.body.appendChild(this.app.view);

    Globals.scene = new SceneManager();
    this.app.stage.addChild(Globals.scene.container);
    APP_TICKER = this.app.ticker;
    APP_TICKER.add((dt) => Globals.scene.update(dt));

    // Load sprites
    this.loader = new Loader(this.app.loader);
    this.loader.preload().then(() => {
      Globals.scene.start(new StartScene());
    });
  }
}
