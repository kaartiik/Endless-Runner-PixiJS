import Globals from "./Globals.js";

export default class ObstacleScore extends PIXI.Text {
  constructor(
    font = "Gemini",
    fontColor = "#000000",
    fontSize = Globals.isMobile() ? 10 : 15,
    x = (2.5 / 5) * window.innerWidth,
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

    this.score = -1;

    this.updateScore();
  }

  renderScore(score) {
    this.text = score ? `Droids Destroyed: ${score}` : `${this.score}`;
  }

  updateScore() {
    this.score += 1;

    this.renderScore();
  }
}
