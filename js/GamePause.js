import { APP_TICKER } from "./App.js";
import { ISRESTART } from "./constants.js";
import Globals from "./Globals.js";

export default class GamePause {
  constructor(removeChild) {
    this.container = new PIXI.Container();
    this.createPopup();
    this.createButtons();

    this.removeChild = removeChild;
  }

  createPopup() {
    this.popup = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/pausemenu/pause_screen_menu.png")
    );

    this.popup.anchor.set(0.5);
    this.popup.width = 0.3 * window.innerWidth;
    this.popup.height = Globals.isMobile()
      ? 0.9 * window.innerHeight
      : 0.7 * window.innerHeight;
    this.popup.x = window.innerWidth / 2;
    this.popup.y = window.innerHeight / 2;

    this.container.addChild(this.popup);
  }

  createButtons() {
    const buttonWidth = Globals.isMobile()
      ? 0.6 * window.innerWidth
      : 0.6 * this.popup.width;
    const buttonHeight = Globals.isMobile()
      ? 0.3 * window.innerHeight
      : 0.1 * this.popup.height;
    const menuResume = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/pausemenu/button_resume.png")
    );
    menuResume.anchor.set(0.5);
    menuResume.width = buttonWidth;
    menuResume.height = buttonHeight;
    menuResume.x = 0;
    menuResume.y = Globals.isMobile()
      ? -0.2 * this.popup.height
      : -0.05 * this.popup.height;
    menuResume.interactive = true;

    menuResume.on("pointerdown", () => {
      this.resumeGame();
    });

    const menuRestart = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/pausemenu/button_restart.png")
    );
    menuRestart.anchor.set(0.5);
    menuRestart.width = buttonWidth;
    menuRestart.height = buttonHeight;
    menuRestart.x = 0;
    menuRestart.y = Globals.isMobile()
      ? 0.2 * this.popup.height
      : 0.12 * this.popup.height;
    menuRestart.interactive = true;

    menuRestart.on("pointerdown", () => {
      this.restartGame();
    });

    const menuExit = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/pausemenu/button_exit.png")
    );
    menuExit.anchor.set(0.5);
    menuExit.width = buttonWidth;
    menuExit.height = buttonHeight;
    menuExit.x = 0;
    menuExit.y = Globals.isMobile()
      ? 0.6 * this.popup.height
      : 0.29 * this.popup.height;
    menuExit.interactive = true;
    menuExit.on("pointerdown", () => {
      this.exitGame();
    });

    this.popup.addChild(menuResume);
    this.popup.addChild(menuRestart);
    this.popup.addChild(menuExit);

    setTimeout(() => {
      this.pauseGame();
    }, 500);
  }

  pauseGame() {
    APP_TICKER.stop();
  }

  resumeGame() {
    APP_TICKER.start();

    this.removeChild();
  }

  restartGame() {
    sessionStorage.setItem(ISRESTART, true);
    location.reload();
  }

  exitGame() {
    location.reload();
  }
}
