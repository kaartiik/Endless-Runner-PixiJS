import Background from "./Background.js";
import CoinsScore from "./CoinsScore.js";
import { ISRESTART } from "./constants.js";
import Globals from "./Globals.js";
import LabelScore from "./LabelScore.js";
import ObstacleScore from "./ObstacleScore.js";
import TotalScore from "./TotalScore.js";

export default class FinalScene {
  constructor(score, obstacleScore, coinsScore) {
    this.container = new PIXI.Container();

    this.finalDistanceScore = score;
    this.finalObstacleScore = obstacleScore;
    this.finalCoinsScore = coinsScore;

    this.counterScore = 0;
    this.counterObstacleScore = 0;
    this.counterCoinsScore = 0;

    this.createBackground();
    this.createPopup();
    this.createMessage();
    this.createButtons();
    this.createScores();
    // this.stopMusic();

    this.fullscreenModal = document.getElementById("fullscreenModal");
    this.cancelBtn = document.getElementById("cancelBtn");

    this.cancelBtn.onpointerdown = () => {
      this.fullscreenModal.style.display = "none";
    };
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPopup() {
    this.popup = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/endmenu/end_screen_menu.png")
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

  createMessage() {
    const thankyoumsg = new PIXI.Sprite(
      PIXI.Texture.from(
        "../assets/images/endmenu/end_screen_thankyou_message.png"
      )
    );
    thankyoumsg.anchor.set(0.5);
    thankyoumsg.width = Globals.isMobile()
      ? 0.7 * window.innerWidth
      : 0.8 * this.popup.width;
    thankyoumsg.height = Globals.isMobile()
      ? 0.2 * window.innerHeight
      : 0.15 * this.popup.height;
    thankyoumsg.x = 0;
    thankyoumsg.y = Globals.isMobile()
      ? 0.08 * this.popup.height
      : 0.25 * this.popup.height;

    this.popup.addChild(thankyoumsg);
  }

  createButtons() {
    const buttonWidth = Globals.isMobile()
      ? 0.6 * window.innerWidth
      : 0.5 * this.popup.width;
    const buttonHeight = Globals.isMobile()
      ? 0.3 * window.innerHeight
      : 0.1 * this.popup.height;

    const menuSubmitScore = new PIXI.Sprite(
      PIXI.Texture.from("/ejen-ali-endless-runner-stage/assets/images/endmenu/button_submit.png")
    );
    menuSubmitScore.anchor.set(0.5);
    menuSubmitScore.width = buttonWidth;
    menuSubmitScore.height = buttonHeight;
    menuSubmitScore.x = 0;
    menuSubmitScore.y = Globals.isMobile()
      ? 0.35 * window.innerHeight
      : 0.4 * this.popup.height;
    menuSubmitScore.interactive = true;

    menuSubmitScore.on("pointerdown", () => {
      this.fullscreenModal.style.display = "flex";
    });

    const menuRestart = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/endmenu/button_retry.png")
    );
    menuRestart.anchor.set(0.5);
    menuRestart.width = buttonWidth;
    menuRestart.height = buttonHeight;
    menuRestart.x = 0;
    menuRestart.y = Globals.isMobile()
      ? 0.65 * window.innerHeight
      : 0.56 * this.popup.height;
    menuRestart.interactive = true;

    menuRestart.on("pointerdown", () => {
      this.restartGame();
    });

    const menuExit = new PIXI.Sprite(
      PIXI.Texture.from("../assets/images/endmenu/button_exit.png")
    );
    menuExit.anchor.set(0.5);
    menuExit.width = buttonWidth;
    menuExit.height = buttonHeight;
    menuExit.x = 0;
    menuExit.y = Globals.isMobile()
      ? 0.95 * window.innerHeight
      : 0.72 * this.popup.height;
    menuExit.interactive = true;
    menuExit.on("pointerdown", () => {
      this.exitGame();
    });

    this.popup.addChild(menuSubmitScore);
    this.popup.addChild(menuRestart);
    this.popup.addChild(menuExit);
  }

  createScores() {
    this.labelScore = new LabelScore(
      "Aero",
      "#ED1D23",
      Globals.isMobile() ? 15 : 25,
      window.innerWidth / 2,
      Globals.isMobile() ? 0.32 * window.innerHeight : window.innerHeight / 2.9,
      0.5
    );
    this.labelScore.renderScore(this.counterScore);
    this.container.addChild(this.labelScore);

    this.obstacleScore = new ObstacleScore(
      "Aero",
      "#ED1D23",
      Globals.isMobile() ? 15 : 25,
      window.innerWidth / 2,
      Globals.isMobile() ? 0.37 * window.innerHeight : window.innerHeight / 2.6,
      0.5
    );
    this.obstacleScore.renderScore(this.counterObstacleScore);
    this.container.addChild(this.obstacleScore);

    this.coinsScore = new CoinsScore(
      "Aero",
      "#ED1D23",
      Globals.isMobile() ? 15 : 25,
      window.innerWidth / 2,
      Globals.isMobile() ? 0.42 * window.innerHeight : window.innerHeight / 2.3,
      0.5
    );
    this.coinsScore.renderScore(this.counterCoinsScore);
    this.container.addChild(this.coinsScore);

    this.totalScore = new TotalScore(
      "Aero",
      "#ED1D23",
      Globals.isMobile() ? 15 : 25,
      window.innerWidth / 2,
      Globals.isMobile() ? 0.47 * window.innerHeight : window.innerHeight / 2,
      0.5
    );
    this.totalScore.renderScore(this.score);
    this.container.addChild(this.totalScore);

    //counter animation
    this.distanceInterval = setInterval(() => {
      if (this.counterScore < this.finalDistanceScore) {
        this.counterScore += 1;
      }

      this.labelScore.renderScore(this.counterScore);

      if (
        this.counterScore === this.finalDistanceScore &&
        this.counterObstacleScore === this.finalObstacleScore &&
        this.counterCoinsScore === this.finalCoinsScore
      ) {
        this.totalScore.renderScore(
          this.finalDistanceScore +
            this.finalObstacleScore +
            this.finalCoinsScore
        );

        clearInterval(this.distanceInterval);
        clearInterval(this.obsInterval);
        clearInterval(this.coinInterval);
      }
    }, 100 / this.finalDistanceScore);

    this.obsInterval = setInterval(() => {
      if (this.counterObstacleScore < this.finalObstacleScore) {
        this.counterObstacleScore += 1;
      }

      this.obstacleScore.renderScore(this.counterObstacleScore);
    }, 100 / this.finalObstacleScore);

    this.coinInterval = setInterval(() => {
      if (this.counterCoinsScore < this.finalCoinsScore) {
        this.counterCoinsScore += 1;
      }

      this.coinsScore.renderScore(this.counterCoinsScore);
    }, 100 / this.finalCoinsScore);
  }

  stopMusic() {
    Globals.resources.music.sound.stop();
  }

  restartGame() {
    sessionStorage.setItem(ISRESTART, true);
    location.reload();
  }

  exitGame() {
    location.reload();
  }
}
