import Globals from "./Globals.js";

export default class HowToPlay {
  constructor(removeChild) {
    this.container = new PIXI.Container();
    this.createPopup();
    this.createButtons();
    this.instructions();
    this.step = 1;

    this.removeChild = removeChild;
  }

  instructions() {
    switch (this.step) {
      case 1:
        this.popupImg.texture = PIXI.Texture.from("htp_game_image1.png");
        this.popupImgExplanation.texture = PIXI.Texture.from(
          "htp_game_explanation1.png"
        );
        break;
      case 2:
        this.popupImg.texture = PIXI.Texture.from("htp_game_image2.png");
        this.popupImgExplanation.texture = PIXI.Texture.from(
          "htp_game_explanation2.png"
        );
        break;
      case 3:
        this.popupImg.texture = PIXI.Texture.from("htp_game_image3.png");
        this.popupImgExplanation.texture = PIXI.Texture.from(
          "htp_game_explanation3.png"
        );
        break;
      case 4:
        this.popupImg.texture = PIXI.Texture.from("htp_game_image4.png");
        this.popupImgExplanation.texture = PIXI.Texture.from(
          "htp_game_explanation4.png"
        );
        break;
      default:
        this.popupImg.texture = PIXI.Texture.from("htp_game_image1.png");
        this.popupImgExplanation.texture = PIXI.Texture.from(
          "htp_game_explanation1.png"
        );
        break;
    }
  }

  createPopup() {
    //pop up bg
    this.popup = new PIXI.Sprite(PIXI.Texture.from("htp_bg.png"));

    this.popup.anchor.set(0.5);
    this.popup.width = 0.7 * window.innerWidth;
    this.popup.height = Globals.isMobile()
      ? 0.9 * window.innerHeight
      : 0.7 * window.innerHeight;
    this.popup.x = window.innerWidth / 2;
    this.popup.y = window.innerHeight / 2;

    //pop up menu
    this.popupMenu = new PIXI.Sprite(PIXI.Texture.from("htp_menu.png"));

    this.popupMenu.anchor.set(0.5);
    this.popupMenu.width = this.popup.width;
    this.popupMenu.height = this.popup.height;
    this.popupMenu.x = window.innerWidth / 2;
    this.popupMenu.y = window.innerHeight / 2;

    //pop up menu image border
    this.popupMenuImgBG = new PIXI.Sprite(
      PIXI.Texture.from("htp_game_image_bg.png")
    );

    this.popupMenuImgBG.anchor.set(0.5);
    this.popupMenuImgBG.width = this.popup.width;
    this.popupMenuImgBG.height = this.popup.height;
    this.popupMenuImgBG.x = window.innerWidth / 2;
    this.popupMenuImgBG.y = window.innerHeight / 2;

    //pop up menu image
    this.popupImg = new PIXI.Sprite(PIXI.Texture.from("htp_game_image1.png"));

    this.popupImg.anchor.set(0.5);
    this.popupImg.width = this.popupMenuImgBG.width;
    this.popupImg.height = this.popupMenuImgBG.height;
    this.popupImg.x = this.popupMenuImgBG.x * 1.019;
    this.popupImg.y = this.popupMenuImgBG.y * 0.96;

    //pop up menu image explanation
    this.popupImgExplanation = new PIXI.Sprite(
      PIXI.Texture.from("htp_game_explanation1.png")
    );

    this.popupImgExplanation.anchor.set(0.5);
    this.popupImgExplanation.width = 0.8 * this.popup.width;
    this.popupImgExplanation.height = 0.8 * this.popup.height;
    this.popupImgExplanation.x = this.popup.x;
    this.popupImgExplanation.y = this.popupImg.y + 0.02 * this.popupImg.height;

    this.container.addChild(this.popup);
    this.container.addChild(this.popupMenu);
    this.container.addChild(this.popupMenuImgBG);
    this.container.addChild(this.popupImg);
    this.container.addChild(this.popupImgExplanation);
  }

  createButtons() {
    const buttonWidthHeight = Globals.isMobile()
      ? 0.05 * this.popup.width
      : 0.03 * this.popup.width;

    const buttonX = Globals.isMobile()
      ? 0.5 * this.popup.width - 0.5 * buttonWidthHeight
      : 0.3 * this.popup.width - 0.5 * buttonWidthHeight;

    const buttonY = Globals.isMobile()
      ? 0.65 * this.popup.height
      : 0.34 * this.popup.height;

    const frontButton = new PIXI.Sprite(PIXI.Texture.from("front_button.png"));
    frontButton.anchor.set(0.5);
    frontButton.width = buttonWidthHeight;
    frontButton.height = buttonWidthHeight;
    frontButton.x = buttonX;
    frontButton.y = buttonY;
    frontButton.interactive = true;

    frontButton.on("pointerdown", () => {
      this.stepInstructions(1);
    });

    const backButton = new PIXI.Sprite(PIXI.Texture.from("back_button.png"));
    backButton.anchor.set(0.5);
    backButton.width = buttonWidthHeight;
    backButton.height = buttonWidthHeight;
    backButton.x = -buttonX;
    backButton.y = buttonY;
    backButton.interactive = true;

    backButton.on("pointerdown", () => {
      this.stepInstructions(-1);
    });

    const exitButton = new PIXI.Sprite(PIXI.Texture.from("close_button.png"));
    exitButton.anchor.set(0.5);
    exitButton.width = buttonWidthHeight;
    exitButton.height = buttonWidthHeight;
    exitButton.x = buttonX;
    exitButton.y = -buttonY;
    exitButton.interactive = true;

    exitButton.on("pointerdown", () => {
      this.removeChild();
    });

    this.popup.addChild(frontButton);
    this.popup.addChild(backButton);
    this.popup.addChild(exitButton);
  }

  stepInstructions(value) {
    if (this.step >= 1 && this.step <= 4) {
      if (this.step + value > 4 || this.step + value < 1) {
        return;
      }
      this.step += value;
    }
    this.instructions();
  }
}
