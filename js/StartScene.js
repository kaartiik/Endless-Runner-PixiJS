import StartBackground from "./StartBackground.js";
import Globals from "./Globals.js";
import MainScene from "./MainScene.js";
import { ISRESTART } from "./constants.js";
import HowToPlay from "./HowToPlay.js";
import Loading from "./Loading.js";

export default class StartScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    this.createButtons();

    this.container.interactive = true;

    const isRestart = sessionStorage.getItem(ISRESTART);

    if (isRestart === "true") {
      setTimeout(() => {
        Globals.scene.start(new MainScene());
        sessionStorage.setItem(ISRESTART, false);
      }, 200);
    }
  }

  createBackground() {
    this.bg = new StartBackground();
    this.container.addChild(this.bg.container);
  }

  createPopup() {
    this.popup = new PIXI.Graphics();
    this.popup.beginFill(0x000000, 0.5);
    this.popup.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.container.addChild(this.popup);
  }

  createButtons() {
    const buttonWidth = Globals.isMobile()
      ? 0.2 * window.innerWidth
      : 0.12 * window.innerWidth;
    const buttonHeight = Globals.isMobile()
      ? 0.08 * window.innerHeight
      : 0.05 * window.innerHeight;

    const startBtn = new PIXI.Sprite(PIXI.Texture.from("start_btn.png"));
    startBtn.anchor.set(0.5);
    startBtn.width = buttonWidth;
    startBtn.height = buttonHeight;
    startBtn.x = window.innerWidth / 2;
    startBtn.y = 0.7 * window.innerHeight;
    startBtn.interactive = true;

    startBtn.on("pointerdown", () => {
      Globals.scene.start(new Loading());
      Globals.sfx_button.play();
    });

    const htpBtn = new PIXI.Sprite(PIXI.Texture.from("htp_btn.png"));
    htpBtn.anchor.set(0.5);
    htpBtn.width = buttonWidth;
    htpBtn.height = buttonHeight;
    htpBtn.x = window.innerWidth / 2;
    htpBtn.y = 0.8 * window.innerHeight;
    htpBtn.interactive = true;

    htpBtn.on("pointerdown", () => {
      Globals.sfx_button.play();
      this.htp = new HowToPlay(() =>
        this.container.removeChild(this.htp.container)
      );
      this.container.addChild(this.htp.container);
    });

    this.container.addChild(startBtn);
    this.container.addChild(htpBtn);
  }
}
