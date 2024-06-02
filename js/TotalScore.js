import Globals from "./Globals.js";

export default class TotalScore extends PIXI.Text {
  constructor(
    font = "Gemini",
    fontColor = "#000000",
    fontSize = Globals.isMobile() ? 10 : 15,
    x = 10,
    y = 10,
    anchor = 0
  ) {
    super();

    this.x = x;
    this.y = y;
    this.anchor.set(anchor);
    this.style = {
      fontFamily: font,
      fontWeight: "bold",
      fontSize: fontSize,
      fill: [fontColor],
    };

    this.score = 0;
    this.thresholdScore = 0;
  }

  renderScore(score) {
    this.text = score ? `Total Score: ${score}` : `${this.score}`;
  }

  update(dt, bgSpeed) {
    this.thresholdScore += Math.round(dt) * bgSpeed; //character speed;

    if (this.thresholdScore % 100 === 0) {
      this.score += 1;
    }
    this.renderScore();
  }
}
